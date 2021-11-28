from flask import Flask, jsonify, redirect, abort, request
from flask_cors import CORS
from database.models import setup_db, User
import http.client
import requests
import json
import os
#from auth.auth import requires_auth
REDIRECT_URL = 'http://localhost:3000'


def create_app():
    app = Flask(__name__)
    setup_db(app)
    CORS(app)
    return app

app = create_app()

# @app.route('/callback', methods=['GET'])
# def app_response_code():
#     return '''  <script type="text/javascript">
#                 var token = window.location.href.split("access_token=")[1]; 
#                 window.location = "/callback_token/" + token;
#             </script> '''

@app.route('/callback', methods=['GET'])
def app_response_code():
    return '''  <script type="text/javascript">
                var token = window.location.href.split("code=")[1]; 
                window.location = "/callback_token/" + token;
            </script> '''

@app.route('/callback_token/<token>/', methods=['GET'])
def app_response_token(token):
    print(token)
    post_token_request(token)
    return jsonify({
        'token': token
    })


def post_token_request(id_token):
    url = 'https://dev-artpgixt.us.auth0.com/oauth/token'
    obj = {
        'grant_type': 'authorization_code',
        'client_id': os.getenv('CLIENT_ID', ''),
        'client_secret': os.getenv('CLIENT_SECRET', ''),
        'code': id_token,
        'redirect_uri': 'http://127.0.0.1:5000/callback'
    }
    header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post(url, data=obj, headers=header)
    print(r.content)

@app.route('/users/<email>')
def get_user_by_email(email):
    print(email)
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        user = User(email=email, subscribed=False)
        user.insert()

    return jsonify({
        'email': user.email,
        'id': user.id,
        'subscribed': user.subscribed
    })

@app.route('/users/<user_id>', methods=['PATCH'])
def update_user_subscription(user_id):
    user = User.query.filter_by(id=user_id).one_or_none()
    if (user is None):
        abort(404)
    data = request.get_json()
    print('Receving POST request: ' , data)
    if data is None or 'subscribed' not in data:
        abort(400)
    if type(data['subscribed']) is not bool:
        abort(500)
    print(data['subscribed'])
    user.subscribed = data['subscribed']
    user.update()
    return jsonify( {
        'success': True,
        'user': {
            'id': user.id,
            'subscribed': user.subscribed 
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
