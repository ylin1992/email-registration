from flask import Flask, jsonify
from flask_cors import CORS
from database.models import setup_db
#from auth.auth import requires_auth
def create_app():
    app = Flask(__name__)
    setup_db(app)
    CORS(app)
    return app

app = create_app()

@app.route('/callback', methods=['GET'])
def app_response_code():
    return '''  <script type="text/javascript">
                var token = window.location.href.split("access_token=")[1]; 
                window.location = "/callback_token/" + token;
            </script> '''

@app.route('/callback_token/<token>/', methods=['GET'])
def app_response_token(token):
    return jsonify({
        'token': token
    })

if __name__ == '__main__':
    app.run(debug=True)
