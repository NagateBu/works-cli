const inquirer = require('inquirer')
const {isRepeat} = require('./list')
const chalk = require('chalk')

/**
 * 解析配置文件的规则
 * @param rule {Array}
 */
function parseRule (rule) {
  return new Promise(async (resolve, reject) => {
    // 选择模版
    templateList(rule).then(({fileUrl, templateName}) => {

      // 当获取的名称为
      if (typeof templateName !== 'undefined') {
        parseStep(rule, templateName).then(options => {
          resolve({fileUrl, options})
        })
      } else {
        console.log(chalk.red('Error：选择模版为空！'))
        process.exit(1)
      }
    })
  })
}

/**
 *  * 让用户选择模版
 * @param rule {Array}
 * @param rule
 * @return {Promise}
 */
function templateList (rule) {
  return new Promise((resolve, reject) => {
    // 判断模版的名称是否重复
    if (!isRepeat(rule, 'name')) {
      let prompt = {
        type: 'list',
        message: '请选择模版：',
        name: 'templateName',
      }

      prompt.choices = rule.map(item => {
        return item.name
      })

      gain(prompt).then(({templateName}) => {
        // 寻找出当前模版配置文件
        let currentRule = rule.filter(item => {
          return item.name == templateName
        })[0]

        resolve({fileUrl: currentRule.url, templateName})
      })
    } else {
      console.log(chalk.red('Error：模版的名称不能重复！'))
      process.exit(1)
    }
  })
}

/**
 * 解析模版配置可选项
 * @param rule {Array}
 * @param templateName {String}
 * @return {Promise<Object>}
 */
function parseStep (rule, templateName) {
  return new Promise((resolve, reject) => {
    // 筛选出模版数据
    let currentStep = rule.filter(item => {
      console.log(item.name === templateName)
      return item.name === templateName
    })[0]

    gain(currentStep.step).then(answers => {
      if (typeof currentStep.page != 'undefined' && currentStep.page.length > 0) {
        let step = []

        // 筛选出 page 名称一致的模版
        rule.forEach(item => {
          let newArray = currentStep.page.filter(pageItem => {
            return pageItem.name === item.name
          })

          if (newArray.length > 0) {
            if (typeof newArray[0].when === 'undefined' || newArray[0].when({...answers})) {
              step = step.concat(item.step)
            }
          }
        })

        if (step.length > 0) {
          gain(step).then(pageAnswers => {
            resolve({...answers, ...pageAnswers})
          })
        } else {
          resolve({...answers})
        }
      } else {
        resolve({...answers})
      }
    })
  })
}

/**
 * 用户交互
 * @param data {Array || Object}
 * @return {Promise<Object>}
 */
function gain (data) {
  return new Promise((resolve, reject) => {
    inquirer.prompt(data).then(answers => {
      resolve(answers)
    }).catch(error => {
      reject(error)
    })
  })
}


module.exports = {parseRule}
