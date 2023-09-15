docker run --name es `
  -d `
  -p 9200:9200 `
  -e "discovery.type=single-node" `
  elasticsearch:8.9.2
