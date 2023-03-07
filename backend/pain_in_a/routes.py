from app import app, db
from models import User, Physician, Patient, Undergoes, Appointment, Procedure, Medication, Prescribes
from flask import request, make_response, jsonify

from uuid import uuid4

# todo: natural join the tables in question

def sqlalchemy_row_to_dict(row):

    return { column.name:str( getattr(row, column.name) ) for column in row.__table__.columns }

UUID_RANGE_LIMIT = 1000000

@app.route('/user', methods=['POST', 'GET'])
def user():
    
    if request.method == 'POST':

        # getting the response from the form
        # @Chirag add these to the form

        email = request.form.get('email')
        role = request.form.get('role')
        password = request.form.get('password')
        name = request.form.get('name')
        position = request.form.get('position')
        ssn = request.form.get('ssn')

        # adding the new user

        unique_id = int(uuid4()) % UUID_RANGE_LIMIT
        user = User(
            id = unique_id
            , email = email
            , password = password
            , role = role
            )
        
        # inserting user into db
        db.session.add(user)
        db.session.commit()

        # if doctor then also to be added
        # into the Physician table

        if role == 'Doctor':

            physician = Physician(
                EmployeeID = unique_id
                , Name = name
                , Position = position
                , SSN = ssn
            )

            db.session.add(physician)
            db.session.commit()

        return make_response(jsonify(
                {
                    "message": "User created"
                }
            ) , 201)
    
    # get all users in db
    users =  User.query.all()
    users = users if users is None else [sqlalchemy_row_to_dict(user) for user in users]

    return make_response(jsonify(
            {
                "message": "Retreived all users"
                , "users": users
            }
        ), 200)

@app.route('/user/login', methods=['POST', 'GET'])
def user_login():

    # todo

    if request.method == 'POST':
        return 'USER LOGIN POST'
    return 'USER LOGIN GET'

@app.route('/patient', methods=['POST', 'GET'])
def patient():

    if request.method == 'POST':
        
        # @Chirag the forms
        ssn = request.form.get('ssn')
        name = request.form.get('name')
        address = request.form.get('address')
        phone = request.form.get('phone')
        insurance_id = request.form.get('insurance_id')
        pcp = request.form.get('pcp')
        gender = request.form.get('gender')
        age = request.form.get('age')

        patient = Patient(

            SSN = ssn
            , Name = name
            , Address = address
            , Phone = phone
            , InsuranceID = insurance_id
            , PCP = pcp
            , Gender = gender
            , Age = age
        )

        db.session.add(patient)
        db.session.commit()
        
        return make_response(jsonify(
                {
                    "message": "Patient created"
                }
            ) , 201)
    
    # get all patients in db
    patients = db.session.query(Patient, Physician).join(Physician, Physician.EmployeeID == Patient.PCP).all()
    patients = patients if patients is None else [(sqlalchemy_row_to_dict(patient[0]), sqlalchemy_row_to_dict(patient[1])) for patient in patients]

    return make_response(jsonify(
            {
                "message": "Retreived all patients"
                , "patients": patients
            }
        ), 200)

@app.route('/patient/<int:ssn>')
def patient_ssn(ssn):

    # getting all the patient information

    # getting the patient basic data
    patient = db.session.query(Patient, Physician
                               ).join(Physician, Patient.PCP == Physician.EmployeeID
                                      ).filter(Patient.SSN == ssn).first()
    if patient:
        patient = sqlalchemy_row_to_dict(patient[0]), sqlalchemy_row_to_dict(patient[1])
    else:
        return make_response(
            jsonify(
                {
                    "message": "Not found"
                }
            ), 404
        )

    # undergoes data
    undergoes = db.session.query(Undergoes, Procedure
                                 ).join(Procedure, Undergoes.Procedure == Procedure.Code
                                        ).filter(Undergoes.Patient == ssn)
    if undergoes:
        undergoes = [(sqlalchemy_row_to_dict(undergone[0]), sqlalchemy_row_to_dict(undergone[1])) for undergone in undergoes]
    # appointments
    appointments =  db.session.query(Appointment, Physician
                                     ).join(Physician, Appointment.Physician == Physician.EmployeeID
                                            ).filter(Appointment.Patient == ssn)
    if appointments:
        appointments = [(sqlalchemy_row_to_dict(appointment[0]), sqlalchemy_row_to_dict(appointment[1])) for appointment in appointments]

    # appointment data
    return make_response(
        jsonify(
            {
                "patient": patient
                , "undergoes": undergoes
                , "appointments": appointments
            }
        ), 200
    )

# @Shreya and @Chirag

@app.route('/patient/<int:ssn>/appointment', methods=['POST', 'GET'])
def patient_ssn_appointment(ssn):

    if request.method == 'POST':
        return f'PATIENT {ssn} APPOINTMENT POST'
    return f'PATIENT {ssn} APPOINTMENT GET'

# @Shreya and @Chirag

@app.route('/patient/<int:ssn>/test', methods=['POST', 'GET'])
def patient_ssn_test(ssn):

    if request.method == 'POST':
        return f'PATIENT {ssn} TEST POST'
    return f'PATIENT {ssn} TEST GET'

@app.route('/physician', methods=['POST', 'GET'])
def physician():

    if request.method == 'POST':

        # todo
        # extract the physician info recvd

        # add to db

        return 'PHYSICIAN POST'
    
    # get all physicians in DB
    return make_response(jsonify(
            {
                "message": "Retreived all physicians"
                , "physicians": [sqlalchemy_row_to_dict(physician) for physician in Physician.query.all()]
            }
        ), 200)

def get_prescriptions(appointment):

    prescriptions = Prescribes.query.filter_by(Appointment = appointment.AppointmentID)
    return prescriptions if prescriptions is None else [sqlalchemy_row_to_dict(pres) for pres in prescriptions]

@app.route('/physician/<int:id>')
def physician_id(id):

    # get physician info (all)

    physician = sqlalchemy_row_to_dict(Physician.query.filter_by(EmployeeID = id).first())
    
    # get the patient info from appointment
    
    appointments = Appointment.query.filter_by(Physician = physician["EmployeeID"])
    appointments = appointments if appointments is None else [(sqlalchemy_row_to_dict(appointment), get_prescriptions(appointment)) for appointment in appointments]

    return make_response(jsonify(
            {
                "message": "Retreived all data"
                , "physician": physician
                , "appointments": appointments
            }
        ), 200)

@app.route('/physician/engagements')
def physician_engagements():

    # get physician schedule (basically all appointments)
    physicians = Physician.query.all()

    if not physicians:
        return make_response(jsonify(
            {
                "message": "Retreived all engagements"
                , "physicians": physicians
            }
        ), 200)

    appointments = {}

    for physician in physicians:
        _appointments = Appointment.query.filter_by(Physician = physician.EmployeeID)
        _appointments = _appointments if _appointments is None else [(sqlalchemy_row_to_dict(appointment), get_prescriptions(appointment)) for appointment in _appointments]
        appointments[physician.EmployeeID] = _appointments

    return make_response(jsonify(
            {
                "message": "Retreived all data"
                , "appointments": appointments
            }
        ), 200)

@app.route('/procedure')
def procedure():

    # get all procedures
    procedures = Procedure.query.all()
    procedures = procedures if procedures is None else [sqlalchemy_row_to_dict(procedure) for procedure in procedures]
    return make_response(jsonify(
            {
                "message": "Retreived all procedures"
                , "procedures": procedures
            }
        ), 200)

# @Shreya and @Chirag

@app.route('/procedure/<int:id>', methods=['PATCH'])
def procedure_id(id):

    if request.method == 'PATCH':

        # adding the recvd file to Undergoes
        return f'PROCEDURE {id} PATCH'
    return f'PROCEDURE {id} GET'

@app.route('/medication')
def medication():

    # get all medications
    procedures = Medication.query.all()
    procedures = procedures if procedures is None else [sqlalchemy_row_to_dict(procedure) for procedure in procedures]
    return make_response(jsonify(
            {
                "message": "Retreived all medication"
                , "medications": procedures
            }
        ), 200)

@app.route('/appointment/<int:id>', methods=['PATCH', 'GET'])
def appointment_id(id):

    # todo

    if request.method == 'PATCH':

        return f'APPOINTMENT {id} PATCH'
    return f'APPOINTMENT {id} GET'

@app.route('/notify')
def notify():

    # todo

    # send mails
    return 'NOTIFY MAILS'
