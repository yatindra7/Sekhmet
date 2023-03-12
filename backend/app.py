from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

from dotenv import load_dotenv
import os

load_dotenv()

# if len(sys.argv) != 2:
#     print("Usage: app.py <db_name>.db")

# give as first argument
dbname = os.getenv('DBNAME')
_uname = os.getenv('UNAME')
_password = os.getenv('PASSWORD')
_host = os.getenv('HOST')

app = Flask(__name__)

# configs (to be changed)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{_uname}:{_password}@{_host}/{dbname}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ERROR_MESSAGE_KEY'] = 'message'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login_manager = LoginManager(app)
CORS(app)

login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# the routes
from pain_in_a.routes import *

if __name__ == '__main__':
    app.run(debug=False)
