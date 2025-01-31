/* eslint-disable no-console */
const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');
const StringXform = require('../simple/string-xform');
const ChartXform = require('./chart-xform');

// 图表转换器类，用于处理Excel中的图表数据
class ChartSpaceXform extends BaseXform {
  constructor() {
    super();

    // 定义图表相关属性的转换器映射
    // 也就是说，这里写该节点的子节点
    this.map = {
      'c:lang': new StringXform({tag: 'c:lang'}),
      'c:chart': new ChartXform({tag: 'c:chart'}),
    };
  }

  get tag() {
    return 'c:chartSpace';
  }

  // 渲染图表XML
  render(xmlStream, model) {
    console.log('执行了render');
    
    xmlStream.openXml(XmlStream.StdDocAttributes);

    // 打开图表空间节点
    xmlStream.openNode('c:chartSpace', ChartSpaceXform.CHART_ATTRIBUTES);
    
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
    // 【NOTE】
    // 如果return true，则表示继续解析下一个节点；
    // 如果return false，则表示还需要解析当前节点。
    console.log('node:', node);
    
    if (this.parser) {
      console.log('this.parser:', this.parser);
      
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case 'c:chartSpace':
        console.log('parseOpen c:chartSpace');
        
        break;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          console.log('执行嵌套');
          
          return true;
        }
        return false;
    }
    return true;
  }

  // 解析文本内容
  parseText(text) {
    if (this.parser) {
      console.log('解析文本');
      
      this.parser.parseText(text);
    }
  }

  // 解析结束标签
  parseClose(name) {
    console.log('parseClose:', name);
    
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }

    switch (name) {
      case 'c:chartSpace':
        // 将解析的图表数据添加到模型中
        console.log('this.model chartSpace:', this.model);
        this.model = {
          title: this.map['c:title'].model,
          chartType: this.map['c:chartType'].model,
        };
        return false;
        
      case 'c:chart':
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

module.exports = ChartSpaceXform;