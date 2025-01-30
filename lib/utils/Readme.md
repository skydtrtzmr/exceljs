# lib/utils/Readme.md

该文件夹包含多个实用工具模块，主要用于处理 Excel 文件的数据流、字符串、加密、XML 解析等操作。以下是主要模块的功能概述：

- auto-drain.js: 实现了一个自动排空的数据流类。
- browser-buffer-decode.js: 处理浏览器环境下的 Buffer 解码。
- browser-buffer-encode.js: 处理浏览器环境下的 Buffer 编码。
- cell-matrix.js: 管理 Excel 单元格矩阵的数据结构。
- col-cache.js: 处理 Excel 列索引和字母之间的转换。
- copy-style.js: 复制 Excel 单元格样式。
- encryptor.js: 提供加密功能，支持密码哈希生成。
- iterate-stream.js: 提供异步迭代流的功能。
- parse-sax.js: 使用 SAX 解析器处理 XML 数据流。
- shared-formula.js: 处理 Excel 共享公式的逻辑。
- shared-strings.js: 管理 Excel 共享字符串表。
- stream-base64.js: 实现 Base64 编码的数据流。
- stream-buf.js: 提供缓冲流的功能。
- string-buf.js: 实现字符串缓冲区。
- string-builder.js: 提供字符串构建功能。
- stuttered-pipe.js: 实现带延迟的管道流。
- typed-stack.js: 实现类型化的栈数据结构。
- under-dash.js: 提供类似 lodash 的实用函数。
- utils.js: 包含通用的工具函数。
- xml-stream.js: 处理 XML 流的生成和解析。
- zip-stream.js: 实现 ZIP 文件的流式处理。

这些模块共同支持 ExcelJS 库的核心功能，特别是在处理大型 Excel 文件时提供了高效的数据流操作。
