# -*-coding:utf-8 -*-

import markdown
from flask import Flask, jsonify, render_template, request
from weasyprint import HTML

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/markdown', methods=['POST'])
def trans2markdown():
    text_input = request.get_data()
    markdown_text = markdown.markdown(str(text_input).decode('utf-8'))
    return jsonify(markdown_text)


@app.route('/style', methods=['GET'])
def style():
    pass


@app.route('/convert2pdf',methods=['GET'])
def convert2pdf():
    HTML('http://www.crazy-code.tech/index.php/2016/11/09/python-virtualenv/').write_pdf('/Users/LucasLiu/Downloads/weasyprint-website.pdf')
    pass


if __name__ == '__main__':
    app.run()
