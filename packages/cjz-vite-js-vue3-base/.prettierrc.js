module.exports = {
  //指定每行代码的最佳长度， 如果超出长度则换行
  printWidth: 120,
  // tab缩进大小,默认为2
  tabWidth: 2,
  tabSize: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  tabs: false,
  // 行尾是否需要有分号
  semi: false,
  // 是否引用单引号&&双引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 末尾不需要逗号 'es5'  none
  tailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: true,
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf 结尾是 \n \r \n\r auto
  endOfLine: 'lf',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
}
