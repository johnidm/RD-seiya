'''
pip install flask-cors
pip install flask
export FLASK_APP=server.py && flask run
'''

from flask import Flask, request
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

emails = {}
urls = {}

@app.route('/')
def home():
    return json.dumps(emails)

@app.route('/detail/<guid>')
def details(guid):
    if guid in urls.keys():
        return json.dumps(urls[guid])
    
    return 'Not found'

@app.route('/track/email/<guid>', methods = ['POST'])
def track_email(guid):
    
    if not request.json:
        abort(400)
    
    email = request.json['email']
    if email in emails.keys():
        emails[email].append(guid)
    else:
        emails[email] = [guid]

    print(emails)
    return '', 204

@app.route('/track/url/<guid>', methods = ['POST'])
def track_url(guid):

    if not request.json:
        abort(400)

    data = request.json
    if guid in urls.keys():
        urls[guid].append(data)
    else:
        urls[guid] = [data]
    
    print(urls)
    return '', 204
