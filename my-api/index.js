// 1. 导入 http 模块
const http = require('http')
// 导入db模块
const db = require('./db/index')
// 导入 dayjs
const dayjs = require('dayjs')

// 2. 创建 web 服务器实例
const server = http.createServer()

// 3. 启动服务器
server.listen(8848, () => {
  console.log('my server start work')
})

// 4. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', (request, response) => {
  // 设置响应的内容为JSON
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  // 服务端开启CORS 允许任意的 来源访问 不做限制
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 不能直接响应 对象/数组 需要转为字符串
  // 学员接口
  if (request.method === 'GET' && request.url === '/api/students') {
    // 获取并返回学员信息
    // end方法不能传入数组 需要转为字符串
    response.end(JSON.stringify(db.students()))
  } else if (request.method === 'GET' && request.url === '/api/lucystar') {
    // 获取幸运儿,转为字符串 并返回
    response.end(JSON.stringify(db.lucystar()))
  } else if (request.method === 'GET' && request.url === '/api/news') {
    // 获取幸运儿,转为字符串 并返回
    // 1. 获取新闻数据-->arr
    const news = db.news()
    // 2. 处理时间戳 -dayjs
    news.forEach(v => {
      v.publish_time = dayjs(v.publish_time).format('YYYY-MM-DD HH:mm:ss')
    })
    // 3. 返回处理之后的结果
    response.end(JSON.stringify(news))
  } else {
    response.statusCode = 404
    response.end('404 not found')
  }
})
