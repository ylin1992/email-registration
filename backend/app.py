from flask import Flask, jsonify, redirect, abort, request
from flask_cors import CORS
from database.models import setup_db, User
import http.client
import requests
import json
import os
from email_sender.emails import SendGridEmail
from email_sender.config import SENDER_EMAIL
#from auth.auth import requires_auth
REDIRECT_URL = 'http://localhost:3000'


def create_app():
    app = Flask(__name__)
    setup_db(app)
    CORS(app)
    return app

app = create_app()

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
        'redirect_uri': os.getenv('REDIRECT_URI', '')
    }
    header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post(url, data=obj, headers=header)
    print(r.content)

@app.route('/users/auth0/<auth0_id>')
def get_user_by_auth0_id(auth0_id):
    user = User.query.filter_by(auth0_id=auth0_id).one_or_none()
    if user is None:
        abort(404)
    return jsonify({
        'success': True,
        'user': user.format()
    })

@app.route('/users/<email>')
def get_user_by_email(email):
    print(email)
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        abort(404)
        # user = User(email=email, subscribed=False)
        # user.insert()

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

@app.route('/users', methods=['GET'])
def get_all_users():
    query = request.args
    try:
        if 'subscribed' in query:
            subscribed = query.get('subscribed')
            if subscribed.lower() == 'true':
                user_query = User.query.filter_by(subscribed=True).all()
            elif subscribed.lower() == 'false':
                user_query = User.query.filter_by(subscribed=False).all()
            else:
                abort(400)
        else:       
            user_query = User.query.all()
        users = [u.format() for u in user_query]
    except Exception as e:
        print(e)
        abort(500)
    return jsonify({
        'users': users,
        'success': True
    })

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    if 'auth0_id' not in data or 'email' not in data:
        abort(400)
    
    user_query = User.query.filter_by(auth0_id=data['auth0_id']).one_or_none()
    if user_query is not None:
        abort(422)

    user = User(auth0_id=data['auth0_id'], email=data['email'])
    user.insert()

    validated = User.query.filter_by(auth0_id=data['auth0_id']).one_or_none()
    if validated is None:
        abort(500)

    return jsonify({
        'success': True,
        'user': validated.format()
    })

@app.route('/welcome/<auth0_id>')
def send_welcome_email(auth0_id):
    try:
        user = User.query.filter_by(auth0_id=auth0_id).one_or_none()
    except Exception as e:
        print(e)
        abort(500)
    if user is None:
        abort(404)
    try:
        email_address = user.email
        email = SendGridEmail(sender=SENDER_EMAIL, receiver=email_address, subject="", content="")
        email.set_email(subject="Welcome to Profresher", content="You've subscribed, grab a cup of coffee :)")
        email.send_email()
    except Exception as e:
        print(e)
        abort(500)

    return jsonify({
        "success": True,
        "user": user.format()
    })


@app.route('/leave/<auth0_id>')
def send_leaving_email(auth0_id):
    try:
        user = User.query.filter_by(auth0_id=auth0_id).one_or_none()
    except Exception as e:
        print(e)
        abort(500)
    if user is None:
        abort(404)
    try:
        email_address = user.email
        email = SendGridEmail(sender=SENDER_EMAIL, receiver=email_address, subject="", content="")
        email.set_email(subject="We will miss you", content="We are soory that you choose to leave us, feel free to get back :)")
        email.send_email()
    except Exception as e:
        print(e)
        abort(500)

    return jsonify({
        "success": True,
        "user": user.format()
    })


if __name__ == '__main__':
    app.run(debug=True)


