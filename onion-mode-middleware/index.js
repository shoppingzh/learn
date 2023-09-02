function createApp(options = {}) {
  const middlewares = options.middlewares || []

  return {
    async run() {
      const ctx = {}
      ctx.request = {
        query: {
          a: 1,
        }
      }

      async function send() {
        console.log('正在发送请求..');
        await new Promise(resolve => setTimeout(resolve, 1500))
        ctx.response = {}
      }

      const response = send()

      middlewares.forEach(m => {
        const p = new Promise(async(resolve, reject) => {
          await response
          resolve()
        })
        m(ctx, async() => {
          await p
        })
      })

    }
  }
}

const app = createApp({
  middlewares: [
    async function(ctx, next) {
      console.log('+1');
      ctx.request.query.a++
      await next()
      ctx.response.body = `结果：${ctx.request.query.a}`
      console.log(ctx);
    },

    async function(ctx, next) {
      console.log('反转');
      ctx.request.query.a = ctx.request.query.a * -1
      await next()
      ctx.response.body = JSON.stringify({
        code: 0,
        data: `结果：${ctx.request.query.a}`
      })
      console.log(ctx);
    }
  ]
})

app.run()
