// 导入 fs
const fs = require('fs')

// 导入 path
const path = require('path')

// 提取 拼接绝对路径的方法
function makeFullPath (fileName) {
  const fullPath = path.join(__dirname, `./data/${fileName}`)
  return fullPath
}

// 新闻方法
function news () {
  // 1.绝对路径
  const fullPath = makeFullPath('news.json')
  // 2. 读取
  const res = fs.readFileSync(fullPath, 'utf-8')
  // 3. 转换
  const news = JSON.parse(res)
  // 4. 返回
  return news
}

// 获取学员数据
function students () {
  // 1.绝对路径
  const fullPath = makeFullPath('info.json')
  // 2. 读取
  const res = fs.readFileSync(fullPath, 'utf-8')
  // 3. 转换
  const students = JSON.parse(res)
  // 4. 返回
  return students
}
// 抽取随机的同学
function lucystar () {
  // 绝对路径
  const fullPath = makeFullPath('info.json')
  // 调用已经抽取好的方法 获取学员数据
  const studentArr = students()
  // console.log('studentArr:', studentArr)
  // 抽取随机
  const index = parseInt(Math.random() * studentArr.length)
  // count++
  const lucystar = studentArr[index]
  lucystar.count++
  // 保存
  fs.writeFileSync(fullPath, JSON.stringify(studentArr))
  // 返回
  return lucystar
}

// 暴露(导出)
module.exports = {
  news,
  students,
  lucystar
}
