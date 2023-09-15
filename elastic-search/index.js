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

  await client.delete({
    index,
    id: 'nodejs'
  })
  await client.index({
    index,
    id: 'nodejs',
    document: {
      content,
    }
  })

  const result = await client.search({
    index: 'knowledge',
    query: {
      bool: {
        should: {
          match: {
            content: '重大危险'
          }
        }
      }
    }
  })
  console.log(result.hits.total)

  result.hits.hits.forEach(o => {
    console.log(o);
  })

})()