/* eslint-disable no-console */
const BaseXform = require('../base-xform');
const BarChartXform = require('./bar-chart-xform');
// const LineChartXform = require('./line-chart-xform');

// 图表区域转换器
class PlotAreaXform extends BaseXform {
  constructor() {
    super();
    console.log('新建PlotAreaXform');
    
    this.map = {
      'c:barChart': new BarChartXform(),
      // 'c:lineChart': new LineChartXform(),
    };
  }

  get tag() {
    return 'c:plotArea';
  }

  parseOpen(node) {
    console.log('进入PlotArea解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          charts: [],
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
        this.model.charts.push(this.parser.model);
        this.parser = undefined;
      }
      return true;
    }
    return name !== this.tag;
  }
}

module.exports = PlotAreaXform;