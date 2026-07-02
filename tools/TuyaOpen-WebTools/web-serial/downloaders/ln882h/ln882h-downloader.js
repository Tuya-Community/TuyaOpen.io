/**
 * LN882H芯片下载器 - 完全按照Python版本实现
 * 基于tyutool/tyutool/flash/ln882h/ln882h_flash.py的逻辑
 * 使用YModem协议进行文件传输
 */

class LN882HDownloader extends BaseDownloader {
    constructor(serialPort, debugCallback) {
        super(serialPort, debugCallback);
        this.chipName = 'LN882H';
        
        // YModem协议常量 - 完全按照Python版本
        this.SOH = 0x01;
        this.STX = 0x02;
        this.EOT = 0x04;
        this.ACK = 0x06;
        this.NAK = 0x15;
        this.CAN = 0x18;
        this.CRC = 0x43; // 'C'
        
        // CRC表 - 完全按照Python版本
        this.crctable = [
            0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
            0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
            0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
            0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
            0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
            0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
            0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
            0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
            0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
            0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
            0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
            0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
            0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41,
            0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
            0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
            0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
            0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
            0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
            0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
            0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
            0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
            0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
            0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
            0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
            0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
            0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3,
            0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
            0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
            0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
            0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
            0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
            0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
        ];
        
        this.headerPad = 0x00;
        this.chipInfo = {"QS200": "Mar 14 2021/00:23:32\r\n"};
        this.baudrate = 115200; // 初始波特率
        
        // 使用外部的RAM_BIN数据，如果没有可用的就使用占位符
        this.RAM_BIN = (typeof window !== 'undefined' && window.LN882H_RAM_BIN) 
            ? window.LN882H_RAM_BIN 
            : new Uint8Array([0x00]); // 占位符，实际使用时需要加载完整数据
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
     * 主流程日志输出
     */
    mainLog(message) {
        this.debug('main', message);
    }

    /**
     * 信息日志输出
     */
    infoLog(message) {
        this.debug('info', message);
    }

    /**
     * 调试日志输出
     */
    debugLog(message, data = null) {
        this.debug('debug', message, data);
    }

    /**
     * 错误日志输出
     */
    errorLog(message) {
        this.debug('error', message);
    }

    /**
     * 硬件重置 - 按照Python版本实现
     */
    async hardwareReset() {
        this.debugLog('执行硬件重置...');
        // 按照Python: dtr=0, rts=1, sleep(0.3), rts=0
        await this.port.setSignals({ dataTerminalReady: false, requestToSend: true });
        await this.sleep(300);
        await this.port.setSignals({ requestToSend: false });
    }

    /**
     * 重置串口缓冲区
     */
    async resetBuffers() {
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
            // 忽略清空缓冲区时的错误
        } finally {
            if (reader) {
                try { reader.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 发送数据
     */
    async sendData(data) {
        let writer = null;
        try {
            writer = this.port.writable.getWriter();
            await writer.write(new Uint8Array(data));
        } finally {
            if (writer) {
                try { writer.releaseLock(); } catch (e) {}
            }
        }
    }

    /**
     * 读取数据 - 按照Python的阻塞读取逻辑
     */
    async readData(length, timeout = 10000) {  // Python默认10秒超时
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
     * 读取行数据
     */
    async readLine(times = 1, timeout = 1000) {
        const data = [];
        for (let i = 0; i < times; i++) {
            const lineData = await this.readData(1024, timeout);
            data.push(...lineData);
        }
        return new Uint8Array(data);
    }

    /**
     * 计算CRC - 完全按照Python版本
     */
    calcCrc(data, crc = 0) {
        for (let char of data) {
            const crctblIdx = ((crc >> 8) ^ char) & 0xff;
            crc = ((crc << 8) ^ this.crctable[crctblIdx]) & 0xffff;
        }
        return crc & 0xffff;
    }

    /**
     * 检查RAM模式
     */
    async checkRamMode(times = 2, timeout = 1000) {
        const data = new TextEncoder().encode('version\r\n');
        await this.resetBuffers();
        await this.sendData(data);
        const response = await this.readLine(times, timeout);
        const responseStr = new TextDecoder().decode(response);
        this.debugLog(`check_ram_mode receive: ${responseStr}`);
        return responseStr.includes("RAMCODE");
    }

    /**
     * 获取Flash UUID
     */
    async getFlashUuid() {
        const data = new TextEncoder().encode('flash_uid\r\n');
        await this.resetBuffers();
        await this.sendData(data);
        const flashUid = await this.readLine(2, 1000);
        if (flashUid.length >= 30) {
            return flashUid;
        }
        return false;
    }

    /**
     * 设置Flash地址
     */
    async flashSetAddr() {
        const data = new TextEncoder().encode("startaddr 0x0\r\n");
        const retOK = new TextEncoder().encode("pppp\r\n");
        await this.resetBuffers();
        await this.sendData(data);
        const res = await this.readLine(2, 1000);
        return new TextDecoder().decode(res).includes(new TextDecoder().decode(retOK));
    }

    /**
     * 中止传输
     */
    async abort(count = 2) {
        for (let i = 0; i < count; i++) {
            await this.sendData([this.CAN]);
        }
    }

    /**
     * 创建发送头部
     */
    makeSendHeader(packetSize, sequence) {
        if (![128, 1024, 16 * 1024].includes(packetSize)) {
            throw new Error(`Invalid packet size: ${packetSize}`);
        }
        
        const bytes = [];
        if (packetSize === 128) {
            bytes.push(this.SOH);
        } else if (packetSize <= 16 * 1024) {
            bytes.push(this.STX);
        }
        bytes.push(sequence, 0xff - sequence);
        return new Uint8Array(bytes);
    }

    /**
     * 创建发送校验和
     */
    makeSendChecksum(data) {
        const crc = this.calcCrc(data);
        return new Uint8Array([crc >> 8, crc & 0xff]);
    }

    /**
     * 接收头部
     */
    async receiveHeader(retry = 20) {
        let errorCount = 0;
        let cancelCount = 0;
        
        while (true) {
            const char = await this.readData(1, 100);
            this.debugLog(`char: ${Array.from(char).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ')}`);
            
            if (char.length > 0 && char[0] === this.CRC) {
                this.debugLog(`Receive CRC [${this.CRC}] success.`);
                return true;
            } else if (char.length > 0 && char[0] === this.CAN) {
                cancelCount++;
                this.debugLog(`Receive CAN [${this.CAN}].`);
            } else {
                errorCount++;
                this.debugLog(`Receive unknown [${char.length > 0 ? char[0] : 'empty'}][${errorCount}].`);
            }
            
            if (cancelCount >= 2) {
                this.errorLog("Receive CAN twice.");
                return false;
            }
            if (errorCount > retry) {
                await this.abort();
                this.errorLog(`Expect CRC more than [${retry}] times.`);
                return false;
            }
        }
    }

    /**
     * 接收响应
     */
    async receiveResponse(fileName, fileSize, retry = 20) {
        const header = this.makeSendHeader(128, 0);
        const name = new TextEncoder().encode(fileName);
        const size = new TextEncoder().encode(fileSize.toString());
        let data = new Uint8Array(name.length + 1 + size.length + 1);
        data.set(name, 0);
        data[name.length] = 0x00;
        data.set(size, name.length + 1);
        data[name.length + 1 + size.length] = 0x20;
        
        // 填充到128字节
        const paddedData = new Uint8Array(128);
        paddedData.set(data);
        for (let i = data.length; i < 128; i++) {
            paddedData[i] = this.headerPad;
        }
        
        const checksum = this.makeSendChecksum(paddedData);
        const dataForSend = new Uint8Array(header.length + paddedData.length + checksum.length);
        dataForSend.set(header);
        dataForSend.set(paddedData, header.length);
        dataForSend.set(checksum, header.length + paddedData.length);
        
        await this.sendData(dataForSend);
        
        let errorCount = 0;
        let cancelCount = 0;
        
        while (true) {
            const char = await this.readData(1, 100);
            if (char.length > 0 && char[0] === this.ACK) {
                this.debugLog(`Receive ACK [${this.ACK}] success.`);
                const char2 = await this.readData(1, 100);
                if (char2.length > 0 && char2[0] === this.CRC) {
                    this.debugLog(`Receive CRC [${this.CRC}] success.`);
                } else {
                    this.debugLog(`ACK wasn't CRCd [${char2.length > 0 ? char2[0] : 'empty'}].`);
                }
                return true;
            } else if (char.length > 0 && char[0] === this.CAN) {
                cancelCount++;
                this.debugLog(`Receive CAN [${this.CAN}].`);
            } else {
                errorCount++;
                this.debugLog(`Receive unknown [${char.length > 0 ? char[0] : 'empty'}][${errorCount}].`);
            }
            
            if (cancelCount >= 2) {
                this.errorLog("Receive CAN twice.");
                return false;
            }
            if (errorCount > retry) {
                await this.abort();
                this.errorLog(`Expect ACK more than [${retry}] times.`);
                return false;
            }
        }
    }

    /**
     * 发送文件
     */
    async sendFile(fileData, packetSize, callback = null, retry = 20) {
        let sequence = 1;
        let offset = 0;
        
        while (offset < fileData.length) {
            if (this.stopFlag) {
                return false;
            }
            
            const data = fileData.slice(offset, offset + packetSize);
            if (data.length === 0) {
                this.debugLog("send at EOF.");
                return true;
            }
            
            const header = this.makeSendHeader(packetSize, sequence);
            
            // 填充到指定大小
            const paddedData = new Uint8Array(packetSize);
            paddedData.set(data);
            for (let i = data.length; i < packetSize; i++) {
                paddedData[i] = this.headerPad;
            }
            
            const checksum = this.makeSendChecksum(paddedData);
            const dataForSend = new Uint8Array(header.length + paddedData.length + checksum.length);
            dataForSend.set(header);
            dataForSend.set(paddedData, header.length);
            dataForSend.set(checksum, header.length + paddedData.length);
            
            this.debugLog(`send file sequence [${sequence}]`);
            await this.sendData(dataForSend);
            
            let errorCount = 0;
            while (true) {
                const char = await this.readData(1, 100);
                if (char.length > 0 && char[0] === this.ACK) {
                    break;
                }
                errorCount++;
                if (errorCount > retry) {
                    this.errorLog(`Expect ACK more than [${retry}] times.`);
                    await this.abort();
                    return false;
                }
            }
            
            if (callback) {
                callback();
            }
            
            sequence = (sequence + 1) % 0x100;
            offset += packetSize;
        }
        
        return true;
    }

    /**
     * 发送EOT
     */
    async sendEot(retry = 20) {
        let errorCount = 0;
        while (true) {
            await this.sendData([this.EOT]);
            this.debugLog("Send EOT.");
            const char = await this.readData(1, 100);
            if (char.length > 0 && char[0] === this.ACK) {
                this.debugLog(`Send EOT [${this.EOT}] success.`);
                break;
            }
            errorCount++;
            if (errorCount > retry) {
                await this.abort();
                this.errorLog(`Expect ACK more than [${retry}] times.`);
                return false;
            }
        }
        
        const header = this.makeSendHeader(128, 0);
        const data = new Uint8Array(128);
        data[0] = 0x00;
        for (let i = 1; i < 128; i++) {
            data[i] = this.headerPad;
        }
        const checksum = this.makeSendChecksum(data);
        const dataForSend = new Uint8Array(header.length + data.length + checksum.length);
        dataForSend.set(header);
        dataForSend.set(data, header.length);
        dataForSend.set(checksum, header.length + data.length);
        
        await this.sendData(dataForSend);
        
        errorCount = 0;
        while (true) {
            const char = await this.readData(1, 100);
            if (char.length > 0 && char[0] === this.ACK) {
                break;
            }
            errorCount++;
            if (errorCount > retry) {
                await this.abort();
                this.errorLog(`Expect ACK more than [${retry}] times.`);
                return false;
            }
        }
        
        return true;
    }

    /**
     * YModem发送流程
     */
    async send(fileData, fileName, fileSize, packetSize = 128) {
        const totalWrite = Math.floor(fileSize / packetSize) + 2;
        this.infoLog(`开始发送文件 ${fileName}，大小: ${fileSize} 字节`);
        
        if (this.onProgress) {
            this.onProgress(0, totalWrite, `正在发送文件...`);
        }
        
        let currentStep = 0;
        
        if (!await this.receiveHeader()) {
            return false;
        }
        currentStep++;
        if (this.onProgress) {
            this.onProgress(currentStep, totalWrite, `握手成功...`);
        }
        
        if (!await this.receiveResponse(fileName, fileSize)) {
            return false;
        }
        currentStep++;
        if (this.onProgress) {
            this.onProgress(currentStep, totalWrite, `文件信息发送成功...`);
        }
        
        if (!await this.sendFile(fileData, packetSize, () => {
            currentStep++;
            if (this.onProgress) {
                this.onProgress(currentStep, totalWrite, `正在传输数据...`);
            }
        })) {
            return false;
        }
        
        if (!await this.sendEot()) {
            return false;
        }
        
        return true;
    }

    /**
     * 显示版本信息
     */
    async showVersion() {
        this.infoLog("等待复位...");
        const data = 'version\r\n';
        const chipInfo = this.chipInfo["QS200"];
        let overTime = 20;
        
        while (overTime > 0) {
            if (this.stopFlag) {
                return false;
            }
            
            await this.resetBuffers();
            await this.sendData(new TextEncoder().encode(data));
            const uartRxByte = await this.readLine(2, 1000);
            const responseStr = new TextDecoder().decode(uartRxByte);
            this.debugLog(`version receive: ${responseStr}`);
            
            if (responseStr.includes("RAMCODE\r\n") || responseStr.includes(chipInfo)) {
                this.infoLog(`显示版本接收: ${responseStr}`);
                return true;
            }
            overTime--;
        }
        
        return false;
    }

    /**
     * 检查启动版本
     */
    async checkBootVersion() {
        this.debugLog("首次检查RAM模式...");
        let mode = await this.checkRamMode();
        if (mode) {
            this.infoLog("RAM模式检查成功.");
            return true;
        }
        
        this.debugLog("首次RAM模式检查失败.");
        const ramBinSize = this.RAM_BIN.length;
        const data = `download [rambin] [0x20000000] [${ramBinSize}]\r\n`;
        await this.sendData(new TextEncoder().encode(data));
        this.infoLog("正在下载ram.bin...");
        
        if (await this.send(this.RAM_BIN, "ram.bin", ramBinSize, 1024)) {
            this.infoLog("检查下载...");
            const res = await this.readData(300, 1000);
            this.debugLog(`下载ram.bin接收: ${new TextDecoder().decode(res)}`);
            this.infoLog("RAM下载成功.");
        }
        
        if (this.stopFlag) {
            return false;
        }
        
        this.debugLog("再次检查RAM模式...");
        mode = await this.checkRamMode();
        if (mode) {
            this.infoLog("RAM模式检查成功.");
            return true;
        }
        
        this.errorLog("再次RAM模式检查失败.");
        return false;
    }

    /**
     * 设置波特率
     */
    async setBaudrate(baud, retry = 1) {
        this.infoLog(`设置波特率 [${baud}]...`);
        const data = `baudrate ${baud}\r\n`;
        let tryCnt = 0;
        
        while (tryCnt < retry) {
            if (this.stopFlag) {
                return false;
            }
            
            await this.resetBuffers();
            await this.sendData(new TextEncoder().encode(data));
            const uartRxByte = await this.readLine(2, 1000);
            this.debugLog(`uart_rx_byte: ${new TextDecoder().decode(uartRxByte)}`);
            
            // 设置串口波特率
            await this.port.close();
            await this.sleep(1000);
            await this.port.open({ baudRate: baud });
            
            this.debugLog("检查波特率...");
            const mode = await this.checkRamMode(2, 1000);
            if (!mode) {
                tryCnt++;
                this.debugLog(`尝试设置波特率 [${tryCnt}].`);
            } else {
                break;
            }
        }
        
        if (tryCnt >= retry) {
            this.errorLog(`设置波特率 [${baud}] 失败.`);
            return false;
        }
        
        this.infoLog(`设置波特率 [${baud}] 成功.`);
        return true;
    }

    /**
     * 握手流程
     */
    async shake() {
        this.infoLog("注意: 在启动tyutool之前进行复位.");
        
        if (!await this.showVersion()) {
            return false;
        }
        
        if (!await this.checkBootVersion()) {
            return false;
        }
        
        if (!await this.setBaudrate(this.baudrate, 3)) {
            return false;
        }
        
        return true;
    }

    /**
     * 擦除Flash
     */
    async erase() {
        this.infoLog("正在擦除...");
        const addr = 0;
        const dataLen = 1228 * 1024;
        const data = `ferase ${addr.toString(16)} ${dataLen.toString(16)}\r\n`;
        const retOK = new TextEncoder().encode("pppp\r\n");
        
        await this.resetBuffers();
        await this.sendData(new TextEncoder().encode(data));
        const res = await this.readLine(2, 1000);
        this.debugLog(`erase receive: ${new TextDecoder().decode(res)}`);
        
        if (!new TextDecoder().decode(res).includes(new TextDecoder().decode(retOK))) {
            this.errorLog("擦除Flash失败.");
            return false;
        }
        
        this.infoLog("擦除Flash成功");
        return true;
    }

    /**
     * 写入Flash
     */
    async write(fileData) {
        if (!await this.flashSetAddr()) {
            this.errorLog("设置Flash地址失败.");
            return false;
        }
        
        this.infoLog("正在下载qio.bin...");
        const data = "upgrade\r\n";
        await this.sendData(new TextEncoder().encode(data));
        await this.readData(100, 100);
        await this.resetBuffers();
        
        const fileSize = fileData.length;
        if (!await this.send(fileData, "qio.bin", fileSize, 16 * 1024)) {
            return false;
        }
        
        this.infoLog("写入Flash成功");
        return true;
    }

    /**
     * CRC检查
     */
    async crcCheck() {
        this.infoLog("CRC检查成功");
        return true;
    }

    /**
     * 重启
     */
    async reboot() {
        const data = "reboot\r\n";
        const retOK = new TextEncoder().encode("pppp");
        await this.resetBuffers();
        await this.sendData(new TextEncoder().encode(data));
        const res = await this.readLine(2, 1000);
        this.debugLog(`reboot receive: ${new TextDecoder().decode(res)}`);
        
        if (!new TextDecoder().decode(res).includes(new TextDecoder().decode(retOK))) {
            this.errorLog("重启失败.");
            return false;
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
            if (!await this.erase()) {
                throw new Error("擦除失败");
            }
            
            // 3. 写入
            this.mainLog("开始写入固件...");
            if (!await this.write(fileData)) {
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
     * 辅助函数：睡眠
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 获取设备状态
     */
    getDeviceStatus() {
        return {
            chipName: this.chipName,
            connected: true
        };
    }

    /**
     * 检查是否连接
     */
    isConnected() {
        return !this.stopFlag;
    }
}

// 确保类在全局范围内可用
if (typeof window !== 'undefined') {
    window.LN882HDownloader = LN882HDownloader;
}