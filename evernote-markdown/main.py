# -*-coding:utf-8 -*-

import markdown
import os
from flask import Flask, jsonify, render_template, request
from weasyprint import HTML, CSS

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


@app.route('/convert2pdf', methods=['POST'])
def convert2pdf():
    content = str(request.values.get('content'))
    path = os.path.dirname(__file__) + '/export/pdf/weasyprint-website.pdf'
    css = str(os.path.dirname(__file__) + '/' + request.values.get('css'))
    HTML(string=content).write_pdf(target=path, stylesheets=[CSS(filename=css)])
    result = {
        'code': 200,
        'msg': 'successful',
        'data': {
            'file_name': path
        }
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run()
