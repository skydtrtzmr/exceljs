/* eslint-disable no-console */
// const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');
const ChartXform = require('./chart-xform');

// 图表空间转换器类，处理chartSpace节点（根节点）
class ChartSpaceXform extends BaseXform {
  constructor() {
    super();
    console.log('新建ChartSpaceXform');
    
    // 定义子节点的转换器
    this.map = {
      'c:chart': new ChartXform(),
    };
  }

  get tag() {
    return 'c:chartSpace';
  }

  render(xmlStream, model) {
    console.log('执行ChartSpace render');
    
    // 添加命名空间
    const attributes = {
      'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
      'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    };

    xmlStream.openNode(this.tag, attributes);

    // 渲染图表内容
    this.map['c:chart'].render(xmlStream, model);

    xmlStream.closeNode();
  }

  parseOpen(node) {
    console.log('进入ChartSpace解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          chart: undefined,
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
        if (name === 'c:chart') {
          this.model.chart = this.parser.model;
        }
        this.parser = undefined;
      }
      return true;
    }
    return name !== this.tag;
  }
}

module.exports = ChartSpaceXform;