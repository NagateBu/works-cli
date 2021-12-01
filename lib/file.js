const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const chalk = require('chalk')

/**
 *  读取模版文件
 * @param url
 * @return {String}
 */
function readFile (url) {
  let fileUrl = path.join(process.cwd(), url)

  try {
    // 判断配置文件是否存在
    fs.accessSync(fileUrl)

    // 读取文件
    let file = fs.readFileSync(fileUrl, {encoding: 'utf8'})

    // 抛出
    return file
  } catch (e) {
    console.log(chalk.red(`Error：在当前路径找不到文件,路径为：${fileUrl}`))
  }
}

/**
 * 读取配置文件
 * @param url
 * @return {Object}
 */
function readConfigFile (url) {
  let fileUrl = path.join(process.cwd(), url)

  try {
    // 判断配置文件是否存在
    fs.accessSync(fileUrl)

    // 获取配置文件
    let fileObject = require(fileUrl)

    // 抛出
    return fileObject
  } catch (e) {
    console.log(chalk.red(`Error：在当前路径找不到配置文件,路径为：${fileUrl}`))
  }
}

/**
 * 生成模版至目标区域
 * @param name {String}
 * @param file {String}
 * @param output {String}
 */
function writeFile (name, file, output = 'template_package') {
  // 获取配置文件
  let mdirUrl = path.join(process.cwd(), output)

  fse.emptydirSync(mdirUrl)

  let fileUrl = path.join(process.cwd(), `${output}/${name}.vue`)

  fse.outputFile(fileUrl, file, err => {
    if (typeof err !== 'null') {
      console.log(chalk.green(`Success! 生成模版成功！`))
      console.log(chalk.green(`文件路径：${fileUrl}`))
    } else {
      console.log(chalk.red(err))
      console.log(chalk.red(`Error：生成模版失败！`))
    }
  })
}


module.exports = {readConfigFile, readFile, writeFile}
