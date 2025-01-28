const BaseXform = require("../base-xform");

class ChartSpaceXform extends BaseXform {
    get tag() {
        return "c:chartSpace";
    }

    parseOpen(node) {
        if (this.parser) {
            this.parser.parseOpen(node);
            return true;
        }
        switch (node.name) {
            case this.tag:
                this.reset();
                return true;
            default:
                this.parser = this.map[node.name];
                if (this.parser) {
                    this.parser.parseOpen(node);
                }
                return true;
        }
    }
}

module.exports = ChartSpaceXform;
