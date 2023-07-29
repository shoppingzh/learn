import urllib.request
from bs4 import BeautifulSoup


def get_page_urls(url):
    urls = []
    with urllib.request.urlopen(url) as res:
        soup = BeautifulSoup(res.read(), 'html.parser')
        list_div = soup.find('div', attrs={'class': 'booklist'})
        spans = list_div.find_all('span')
        for span in spans:
            a = span.find('a')
            if a:
                urls.append(a['href'])

    return urls


def get_page_content(url):
    with urllib.request.urlopen(url) as res:
        soup = BeautifulSoup(res.read(), 'html.parser')
        content_div = soup.find('div', attrs={'id': 'BookText'})
        content = content_div.get_text(separator='\n')
        return content
    return ''


urls = get_page_urls('http://zhuoguji.513gp.org/')
for index, url in enumerate(urls):
    with open('./dist/%d.txt' % (index + 1), 'w', encoding='utf-8') as f:
        content = get_page_content(url)
        f.write(content)
        f.write('\n\n\n============================================================================================\n\n\n')
        print('第%d页已爬取' % (index + 1))




