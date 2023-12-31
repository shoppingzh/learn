import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import cookie from 'koa-cookie'

const port = Number(process.env.PORT) || 3000

const app = new Koa()
const router = new Router()

router.get('/hello', (ctx, next) => {
  ctx.body = 'hello'
})

router.get('/count', (ctx, next) => {
  const count = Number(ctx.cookies.get('count')) || 0
  const nextCount = count + 1
  ctx.cookies.set('count', `${nextCount}`, {
    // sameSite: 'none',
    // secure: true,
  })

  ctx.body = `count: ${nextCount}`
})

app
  .use(cors({
    origin: request => request.headers.origin,
    credentials: true,
  }))
  .use(cookie())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)

