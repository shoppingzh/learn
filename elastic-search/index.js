import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: 'http://127.0.0.1:9200'
})

;(async() => {
  await client.ping()

  if (!client.indices.exists({
    index: 'first_index'
  })) {
    await client.indices.create({
      index: 'first_index'
    })
  }


  await client.index({
    index: 'first_index',
    // id: 'zxp',
    document: {
      name: 'zxp',
      age: 20,
      gender: true,
      address: {
        province: 'Guandong',
        city: 'Shenzhen',
      }
    }
  })

  const doc = await client.get({
    index: 'first_index',
    id: 'zxp'
  })
  console.log(doc);

  const result = await client.search({
    query: {
      match: {
        name: 'zxp'
      }
    }
  })
  console.log(result)

})()