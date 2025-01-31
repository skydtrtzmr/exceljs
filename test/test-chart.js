// 引入 ExcelJS 库，用于处理 Excel 文件
const Excel = require('../lib/exceljs.nodejs');

// 引入高精度计时器，用于测量执行时间
const HrStopwatch = require('./utils/hr-stopwatch');

// 从命令行参数中获取文件名
const [, , filename] = process.argv;

// 创建一个新的工作簿
const wb = new Excel.Workbook();

// 添加一个新的工作表，命名为 'Foo'
const ws = wb.addWorksheet('Foo');

// 获取当前时间戳
const now = Date.now();

// 获取今天的日期（以毫秒为单位）
const today = now - (now % 86400000);

// 生成测试数据行的函数
const getRows = () => {
  const rows = [];
  
  // 生成 20 行数据，每行包含一个日期和一个随机数
  for (let i = 0; i < 20; i++) {
    rows.push([new Date(today + (86400000 * i)), Math.random() * 10]);
  }
  
  return rows;
};

// 设置工作表的列定义：日期列和数值列
ws.columns = [{key: 'date', width: 16}, {key: 'number'}];

// 在工作表中添加数据表格
ws.addTable({
  // 表格基本属性
  name: 'TestTable',
  ref: 'A1',
  headerRow: true,
  totalsRow: true,
  
  // 表格样式设置
  style: {
    theme: 'TableStyleDark3',
    showRowStripes: true,
  },
  
  // 定义表格列
  columns: [
    // 日期列配置
    {
      name: 'Date',
      totalsRowLabel: 'Max:',
      filterButton: true,
    },
    
    // 数值列配置
    {
      name: 'Value',
      totalsRowFunction: 'max',
      filterButton: true,
      totalsRowResult: 8,
    },
  ],
  
  // 添加数据行
  rows: getRows(),
});

// 创建并启动计时器
const stopwatch = new HrStopwatch();
stopwatch.start();

// 将工作簿写入文件并处理结果
wb.xlsx
  .writeFile(filename)
  .then(() => {
    // 获取执行时间
    const micros = stopwatch.microseconds;
    
    // 输出执行结果
    console.log('Done.');
    console.log('Time taken:', micros);
  })
  .catch(error => {
    // 输出错误信息
    console.log(error.message);
  });
