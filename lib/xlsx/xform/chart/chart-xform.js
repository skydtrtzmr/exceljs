/* eslint-disable no-console */
const XmlStream = require('../../../utils/xml-stream');
const BaseXform = require('../base-xform');
const TitleXform = require('./title-xform');
const PlotAreaXform = require('./plot-area-xform');

// 图表转换器类，处理chart节点
class ChartXform extends BaseXform {
  constructor() {
    super();
    console.log('新建ChartXform');
    
    // 定义子节点的转换器
    this.map = {
      'c:title': new TitleXform(),
      'c:plotArea': new PlotAreaXform(),
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

  parseOpen(node) {
    console.log('进入Chart解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          title: undefined,
          plotArea: undefined,
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
        switch (name) {
          case 'c:title':
            this.model.title = this.parser.model;
            break;
          case 'c:plotArea':
            this.model.plotArea = this.parser.model;
            break;
        }
        this.parser = undefined;
      }
      return true;
    }
    return name !== this.tag;
  }
}

// 定义图表相关的XML命名空间
// ChartXform.CHART_ATTRIBUTES = {
//   'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
//   'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
//   'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
// };

module.exports = ChartXform;