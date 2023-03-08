from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

import sys

if len(sys.argv) != 2:
    print("Usage: app.py <db_name>.db")

# give as first argument
dbname = sys.argv[1]

app = Flask(__name__)

# configs (to be changed)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{dbname}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ERROR_MESSAGE_KEY'] = 'message'

CORS(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login_manager = LoginManager(app)

login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# the routes
from pain_in_a.routes import *

if __name__ == '__main__':
    app.run(debug=True)
