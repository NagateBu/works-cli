/**
 * 判断当前列表是否存在相同的key
 * @param list {Array}
 * @param key {String}
 * @return {Boolean}
 */
function isRepeat (list, key) {
  let state = false

  let keyList = list.map(item => {
    return item[key]
  })

  if (keyList.length !== [...new Set(keyList)].length) {
    state = true
  }

  return state
}

module.exports = {isRepeat}
