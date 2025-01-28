const BaseXform = require('../base-xform');

class ChartXform extends BaseXform {
  get tag() {
    return 'c:chart';
  }

  parseOpen(node) {
    switch (node.name) {
      case 'c:chart':
        this.model = {}; // 初始化图表模型
        break;
      case 'c:title':
        this.model.title = node.attributes['c:title'];
        break;
      case 'c:plotArea':
        this.model.plotArea = {};
        break;
      // 更多标签处理...
    }
    return true;
  }

  parseText(text) {
    // 处理文本内容
  }

  parseClose(name) {
    if (name === 'c:chart') {
      return false; // 结束解析
    }
    return true;
  }

  render(xmlStream, model) {
    // 生成 XML 的逻辑
  }
}

module.exports = ChartXform;