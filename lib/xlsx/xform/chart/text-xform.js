/* eslint-disable no-console */
const BaseXform = require('../base-xform');

// 【注释】
// 图表的title是富文本，有时候会包含多个文本片段，所以需要将每个文本片段拼接成完整的文本

// 文本内容转换器
class TextXform extends BaseXform {
  constructor() {
    super();
    console.log('新建TextXform');
  }

  get tag() {
    return 'c:tx';
  }

  parseOpen(node) {
    console.log('进入Text解析器');
    
    switch (node.name) {
      case this.tag:
        // 初始化文本数组，用于存储多个文本片段
        this.textParts = [];
        return true;
      case 'a:t':
        this.inText = true;
        return true;
      default:
        return true;
    }
  }

  parseText(text) {
    if (this.inText) {
      // 将每个文本片段添加到数组中
      this.textParts.push(text);
    }
  }

  parseClose(name) {
    switch (name) {
      case 'a:t':
        this.inText = false;
        return true;
      case this.tag:
        // 将所有文本片段拼接成完整的文本
        this.model = this.textParts.join('');
        return false;
      default:
        return true;
    }
  }
}

module.exports = TextXform;