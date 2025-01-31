/* eslint-disable no-console */
const BaseXform = require('../base-xform');
const SeriesXform = require('./series-xform');

// 柱状图转换器
class BarChartXform extends BaseXform {
  constructor() {
    super();
    console.log('新建BarChartXform');
    
    this.map = {
      'c:ser': new SeriesXform(),
    };
  }

  get tag() {
    return 'c:barChart';
  }

  parseOpen(node) {
    console.log('进入BarChart解析器');
    
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.model = {
          type: 'bar',
          series: [],
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
        if (name === 'c:ser') {
          this.model.series.push(this.parser.model);
        }
        this.parser = undefined;
      }
      return true;
    }
    return name !== this.tag;
  }
}

module.exports = BarChartXform;