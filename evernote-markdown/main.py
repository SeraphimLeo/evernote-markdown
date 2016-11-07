# -*-coding:utf-8 -*-

import markdown
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/markdown', methods=['POST'])
def trans2markdown():
    text_input = request.get_data()
    markdown_text = markdown.markdown(str(text_input).decode('utf-8'))
    return jsonify(markdown_text)


if __name__ == '__main__':
    app.run()
