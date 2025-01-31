/* eslint-disable no-console */
const BaseXform = require('../base-xform');

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
        this.text = '';
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
      this.text = text;
    }
  }

  parseClose(name) {
    switch (name) {
      case 'a:t':
        this.inText = false;
        return true;
      case this.tag:
        this.model = this.text;
        return false;
      default:
        return true;
    }
  }
}

module.exports = TextXform;