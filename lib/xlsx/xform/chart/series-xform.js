/* eslint-disable no-console */
const BaseXform = require('../base-xform');

// 数据系列转换器
class SeriesXform extends BaseXform {
  constructor() {
    super();
    console.log('新建SeriesXform');
  }

  get tag() {
    return 'c:ser';
  }

  parseOpen(node) {
    console.log('进入Series解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          index: undefined,
          order: undefined,
          values: [],
        };
        return true;
      case 'c:idx':
        this.model.index = parseInt(node.attributes.val, 10);
        return true;
      case 'c:order':
        this.model.order = parseInt(node.attributes.val, 10);
        return true;
      default:
        return true;
    }
  }

  parseText(text) {
    // 系列数据的文本处理
  }

  parseClose(name) {
    return name !== this.tag;
  }
}

module.exports = SeriesXform;