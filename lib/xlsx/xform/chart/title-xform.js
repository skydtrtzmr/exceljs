/* eslint-disable no-console */
const BaseXform = require('../base-xform');
const TextXform = require('./text-xform');

// 图表标题转换器
class TitleXform extends BaseXform {
  constructor() {
    super();
    console.log('新建TitleXform');
    
    this.map = {
      'c:tx': new TextXform(),
    };
  }

  get tag() {
    return 'c:title';
  }

  parseOpen(node) {
    console.log('进入Title解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          text: undefined,
        };
        return true;

      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        return false;
    }
  }

  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        if (name === 'c:tx') {
          this.model.text = this.parser.model;
        }
        this.parser = undefined;
      }
      return true;
    }
    return name !== this.tag;
  }
}

module.exports = TitleXform;