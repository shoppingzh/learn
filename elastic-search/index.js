import { Client } from '@elastic/elasticsearch'
import { parse } from './parser.js';

const client = new Client({
  node: 'http://127.0.0.1:9200'
})

const index = 'knowledge'

;(async() => {
  await client.ping()

  if (!await client.indices.exists({
    index,
  })) {
    await client.indices.create({
      index,
    })
  }

  const content = await parse('./1.pdf')

  if (await client.exists({ index, id: 1})) {
    await client.delete({
      index,
      id: 1
    })
  }
  await client.index({
    index,
    id: 1,
    document: {
      content,
    }
  })

  const result = await client.search({
    index,
    query: {
      bool: {
        must: {
          match: {
            content: '政务大数据在不同政务部门间通过数据共享域实现跨组织交换'
          }
        }
      }
    }
  })
  console.log(result.hits.total)

  // result.hits.hits.forEach(o => {
  //   console.log(o);
  // })

})()