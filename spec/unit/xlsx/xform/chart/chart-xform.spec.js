const ChartXform = require('../../../../../lib/xlsx/xform/chart/chart-xform');
const testXformHelper = require('../test-xform-helper');

const expectations = [
  {
    title: 'Basic Chart',
    create: () => new ChartXform(),
    preparedModel: {
      type: 'column',
      title: 'Test Chart',
      series: [],
    },
    xml: `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart">
        <c:chart>
          <c:title>
            <c:tx>
              <c:rich>
                <a:bodyPr/>
                <a:lstStyle/>
                <a:p>
                  <a:r>
                    <a:t>Test Chart</a:t>
                  </a:r>
                </a:p>
              </c:rich>
            </c:tx>
          </c:title>
        </c:chart>
      </c:chartSpace>
    `,
    tests: ['render', 'parse'],
  },
  {
    title: 'Chart with Series',
    create: () => new ChartXform(),
    preparedModel: {
      type: 'line',
      title: 'Sales Data',
      series: [
        {name: 'Q1', values: [10, 20, 30]},
        {name: 'Q2', values: [15, 25, 35]},
      ],
    },
    xml: `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart">
        <c:chart>
          <c:title>
            <c:tx>
              <c:rich>
                <a:bodyPr/>
                <a:lstStyle/>
                <a:p>
                  <a:r>
                    <a:t>Sales Data</a:t>
                  </a:r>
                </a:p>
              </c:rich>
            </c:tx>
          </c:title>
          <c:plotArea>
            <c:lineChart>
              <c:ser>
                <c:idx val="0"/>
                <c:order val="0"/>
                <c:tx>
                  <c:strRef>
                    <c:f>Series1</c:f>
                  </c:strRef>
                </c:tx>
                <c:val>
                  <c:numRef>
                    <c:f>Series1Values</c:f>
                  </c:numRef>
                </c:val>
              </c:ser>
              <c:ser>
                <c:idx val="1"/>
                <c:order val="1"/>
                <c:tx>
                  <c:strRef>
                    <c:f>Series2</c:f>
                  </c:strRef>
                </c:tx>
                <c:val>
                  <c:numRef>
                    <c:f>Series2Values</c:f>
                  </c:numRef>
                </c:val>
              </c:ser>
            </c:lineChart>
          </c:plotArea>
        </c:chart>
      </c:chartSpace>
    `,
    tests: ['render', 'parse'],
  },
];

describe('ChartXform', () => {
  testXformHelper(expectations);
});