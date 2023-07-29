from util import get_page_content, get_page_urls, BASE_URL

urls = get_page_urls('4218')
if not len(urls):
    pass

with open('./上古.txt', 'w', encoding='utf-8') as f:
    for index, url in enumerate(urls):
        content = get_page_content('%s%s' % (BASE_URL, url))
        f.write(content)
        print('第%d页已爬取' % (index + 1))
