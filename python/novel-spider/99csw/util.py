import urllib.request
from bs4 import BeautifulSoup

BASE_URL = 'https://www.99csw.com'
BASE_BOOK_URL = '%s/book' % BASE_URL


def get_page_urls(book_id):
    pages = []
    with urllib.request.urlopen('%s/%s/index.htm' % (BASE_BOOK_URL, book_id)) as res:
        soup = BeautifulSoup(res.read(), 'html.parser')
        dir_dl = soup.find('dl', attrs={'id': 'dir'})
        for dd in dir_dl.children:
            a = dd.find('a')
            pages.append(a['href'])
    return pages


def get_page_content(url):
    with urllib.request.urlopen(url) as res:
        soup = BeautifulSoup(res.read(), 'html.parser')
        content_div = soup.find('div', attrs={'id': 'content'})
        if content_div:
            return content_div.get_text(separator='\n')
    return ''
