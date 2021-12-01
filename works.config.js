module.exports = {
  // output: 'dist', // 生成模版路径
  // 模版配置列表
  rules: [
    {
      name: '页面',
      url: 'template/page',
      step: [
        // 表格
        {
          type: 'confirm',
          message: '是否展示表格提示：',
          name: 'message',
          default: false
        },
        {
          type: 'confirm',
          message: '是否需要导出：',
          name: 'export',
          default: false
        },
        {
          type: 'confirm',
          message: '是否为分页：',
          name: 'page',
          default: true
        },
        {
          type: 'confirm',
          message: '是否需要序号：',
          name: 'serial',
          default: true
        },
        // 弹窗
        {
          type: 'confirm',
          message: '是否需要弹窗：',
          name: 'dialog',
          default: true
        },
        {
          type: 'confirm',
          message: '弹窗确认后是否需要刷新，当前页面',
          name: 'dialogUpdate',
          default: true,
          when: function (answers) {
            // 当需要弹窗时再提示用户是否需要刷新页面
            return answers.dialog
          }
        }
      ]
    },
    {
      name: '抽屉',
      url: 'template/drawer',
      // 需要包含其他模版
      page: [{
        name: '页面', // 模版名称
        when: function (answers) {
          return answers.table
        }
      }],
      step: [
        {
          type: 'input',
          message: '抽屉标题：',
          name: 'title',
          default: 'Title'
        },
        {
          type: 'confirm',
          message: '抽屉是否内嵌表格：',
          name: 'table',
          default: true
        }
      ]
    }
  ]
}
