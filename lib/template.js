const mustache = require('mustache')
const file = require('./file')

/**
 * 生成模版
 * @param template {String}
 * @param data  {Object}
 * @param output  {String}
 */
function render (template, data, output) {
  let newStr = mustache.render(template, data)

  file.writeFile(data.name, newStr, output)
}

module.exports = {render}
