const file = require('./file')
const control = require('./control')
const template = require('./template')

/**
 * 解析命令
 * @param name {string}
 * @param options {object}
 */
function creator (name, options) {
  // 获取配置文件
  let config = file.readConfigFile('works.config.js')

  // 控制台交互
  control.parseRule(config.rules).then(({fileUrl, options}) => {
    // 读取文件
    let fileText = file.readFile(fileUrl)

    template.render(fileText, {name, ...options}, config.output)
  })
  // 获取模版信息

}

module.exports = creator
