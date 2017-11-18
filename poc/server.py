'''
pip install flask-cors
pip install flask
export FLASK_APP=server.py && flask run
'''

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Tracking app'

@app.route('/track/email/<guid>', methods = ['POST'])
def track_email(guid):
    
    if not request.json:
        abort(400)
    
    print(guid, request.json)
    return '', 204

@app.route('/track/url/<guid>', methods = ['POST'])
def track_url(guid):
    
    if not request.json:
        abort(400)
    
    print(guid, request.json)
    return '', 204
    
    