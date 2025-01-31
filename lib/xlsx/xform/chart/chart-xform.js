const BaseXform = require('../base-xform');

class ChartXform extends BaseXform {
  get tag() {
    return 'c:chartSpace';  // Excel 图表的根元素标签
  }

  parseOpen(node) {
    switch (node.name) {
      case 'c:chartSpace':
        // 初始化图表模型
        this.model = {
          type: null,      // 图表类型
          title: null,     // 图表标题
          series: [],      // 数据系列
        };
        return true;
      
      case 'c:chart':
        // 图表主体开始
        return true;

      case 'c:title':
        // 图表标题
        this.inTitle = true;
        return true;

      default:
        return true;
    }
  }

  parseText(text) {
    if (this.inTitle) {
      this.model.title = text;
    }
  }

  parseClose(name) {
    switch (name) {
      case 'c:title':
        this.inTitle = false;
        break;
      
      case 'c:chartSpace':
        return false;
    }
    return true;
  }

  render(xmlStream, model) {
    // 生成 XML 的逻辑
  }
}

module.exports = ChartXform;