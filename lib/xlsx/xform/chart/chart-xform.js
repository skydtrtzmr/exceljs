/* eslint-disable no-console */
const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');
const StringXform = require('../simple/string-xform');

// 图表转换器类，用于处理Excel中的图表数据
class ChartXform extends BaseXform {
  constructor() {
    super();
    console.log('新建chartxform');
    
    // 定义图表相关属性的转换器映射
    // 也就是说，这里写该节点的子节点
    this.map = {
      // 图表标题
      'c:title': new StringXform({tag: 'c:title'}),
      // 图表类型
      'c:barChart': new StringXform({tag: 'c:barChart'}),
    };
  }

  get tag() {
    return 'c:chart';
  }

  // 渲染图表XML
  render(xmlStream, model) {
    console.log('执行了render');
    
    xmlStream.openXml(XmlStream.StdDocAttributes);

    // 打开图表空间节点
    xmlStream.openNode('c:chartSpace', ChartXform.CHART_ATTRIBUTES);
    
    // 打开图表节点
    xmlStream.openNode('c:chart');

    // 渲染图表标题
    if (model.title) {
      this.map['c:title'].render(xmlStream, model.title);
    }

    // 渲染图表类型
    if (model.chartType) {
      this.map['c:chartType'].render(xmlStream, model.chartType);
    }

    // 关闭图表节点
    xmlStream.closeNode();
    
    // 关闭图表空间节点
    xmlStream.closeNode();
  }

  // 解析开始标签
  parseOpen(node) {
    console.log('进入chart-xform解析器');
    
    // console.log('node:', node);
    
    if (this.parser) {
      console.log('this.parser:', this.parser);
      
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case 'c:chartSpace':
      case 'chartSpace':
        return true;
      
      case 'c:chart':
      case 'chart':
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

  // 解析文本内容
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }

  // 解析结束标签
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }

    switch (name) {
      case 'c:chartSpace':
      case 'chartSpace':
        // 将解析的图表数据添加到模型中
        this.model = {
          title: this.map['c:title'].model,
          chartType: this.map['c:chartType'].model,
        };
        return false;
        
      case 'c:chart':
      case 'chart':
        return true;

      default:
        return false;
    }
  }
}

// 定义图表相关的XML命名空间
// ChartXform.CHART_ATTRIBUTES = {
//   'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
//   'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
//   'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
// };

module.exports = ChartXform;