/**
 * BK7231N芯片下载器 - 完全按照Python版本实现
 * 基于tyutool/tyutool/flash/bk7231n/bk7231n_flash.py的逻辑
 * 使用SLIP协议进行串口通信
 */

class BK7231NDownloader extends BaseDownloader {
    constructor(serialPort, debugCallback) {
        super(serialPort, debugCallback);
        this.chipName = 'BK7231N';
        this.baudrate = 115200;
        this.retry = 4;
        this.startAddr = 0x00;
        this.binfil = {};
        this.flashMid = null;
        
        // 命令常量 - 完全按照Python版本
        this.CMD = {
            LinkCheck: 0x00,
            WriteReg: 0x01,
            ReadReg: 0x03,
            FlashWrite: 0x06,
            FlashWrite4K: 0x07,
            FlashRead: 0x08,
            FlashRead4K: 0x09,
            CheckCRC: 0x10,
            ReadBootVersion: 0x11,
            FlashEraseAll: 0x0a,
            FlashErase4K: 0x0b,
            FlashReadSR: 0x0c,
            FlashWriteSR: 0x0d,
            FlashGetMID: 0x0e,
            Reboot: 0x0e,
            FlashErase: 0x0f,
            SetBaudRate: 0x0f,
            RESET: 0x70,
            StayRom: 0xaa,
            Reset: 0xfe,
            BKRegDoReboot: 0xfe
        };
        
        // Flash信息数据库 - 简化版，包含主要芯片
        this.FLASH_DB = {
            0x14405e: { name: 'XTX_25F08B', size: 8 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] },
            0x134051: { name: 'GD_25D40', size: 4 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] },
            0x144051: { name: 'GD_25D80', size: 8 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] },
            0x1340c8: { name: 'GD_25Q41B', size: 4 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] },
            0x136085: { name: 'Puya_25Q40', size: 4 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] },
            0x146085: { name: 'Puya_25Q80', size: 8 * 1024 * 1024, szSR: 1, sb: 2, lb: 4, cwUnp: 0x0, cwEnp: 0x3c, cwMsk: 0x3c, cwdRd: [0x05], cwdWr: [0x01] }
        };
        
        // CRC32表
        this.crcTable = this.makeCrc32Table();
    }

    /**
     * 创建CRC32表
     */
    makeCrc32Table() {
        const table = new Array(256);
        for (let i = 0; i < 256; i++) {
            let c = i;
            for (let j = 0; j < 8; j++) {
                c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
            }
            table[i] = c;
        }
        return table;
    }

    /**
     * 计算CRC32
     */
    crc32(crc, data) {
        crc = crc ^ 0xffffffff;
        for (let i = 0; i < data.length; i++) {
            crc = (crc >>> 8) ^ this.crcTable[(crc ^ data[i]) & 0xff];
        }
        return (crc ^ 0xffffffff) >>> 0;
    }

    /**
     * SLIP协议读取器
     */
    async slipReader(rxlen, timeout) {
        let waitingHead = true;
        const startTime = Date.now();
        let readBuf = new Uint8Array(0);
        
        while (Date.now() - startTime < timeout) {
            if (this.stopFlag) return new Uint8Array(0);
            
            const data = await this.readData(1024, 10);
            if (data.length > 0) {
                const newBuf = new Uint8Array(readBuf.length + data.length);
                newBuf.set(readBuf);
                newBuf.set(data, readBuf.length);
                readBuf = newBuf;
            }
            
            if (waitingHead) {
                let head = -1;
                for (let i = 0; i < readBuf.length - 6; i++) {
                    if (readBuf[i] === 0x04) {
                        head = i;
                        break;
                    }
                }
                
                if (head >= 0) {
                    readBuf = readBuf.slice(head);
                    if (readBuf.length >= 7 &&
                        readBuf[0] === 0x04 && readBuf[1] === 0x0e &&
                        readBuf[3] === 0x01 && readBuf[4] === 0xe0 && readBuf[5] === 0xfc) {
                        waitingHead = false;
                        continue;
                    }
                    readBuf = readBuf.slice(1);
                }
            }
            
            if (!waitingHead && readBuf.length >= rxlen) {
                return readBuf.slice(0, rxlen);
            }
        }
        
        return readBuf.length >= rxlen ? readBuf.slice(0, rxlen) : new Uint8Array(0);
    }

    /**
     * 发送数据 - 支持Mac平台的分包发送
     */
    async sendData(data) {
        let writer = null;
        try {
            writer = this.port.writable.getWriter();
            
            // 模拟Python的Mac平台处理
            const size = 256;
            const total = data.length;
            const count = Math.floor(total / size);
            const rem = total % size;
            
            for (let i = 0; i < count; i++) {
                await writer.write(data.slice(i * size, (i + 1) * size));
                await this.sleep(10); // 20ms/2
            }
            
            if (rem > 0) {
                await writer.write(data.slice(-rem));
                await this.sleep(10);
            }
        } finally {
            if (writer) {
                try { writer.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 带发送的接收
     */
    async rxWithTx(txbuf, rxlen, processTimeout = 500, serTimeout = 50) {
        await this.sendData(txbuf);
        return await this.slipReader(rxlen, processTimeout);
    }

    /**
     * 创建命令缓冲区基础结构
     */
    createCmdBuffer() {
        return new Uint8Array(4096);
    }

    /**
     * 链路检查命令
     */
    makeLinkCheckCmd() {
        const length = 1;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = length;
        buf[4] = this.CMD.LinkCheck;
        return buf.slice(0, length + 4);
    }

    /**
     * 设置波特率命令
     */
    makeSetBaudrateCmd(baudrate, dlyMs) {
        const length = 1 + 4 + 1;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = length;
        buf[4] = this.CMD.SetBaudRate;
        buf[5] = baudrate & 0xff;
        buf[6] = (baudrate >> 8) & 0xff;
        buf[7] = (baudrate >> 16) & 0xff;
        buf[8] = (baudrate >> 24) & 0xff;
        buf[9] = dlyMs & 0xff;
        return buf.slice(0, length + 4);
    }

    /**
     * Flash读取4K命令
     */
    makeFlashRead4KCmd(addr) {
        const length = 1 + 4;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashRead4K;
        buf[8] = addr & 0xff;
        buf[9] = (addr >> 8) & 0xff;
        buf[10] = (addr >> 16) & 0xff;
        buf[11] = (addr >> 24) & 0xff;
        return buf.slice(0, length + 7);
    }

    /**
     * Flash擦除命令
     */
    makeFlashEraseCmd(addr, szCmd) {
        const length = 1 + 4 + 1;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashErase;
        buf[8] = szCmd;
        buf[9] = addr & 0xff;
        buf[10] = (addr >> 8) & 0xff;
        buf[11] = (addr >> 16) & 0xff;
        buf[12] = (addr >> 24) & 0xff;
        return buf.slice(0, length + 7);
    }

    /**
     * Flash写入4K命令
     */
    makeFlashWrite4KCmd(addr, data) {
        const length = 1 + 4 + 4 * 1024;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashWrite4K;
        buf[8] = addr & 0xff;
        buf[9] = (addr >> 8) & 0xff;
        buf[10] = (addr >> 16) & 0xff;
        buf[11] = (addr >> 24) & 0xff;
        buf.set(data, 12);
        return buf.slice(0, length + 7);
    }

    /**
     * CRC检查命令
     */
    makeCheckCRCCmd(startAddr, endAddr) {
        const length = 1 + 4 + 4;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = length;
        buf[4] = this.CMD.CheckCRC;
        buf[5] = startAddr & 0xff;
        buf[6] = (startAddr >> 8) & 0xff;
        buf[7] = (startAddr >> 16) & 0xff;
        buf[8] = (startAddr >> 24) & 0xff;
        buf[9] = endAddr & 0xff;
        buf[10] = (endAddr >> 8) & 0xff;
        buf[11] = (endAddr >> 16) & 0xff;
        buf[12] = (endAddr >> 24) & 0xff;
        return buf.slice(0, length + 4);
    }

    /**
     * Flash获取MID命令
     */
    makeFlashGetMIDCmd(regAddr) {
        const length = 1 + 4;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashGetMID;
        buf[8] = regAddr & 0xff;
        buf[9] = 0;
        buf[10] = 0;
        buf[11] = 0;
        return buf.slice(0, length + 7);
    }

    /**
     * Flash读取状态寄存器命令
     */
    makeFlashReadSRCmd(regAddr) {
        const length = 1 + 1;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashReadSR;
        buf[8] = regAddr & 0xff;
        return buf.slice(0, length + 7);
    }

    /**
     * Flash写入状态寄存器命令
     */
    makeFlashWriteSRCmd(regAddr, val) {
        const length = 1 + 1 + 2;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = 0xff;
        buf[4] = 0xf4;
        buf[5] = length & 0xff;
        buf[6] = (length >> 8) & 0xff;
        buf[7] = this.CMD.FlashWriteSR;
        buf[8] = regAddr & 0xff;
        buf[9] = val & 0xff;
        buf[10] = (val >> 8) & 0xff;
        return buf.slice(0, length + 7);
    }

    /**
     * 重启命令
     */
    makeRebootCmd() {
        const length = 1 + 1;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = length;
        buf[4] = this.CMD.Reboot;
        buf[5] = 0xa5;
        return buf.slice(0, length + 4);
    }

    /**
     * BK寄存器重启命令
     */
    makeBKRegDoRebootCmd() {
        const length = 1 + 4;
        const buf = this.createCmdBuffer();
        buf[0] = 0x01;
        buf[1] = 0xe0;
        buf[2] = 0xfc;
        buf[3] = length;
        buf[4] = this.CMD.BKRegDoReboot;
        buf[5] = 0x95;
        buf[6] = 0x27;
        buf[7] = 0x95;
        buf[8] = 0x27;
        return buf.slice(0, length + 4);
    }

    /**
     * 检查链路检查响应
     */
    checkLinkCheckResponse(buf) {
        return buf.length >= 7 && buf[6] === 0x00;
    }

    /**
     * 检查Flash MID响应
     */
    checkFlashMIDResponse(buf) {
        if (buf.length >= 10 && buf[6] === 0x00) {
            return (buf[7] << 16) | (buf[8] << 8) | buf[9];
        }
        return 0;
    }

    /**
     * 检查Flash读取SR响应
     */
    checkFlashReadSRResponse(buf, regAddr) {
        if (buf.length >= 9 && buf[6] === 0x00) {
            return [true, buf[7], buf[8]];
        }
        return [false, 0, 0];
    }

    /**
     * 检查Flash写入SR响应
     */
    checkFlashWriteSRResponse(buf, regAddr, val) {
        return buf.length >= 7 && buf[6] === 0x00;
    }

    /**
     * 检查CRC响应
     */
    checkCRCResponse(buf, startAddr, endAddr) {
        if (buf.length >= 11 && buf[6] === 0x00) {
            const crc = (buf[7] << 24) | (buf[8] << 16) | (buf[9] << 8) | buf[10];
            return [true, crc];
        }
        return [false, 0];
    }

    /**
     * 设置进度回调函数
     */
    setProgressCallback(callback) {
        this.onProgress = callback;
    }

    /**
     * 停止操作
     */
    stop() {
        this.stopFlag = true;
    }

    /**
     * 准备二进制文件
     */
    prepareBinFile(fileData) {
        let binData = new Uint8Array(fileData);
        const fileLen = binData.length;
        this.debugLog(`binfile len: ${fileLen}`);
        
        const paddingLen = 0x100 - (fileLen & 0xff);
        if (paddingLen > 0 && paddingLen < 0x100) {
            const paddedData = new Uint8Array(fileLen + paddingLen);
            paddedData.set(binData);
            paddedData.fill(0xff, fileLen);
            binData = paddedData;
        }
        
        this.binfil = {
            bin: binData,
            len: binData.length
        };
    }

    /**
     * 发送重启命令
     */
    async rebootCmdTx() {
        const cmd = this.makeBKRegDoRebootCmd();
        for (let i = 0; i < 3; i++) {
            await this.sendData(cmd);
            await this.sleep(150);
        }
        
        await this.port.setSignals({ dataTerminalReady: false, requestToSend: true });
        await this.sleep(200);
        await this.port.setSignals({ requestToSend: false });
        await this.sendData(cmd);
    }

    /**
     * 握手流程
     */
    async shake() {
        this.debugLog('开始握手流程');
        
        // 尝试自动重启
        await this.rebootCmdTx();
        
        // 链路检查
        let countSec = 0;
        let count = 0;
        const txbuf = this.makeLinkCheckCmd();
        const rxlen = 7;
        
        this.infoLog("等待设备复位...");
        
        while (true) {
            if (this.stopFlag) return false;
            
            const rxbuf = await this.rxWithTx(txbuf, rxlen, 1, 1);
            if (rxbuf.length > 0 && this.checkLinkCheckResponse(rxbuf)) {
                break;
            }
            
            if (countSec > 100) {
                this.debugLog("链路检查重试...");
                await this.rebootCmdTx();
                countSec = 0;
                count++;
                
                if (count > 15) {
                    this.errorLog("握手超时!");
                    return false;
                }
                
                await this.sendData(this.makeBKRegDoRebootCmd());
                
                // 尝试不同波特率
                if (this.port.baudRate === 115200) {
                    await this.port.close();
                    await this.sleep(100);
                    await this.port.open({ baudRate: 921600 });
                } else {
                    await this.port.close();
                    await this.sleep(100);
                    await this.port.open({ baudRate: 115200 });
                }
                
                // 发送重启命令
                await this.sendData(new TextEncoder().encode("reboot\r\n"));
                
                // 重置到bootrom波特率
                if (this.port.baudRate !== 115200) {
                    await this.port.close();
                    await this.sleep(100);
                    await this.port.open({ baudRate: 115200 });
                }
            }
            countSec++;
        }
        
        this.infoLog("链路检查成功");
        await this.sleep(10);
        await this.clearBuffer();
        
        if (this.stopFlag) return false;
        
        // 同步波特率
        if (this.baudrate !== 115200) {
            const dlyMs = 100;
            const baudrateCmd = this.makeSetBaudrateCmd(this.baudrate, dlyMs);
            await this.sendData(baudrateCmd);
            await this.sleep(10);
            
            await this.port.close();
            await this.sleep(100);
            await this.port.open({ baudRate: this.baudrate });
            
            const rxbuf = await this.slipReader(7, 500);
            if (rxbuf.length > 0) {
                this.debugLog(`设置波特率 ${this.baudrate} 成功`);
            } else {
                this.errorLog(`设置波特率 ${this.baudrate} 失败`);
                return false;
            }
        }
        
        this.infoLog(`同步波特率 ${this.baudrate} 成功`);
        return true;
    }

    /**
     * Flash保护/去保护
     */
    async doBootProtectFlash(mid, unprotect) {
        const flashInfo = this.FLASH_DB[mid];
        if (!flashInfo) {
            this.errorLog(`未知Flash芯片: 0x${mid.toString(16)}`);
            return false;
        }
        
        this.debugLog(`Flash信息: ${flashInfo.name}`);
        
        const timeout = 50;
        const cw = unprotect ? flashInfo.cwUnp : flashInfo.cwEnp;
        let loopCnt = 0;
        
        while (true) {
            if (this.stopFlag) return false;
            
            let sr = 0;
            loopCnt++;
            
            // 读取SR寄存器
            for (let i = 0; i < flashInfo.szSR; i++) {
                const txbuf = this.makeFlashReadSRCmd(flashInfo.cwdRd[i]);
                const rxbuf = await this.rxWithTx(txbuf, 9);
                if (rxbuf.length > 0) {
                    const [success, , value] = this.checkFlashReadSRResponse(rxbuf, flashInfo.cwdRd[i]);
                    if (success) {
                        sr |= value << (8 * i);
                    }
                }
            }
            
            // 检查是否已设置
            const expectedValue = this.calcBFD(cw, flashInfo.sb, flashInfo.lb);
            if ((sr & flashInfo.cwMsk) === expectedValue) {
                return true;
            }
            
            if (loopCnt > timeout) {
                return false;
            }
            
            // 设置保护字
            let srt = sr & (flashInfo.cwMsk ^ 0xffffffff);
            srt |= expectedValue;
            
            const txbuf = this.makeFlashWriteSRCmd(flashInfo.cwdWr[0], srt & 0xffff);
            await this.rxWithTx(txbuf, 7);
            
            await this.sleep(10);
        }
    }

    /**
     * 计算位域值
     */
    calcBFD(v, bs, bl) {
        return (v & ((1 << bl) - 1)) << bs;
    }

    /**
     * 读取扇区
     */
    async readSector(addr) {
        const txbuf = this.makeFlashRead4KCmd(addr);
        const rxlen = 7 + 4096;
        const rxbuf = await this.rxWithTx(txbuf, rxlen, 5000);
        
        if (rxbuf.length >= rxlen && rxbuf[6] === 0x00) {
            return rxbuf.slice(7, 7 + 4096);
        }
        return new Uint8Array(0);
    }

    /**
     * 擦除块
     */
    async eraseBlock(addr, val) {
        const txbuf = this.makeFlashEraseCmd(addr, val);
        const rxbuf = await this.rxWithTx(txbuf, 7, 1000);
        return rxbuf.length >= 7 && rxbuf[6] === 0x00;
    }

    /**
     * 写入扇区
     */
    async writeSector(addr, buf) {
        const data4K = new Uint8Array(4096);
        data4K.set(buf.slice(0, Math.min(buf.length, 4096)));
        if (buf.length < 4096) {
            data4K.fill(0xff, buf.length);
        }
        
        const txbuf = this.makeFlashWrite4KCmd(addr, data4K);
        const rxbuf = await this.rxWithTx(txbuf, 7);
        return rxbuf.length >= 7 && rxbuf[6] === 0x00;
    }

    /**
     * 写入扇区（带重试）
     */
    async writeSectorLoops(addr, buf, loop) {
        for (let i = 0; i < loop; i++) {
            if (await this.writeSector(addr, buf)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 读取CRC
     */
    async readCRC(start, end, timeout = 5000) {
        const txbuf = this.makeCheckCRCCmd(start, end);
        const rxbuf = await this.rxWithTx(txbuf, 11, timeout);
        return this.checkCRCResponse(rxbuf, start, end);
    }

    /**
     * 获取Flash MID
     */
    async getFlashMID() {
        const txbuf = this.makeFlashGetMIDCmd(0x9f);
        const rxbuf = await this.rxWithTx(txbuf, 10);
        if (rxbuf.length > 0) {
            return this.checkFlashMIDResponse(rxbuf);
        }
        return 0;
    }

    /**
     * 擦除流程
     */
    async erase(fileData) {
        if (this.stopFlag) return false;
        
        this.prepareBinFile(fileData);
        const binfileLen = this.binfil.len;
        const binfileData = this.binfil.bin;
        let binfileSubLen = binfileLen;
        
        if (this.onProgress) {
            this.onProgress(0, 5, "准备擦除Flash...");
        }
        
        // 获取Flash MID
        for (let i = 0; i < this.retry; i++) {
            const flashMid = await this.getFlashMID();
            if (flashMid) {
                this.debugLog(`flash_mid: 0x${flashMid.toString(16)}`);
                this.flashMid = flashMid;
                break;
            }
        }
        
        if (!this.flashMid) {
            this.errorLog("获取Flash MID失败");
            return false;
        }
        
        // 去保护Flash
        for (let i = 0; i < this.retry; i++) {
            if (await this.doBootProtectFlash(this.flashMid, true)) {
                this.debugLog("去保护Flash成功");
                break;
            }
            await this.sleep(1);
        }
        
        if (this.onProgress) {
            this.onProgress(1, 5, "开始擦除Flash...");
        }
        
        // 擦除首个4K
        if (this.stopFlag) return false;
        
        const eraseAddr = this.startAddr;
        let alignedAddr = eraseAddr & 0xfffff000;
        const alignedOutLen = eraseAddr - alignedAddr;
        
        if (alignedOutLen) {
            this.debugLog(`擦除首个4K块 [${alignedAddr.toString(16)}:${alignedOutLen.toString(16)}]...`);
            const buf4K = await this.readSector(alignedAddr);
            
            if (buf4K.length < 4096) {
                this.errorLog(`读取扇区数据不足4K: [${buf4K.length}]`);
                return false;
            }
            
            const coverLen = 0x1000 - alignedOutLen;
            const coverLenMin = Math.min(coverLen, binfileLen);
            
            // 覆盖数据
            for (let i = 0; i < coverLenMin; i++) {
                buf4K[alignedOutLen + i] = binfileData[i];
            }
            
            await this.eraseBlock(alignedAddr, 0x20);
            
            if (!await this.writeSector(alignedAddr, buf4K)) {
                this.errorLog("擦除首个4K块失败");
                return false;
            }
            
            binfileSubLen -= coverLenMin;
            if (binfileSubLen <= 0) {
                return true;
            }
            
            this.binfil.bin = binfileData.slice(coverLenMin);
            alignedAddr += 0x1000;
        }
        
        if (this.onProgress) {
            this.onProgress(2, 5, "擦除中间区域...");
        }
        
        // 擦除其他区域的逻辑（简化）
        const eraseEndAddr = eraseAddr + binfileLen;
        let currentAddr = alignedAddr;
        
        while (currentAddr < eraseEndAddr) {
            if (this.stopFlag) return false;
            
            const subLen = eraseEndAddr - currentAddr;
            if (subLen > 0x10000) {
                this.debugLog(`擦除64K块 [${currentAddr.toString(16)}]...`);
                await this.eraseBlock(currentAddr, 0xd8);
                currentAddr += 0x10000;
            } else {
                this.debugLog(`擦除4K块 [${currentAddr.toString(16)}]...`);
                await this.eraseBlock(currentAddr, 0x20);
                currentAddr += 0x1000;
            }
        }
        
        this.binfil.startAddr = alignedAddr;
        
        if (this.onProgress) {
            this.onProgress(5, 5, "擦除完成");
        }
        
        this.infoLog("擦除Flash成功");
        return true;
    }

    /**
     * 写入流程
     */
    async write() {
        if (this.stopFlag) return false;
        
        const binData = this.binfil.bin;
        const writeStartAddr = this.binfil.startAddr || this.startAddr;
        const binfileSubLen = binData.length;
        const totalWrite = Math.ceil(binfileSubLen / 0x1000);
        const writeEndAddr = writeStartAddr + binfileSubLen;
        
        this.debugLog(`write_start_addr: 0x${writeStartAddr.toString(16)}`);
        this.debugLog(`write_end_addr: 0x${writeEndAddr.toString(16)}`);
        this.debugLog(`total_write: ${totalWrite}`);
        
        if (this.onProgress) {
            this.onProgress(0, totalWrite, "开始写入Flash...");
        }
        
        let writeNowAddr = writeStartAddr;
        let binDataPtr = 0;
        let currentStep = 0;
        
        while (writeNowAddr < writeEndAddr) {
            if (this.stopFlag) return false;
            
            this.debugLog(`写入Flash [0x${writeNowAddr.toString(16)}]...`);
            const sectorData = binData.slice(binDataPtr, binDataPtr + 0x1000);
            
            if (!await this.writeSectorLoops(writeNowAddr, sectorData, this.retry)) {
                this.errorLog("写入Flash失败!");
                return false;
            }
            
            currentStep++;
            if (this.onProgress) {
                this.onProgress(currentStep, totalWrite, `写入进度 ${currentStep}/${totalWrite}`);
            }
            
            writeNowAddr += 0x1000;
            binDataPtr += 0x1000;
        }
        
        // 保护Flash
        await this.doBootProtectFlash(this.flashMid, false);
        
        this.infoLog("写入Flash成功");
        return true;
    }

    /**
     * CRC检查
     */
    async crcCheck() {
        if (this.stopFlag) return false;
        
        const binData = this.binfil.bin;
        const binLen = this.binfil.len;
        const startAddr = this.startAddr;
        
        if (this.onProgress) {
            this.onProgress(0, 4, "开始CRC检查...");
        }
        
        // 计算bin文件CRC
        const binCrc = this.crc32(0xffffffff, binData);
        this.debugLog(`bin_crc: 0x${binCrc.toString(16)}`);
        
        if (this.onProgress) {
            this.onProgress(1, 4, "计算Flash CRC...");
        }
        
        let alignedLen = binLen;
        if (binLen & 0xff) {
            alignedLen = (binLen & ~0xff) + 0x100;
        }
        
        let timeout = Math.max(15000, binLen * 15 / 1024 / 1024 * 1000);
        
        if (this.onProgress) {
            this.onProgress(2, 4, "读取Flash CRC...");
        }
        
        const [success, rxCrc] = await this.readCRC(startAddr, startAddr + alignedLen - 1, timeout);
        this.debugLog(`rx_crc: 0x${rxCrc.toString(16)}`);
        
        if (!success) {
            this.errorLog("读取CRC失败!");
            return false;
        }
        
        if (rxCrc !== binCrc) {
            this.errorLog(`CRC检查失败 -> binfile_crc: 0x${binCrc.toString(16)} != readchip_crc: 0x${rxCrc.toString(16)}`);
            return false;
        }
        
        if (this.onProgress) {
            this.onProgress(4, 4, "CRC检查完成");
        }
        
        this.infoLog("CRC检查成功");
        return true;
    }

    /**
     * 重启
     */
    async reboot() {
        const txbuf = this.makeRebootCmd();
        for (let i = 0; i < 3; i++) {
            await this.sendData(txbuf);
        }
        this.infoLog("重启完成");
        return true;
    }

    /**
     * 主下载流程
     */
    async downloadFirmware(fileData) {
        this.mainLog(`开始下载固件到 ${this.chipName}，文件大小: ${fileData.length} 字节`);
        
        try {
            // 1. 握手
            this.mainLog("开始握手流程...");
            if (!await this.shake()) {
                throw new Error("握手失败");
            }
            
            // 2. 擦除
            this.mainLog("开始擦除Flash...");
            if (!await this.erase(fileData)) {
                throw new Error("擦除失败");
            }
            
            // 3. 写入
            this.mainLog("开始写入固件...");
            if (!await this.write()) {
                throw new Error("写入失败");
            }
            
            // 4. CRC检查
            this.mainLog("开始CRC检查...");
            if (!await this.crcCheck()) {
                throw new Error("CRC检查失败");
            }
            
            // 5. 重启
            this.mainLog("开始重启...");
            if (!await this.reboot()) {
                throw new Error("重启失败");
            }
            
            this.mainLog("固件烧录完成!");
            return { success: true };
            
        } catch (error) {
            this.errorLog(`下载失败: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    /**
     * 连接设备
     */
    async connect() {
        this.mainLog(`正在连接 ${this.chipName}...`);
        this.stopFlag = false;
        return { success: true };
    }

    /**
     * 断开连接
     */
    async disconnect() {
        this.mainLog(`断开 ${this.chipName} 连接`);
        this.stopFlag = true;
    }

    /**
     * 辅助函数
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async clearBuffer() {
        let reader = null;
        try {
            reader = this.port.readable.getReader();
            while (true) {
                const { value, done } = await Promise.race([
                    reader.read(),
                    new Promise(resolve => setTimeout(() => resolve({ done: true }), 5))
                ]);
                if (done || !value || value.length === 0) break;
            }
        } catch (error) {
            // 忽略错误
        } finally {
            if (reader) {
                try { reader.releaseLock(); } catch (e) {}
            }
        }
    }

    async readData(length, timeout = 1000) {
        let reader = null;
        try {
            reader = this.port.readable.getReader();
            const buffer = [];
            const startTime = Date.now();
            
            while (buffer.length < length && Date.now() - startTime < timeout) {
                const { value, done } = await Promise.race([
                    reader.read(),
                    new Promise(resolve => setTimeout(() => resolve({ done: true }), 10))
                ]);
                if (done) break;
                if (value) {
                    buffer.push(...value);
                }
            }
            
            return new Uint8Array(buffer.slice(0, length));
        } finally {
            if (reader) {
                try { reader.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 日志方法
     */
    mainLog(message) {
        this.debug('main', message);
    }

    infoLog(message) {
        this.debug('info', message);
    }

    debugLog(message, data = null) {
        this.debug('debug', message, data);
    }

    errorLog(message) {
        this.debug('error', message);
    }

    getDeviceStatus() {
        return {
            chipName: this.chipName,
            connected: true
        };
    }

    isConnected() {
        return !this.stopFlag;
    }
}

// 确保类在全局范围内可用
if (typeof window !== 'undefined') {
    window.BK7231NDownloader = BK7231NDownloader;
}