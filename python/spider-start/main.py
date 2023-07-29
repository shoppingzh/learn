# -*- coding: utf-8 -*-

import urllib
from bs4 import BeautifulSoup

res = urllib.urlopen('http://www.okaoyan.com/zhuanye/paiming/29542.html')
soup = BeautifulSoup(res.read(), 'html.parser')

f = open('./result.md', 'w')

table = soup.find('table', attrs={'id': 'firtable'})

for tr in table.find_all('tr'):
    tds = tr.find_all('td')
    if len(tds) < 3:
        continue
    td = tds[2]
    name = td.get_text()
    f.write('- %s(%s)\n' % (name.encode('utf-8').strip(), tds[1].get_text().encode('utf-8').strip()))

