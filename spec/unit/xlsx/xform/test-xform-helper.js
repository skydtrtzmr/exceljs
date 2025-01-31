const {PassThrough} = require('readable-stream');
const {cloneDeep, each} = require('../../../utils/under-dash');
const CompyXform = require('./compy-xform');

const parseSax = verquire('utils/parse-sax');
const XmlStream = verquire('utils/xml-stream');
const BooleanXform = verquire('xlsx/xform/simple/boolean-xform');

// 获取期望值中的特定字段
function getExpectation(expectation, name) {
  // 检查期望值中是否存在指定字段
  if (!expectation.hasOwnProperty(name)) {
    throw new Error(`Expectation missing required field: ${name}`);
  }
  // 返回指定字段的深拷贝
  return cloneDeep(expectation[name]);
}

// ===============================================================================================================
// 提供四个转换步骤的样板示例：prepare、render、parse 和 reconcile
// provides boilerplate examples for the four transform steps: prepare, render, parse and reconcile
//  prepare: model => preparedModel
//  render:  preparedModel => xml
//  parse:  xml => parsedModel
//  reconcile: parsedModel => reconciledModel

const its = {
  // 准备模型的测试
  prepare(expectation) {
    it('Prepare Model', () =>
      new Promise(resolve => {
        // 获取初始模型和预期的准备模型
        const model = getExpectation(expectation, 'initialModel');
        const result = getExpectation(expectation, 'preparedModel');

        // 创建转换器实例
        const xform = expectation.create();
        // 准备模型
        xform.prepare(model, expectation.options);
        // 验证准备后的模型与预期结果相等
        expect(cloneDeep(model, false)).to.deep.equal(result);
        resolve();
      }));
  },

  // 渲染模型为 XML 的测试
  render(expectation) {
    it('Render to XML', () =>
      new Promise(resolve => {
        // 获取准备后的模型和预期的 XML 结果
        const model = getExpectation(expectation, 'preparedModel');
        const result = getExpectation(expectation, 'xml');

        // 创建转换器实例和 XML 流
        const xform = expectation.create();
        const xmlStream = new XmlStream();
        // 渲染模型为 XML
        xform.render(xmlStream, model, 0);
        // console.log(xmlStream.xml);
        // console.log(result);

        // 验证生成的 XML 与预期结果相等
        expect(xmlStream.xml).xml.to.equal(result);
        resolve();
      }));
  },

  // 准备和渲染模型的测试
  'prepare-render': function(expectation) {
    // 当实现细节妨碍准备结果的测试时
    // when implementation details get in the way of testing the prepared result
    it('Prepare and Render to XML', () =>
      new Promise(resolve => {
        // 获取初始模型和预期的 XML 结果
        const model = getExpectation(expectation, 'initialModel');
        const result = getExpectation(expectation, 'xml');

        // 创建转换器实例和 XML 流
        const xform = expectation.create();
        const xmlStream = new XmlStream();

        // 准备模型
        xform.prepare(model, expectation.options);
        // 渲染模型为 XML
        xform.render(xmlStream, model);

        // 验证生成的 XML 与预期结果相等
        expect(xmlStream.xml).xml.to.equal(result);
        resolve();
      }));
  },

  // 在复合结构中渲染的测试
  renderIn(expectation) {
    it('Render in Composite to XML ', () =>
      new Promise(resolve => {
        // 创建复合模型
        const model = {
          pre: true,
          // 获取准备后的模型
          child: getExpectation(expectation, 'preparedModel'),
          post: true,
        };
        // 预期的复合 XML 结果
        const result = `<compy><pre/>${getExpectation(
          expectation,
          'xml'
        )}<post/></compy>`;

        // 创建复合转换器实例
        const xform = new CompyXform({
          tag: 'compy',
          children: [
            {
              name: 'pre',
              xform: new BooleanXform({tag: 'pre', attr: 'val'}),
            },
            // 使用期望的转换器
            {name: 'child', xform: expectation.create()},
            {
              name: 'post',
              xform: new BooleanXform({tag: 'post', attr: 'val'}),
            },
          ],
        });

        const xmlStream = new XmlStream();
        // 渲染复合模型为 XML
        xform.render(xmlStream, model);
        // console.log(xmlStream.xml);

        // 验证生成的 XML 与预期结果相等
        expect(xmlStream.xml).xml.to.equal(result);
        resolve();
      }));
  },

  // 在复合结构中解析的测试
  parseIn(expectation) {
    it('Parse within composite', () =>
      new Promise((resolve, reject) => {
        // 复合 XML 输入
        const xml = `<compy><pre/>${getExpectation(
          expectation,
          'xml'
        )}<post/></compy>`;

        // 创建子转换器实例
        const childXform = expectation.create();

        // 预期的解析结果
        const result = {pre: true};

        // 添加子模型
        result[childXform.tag] = getExpectation(expectation, 'parsedModel');

        // 添加后缀
        result.post = true;

        const xform = new CompyXform({
          tag: 'compy',
          children: [
            {
              name: 'pre',
              xform: new BooleanXform({tag: 'pre', attr: 'val'}),
            },
            // 使用子转换器
            {name: childXform.tag, xform: childXform},
            {
              name: 'post',
              xform: new BooleanXform({tag: 'post', attr: 'val'}),
            },
          ],
        });
        const stream = new PassThrough();

        // 写入 XML 流
        stream.write(xml);
        stream.end();
        xform
          // 解析 XML 流
          .parse(parseSax(stream))
          .then(model => {
            // console.log('parsed Model', JSON.stringify(model));
            // console.log('expected Model', JSON.stringify(result));

            // eliminate the undefined
            // 深拷贝解析结果
            const clone = cloneDeep(model, false);

            // console.log('result', JSON.stringify(clone));
            // console.log('expect', JSON.stringify(result));
            // 验证解析结果与预期相等
            expect(clone).to.deep.equal(result);
            
            resolve();
          })
          .catch(reject);
      }));
  },

  // 解析模型的测试
  parse(expectation) {
    it('Parse to Model', () =>
      new Promise((resolve, reject) => {
        // 获取 XML 输入
        const xml = getExpectation(expectation, 'xml');

        // 获取预期的解析结果
        const result = getExpectation(expectation, 'parsedModel');

        // 创建转换器实例
        const xform = expectation.create();

        const stream = new PassThrough();

        // 写入 XML 流
        stream.write(xml);
        stream.end();
        xform
          // 解析 XML 流
          .parse(parseSax(stream))
          .then(model => {
            // eliminate the undefined
            // 深拷贝解析结果
            const clone = cloneDeep(model, false);

            // console.log('result', JSON.stringify(clone));
            // console.log('expect', JSON.stringify(result));
            expect(clone).to.deep.equal(result);
            // 验证解析结果与预期相等
            resolve();
          })
          .catch(reject);
      }));
  },

  // 协调模型的测试
  reconcile(expectation) {
    it('Reconcile Model', () =>
      new Promise(resolve => {
        // 获取解析后的模型
        const model = getExpectation(expectation, 'parsedModel');

        // 获取预期的协调结果
        const result = getExpectation(expectation, 'reconciledModel');

        // 创建转换器实例
        const xform = expectation.create();

        // 协调模型
        xform.reconcile(model, expectation.options);

        // eliminate the undefined
        // 深拷贝协调后的模型
        const clone = cloneDeep(model, false);

        expect(clone).to.deep.equal(result);
        resolve();
      }));
  },
};

// 测试转换器的函数
function testXform(expectations) {
  each(expectations, expectation => {
    // 获取要执行的测试
    const tests = getExpectation(expectation, 'tests');
    describe(expectation.title, () => {
      each(tests, test => {
        // 执行每个测试
        its[test](expectation);
      });
    });
  });
}

module.exports = testXform;
