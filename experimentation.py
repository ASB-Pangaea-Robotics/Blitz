from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "<h1>Hello, World!</h1>"

app.run(host='127.0.0.5', port=80, debug=True)