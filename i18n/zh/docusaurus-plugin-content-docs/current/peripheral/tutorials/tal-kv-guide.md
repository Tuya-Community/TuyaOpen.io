---
title: TAL KV 存储指南
---

## 概述

TAL KV（`tal_kv.h`）为 TuyaOpen 应用提供持久化键值存储。值为二进制字节流；部分接口可将结构化字段序列化为 JSON 后写入。实现基于 LittleFS（`lfs.h`），`tal_lfs_get()` 可取得 `lfs_t *` 做进阶文件操作。

**读者：** 需要在掉电后仍保存配置、标定数据或小数据块的开发者。

## 前置条件

- 已完成 [环境搭建](../../quick-start/enviroment-setup)，工程可正常编译运行。
- 了解闪存擦写寿命，避免对同一 key 高频写入。

## 要求

- 目标平台与产品已启用 TAL KV（通常由 Kconfig / SDK 默认打开，尤其云相关方案）。
- key 与 value 大小符合分区与 LittleFS 配置限制。

## API 摘要

| 函数 | 作用 |
|----------|---------|
| `tal_kv_init(tal_kv_cfg_t *kv_cfg)` | 初始化 KV（`tal_kv_cfg_t` 中含 seed/key 等）。 |
| `tal_kv_set(const char *key, const uint8_t *value, size_t length)` | 写入原始字节。 |
| `tal_kv_get(const char *key, uint8_t **value, size_t *length)` | 读取；用完需 `tal_kv_free`。 |
| `tal_kv_free(uint8_t *value)` | 释放 `tal_kv_get` 返回的缓冲区。 |
| `tal_kv_del(const char *key)` | 删除键。 |
| `tal_kv_serialize_set(const char *key, kv_db_t *db, size_t dbcnt)` | 将多字段序列化后写入。 |
| `tal_kv_serialize_get(const char *key, kv_db_t *db, size_t dbcnt)` | 反序列化到 `kv_db_t` 行。 |
| `tal_kv_cmd(int argc, char *argv[])` | 内部/调试命令入口。 |
| `tal_lfs_get(void)` | 返回 `lfs_t *`。 |

序列化类型为 `kv_tp_t`：`KV_CHAR`、`KV_BYTE`、`KV_SHORT`、`KV_USHORT`、`KV_INT`、`KV_BOOL`、`KV_STRING`、`KV_RAW`。

## 步骤（原始 KV）

1. 系统启动后按产品或板级示例调用 `tal_kv_init()` 填写 `tal_kv_cfg_t`。
2. 写入：`tal_kv_set("my_key", data, len)`。
3. 读取：`tal_kv_get` 输出 `*value` 与 `*length`，使用完毕后 `tal_kv_free(*value)`。
4. 删除：`tal_kv_del("my_key")`。

**预期结果：** 在未擦除分区或未覆盖的前提下，重启后键值仍存在。

## 平台说明

- 具体分区与挂载由 BSP/SDK 决定；若涉及 OTA 或恢复出厂，需确认 KV 分区策略。
- 大块数据或文件型需求可评估是否改用文件接口或独立分区，而非频繁 KV 写入。

## 参考

- 源码：`TuyaOpen/src/tal_kv/include/tal_kv.h`
- [TAL System API 参考](tal-system-api)
- [快速开始](../../quick-start/index)
