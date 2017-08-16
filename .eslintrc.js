// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "indent": ["error", 4, { "SwitchCase": 1 }],     // 缩进风格
    'arrow-parens': 0,    // 箭头函数用小括号括起来
    'generator-star-spacing': 0,	// 生成器函数*的前后空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, 	// 禁止使用debugger
    // 函数符号前不要空格
    "space-before-function-paren": [0, "always"],
    // 语句强制分号结尾
    "semi": [2, "always"],
    // 必须使用全等
    "eqeqeq": "off"
  }
}
