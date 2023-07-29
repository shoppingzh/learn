import urllib.request
from bs4 import BeautifulSoup
import threading
import os
import shutil

BASE_URL = 'http://www.kongbugushi.com'


def find_pages(book):
    pages = []
    with urllib.request.urlopen('%s/%s' % (BASE_URL, book)) as res:
        html = res.read()
        soup = BeautifulSoup(html, 'html.parser')
        wrap = soup.find('div', attrs={'class': 'row m-top'}).find_all('div')[0]
        uls = wrap.find_all('ul', attrs={'class': 'list-group'})
        for index, ul in enumerate(uls):
            lis = ul.find_all('li', attrs={'class': 'vv-book'})
            for index2, li in enumerate(lis):
                a = li.find('a')
                if a:
                    pages.append('%s%s' % (BASE_URL, a['href']))
    return pages


def get_page_content(url):
    with urllib.request.urlopen(url) as res:
        html = res.read()
        soup = BeautifulSoup(html, 'html.parser')
        content = soup.find('div', attrs={'id': 'content'})
        return content.get_text(separator='\n')
    return ''


def get_book(id, name):
    tmp_path = '../output/tmp'

    def do_get(page, index):
        with open('%s/%d.txt' % (tmp_path, index + 1), mode='w') as f:
            content = get_page_content(page)
            f.write(content)
            f.write('\n\n')
            f.write('======================================================================================')
            f.write('\n\n')
            print('已爬取第%d页' % (index + 1))

    pages = find_pages(id)
    if os.path.exists(tmp_path):
        shutil.rmtree(tmp_path)
    os.mkdir(tmp_path)
    for index, page in enumerate(pages):
        t = threading.Thread(target=do_get, name='Spider-%d' % index, args=(page, index))
        t.start()
