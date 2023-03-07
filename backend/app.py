from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

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

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# the routes
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
    from .models import *
    db.create_all()

    patient_data =[
        Patient(SSN= 100000001,Name ='John Smith',Address = '42 Foobar Lane',Phone = '555-0256',InsuranceID= 68476213,PCP=1, Gender = 'Male', Age =52),
        Patient(SSN= 100000002,Name ='Grace Ritchie',Address = '37 Snafu Drive',Phone = '555-0512',InsuranceID= 36546321,PCP=2, Gender = 'Male', Age =52),
        Patient(SSN= 100000003,Name ='Random J. Patient',Address = '101 Omgbbq Street',Phone = '555-1204',InsuranceID= 65465421,PCP=2, Gender = 'Male', Age =52),
        Patient(SSN= 100000004,Name ='Dennis Doe',Address = '1100 Foobaz Avenue',Phone = '555-2048',InsuranceID= 68421879,PCP=3, Gender = 'Male', Age =52)
    ]

    db.session.add_all(patient_data)

    print(type({patient_data[0].SSN:{
        'Name': patient_data[0].Name
        , 'Address': patient_data[0].Address
        , 'Phone': patient_data[0].Phone
        }}))
