# -*-coding:utf-8 -*-

import markdown
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello,Flask'


if __name__ == '__main__':
    html = markdown.markdown(u'test 国家林业局')
    print html
    app.run()
