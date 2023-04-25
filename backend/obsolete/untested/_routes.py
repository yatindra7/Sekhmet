from app import app, db
from models import User, Physician, Patient, Undergoes, Appointment
from flask import request, make_response, jsonify

from uuid import uuid4

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

    return make_response(jsonify(
            {
                "message": "Retreived all patient"
                , "users": [sqlalchemy_row_to_dict(user) for user in User.query.all()]
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

    return make_response(jsonify(
            {
                "message": "Retreived all patients"
                , "patients": [sqlalchemy_row_to_dict(patient) for patient in Patient.query.all()]
            }
        ), 200)

@app.route('/patient/<int:ssn>')
def patient_ssn(ssn):

    # getting all the patient information

    # getting the patient basic data
    patient = Patient.query.filter_by(SSN = ssn).first()
    if patient:
        patient = sqlalchemy_row_to_dict(patient)
    else:
        return make_response(
            jsonify(
                {
                    "message": "Not found"
                }
            ), 404
        )

    # undergoes data
    undergoes = Undergoes.query.filter_by(Patient = ssn)
    if undergoes:
        undergoes = [sqlalchemy_row_to_dict(undergone) for undergone in undergoes]
    # appointments
    appointments =  Appointment.query.filter_by(Patient = ssn)
    if appointments:
        appointments = [sqlalchemy_row_to_dict(appointment) for appointment in appointments]

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
        # @Chirag the forms
        patient = ssn
        physician = request.form.get('physician')
        start = request.form.get('start')
        examinationroom = "cabin"
        appointment_id = Appointment.query.count() + 1
        nurses = Nurse.query.all()
        nurseid = None
        for nurse in nurses:
            nurseid = nurse.EmployeeID
            break
        appointment = Appointment(AppointmentID=appointment_id,
                                    Patient=patient,
                                    Physician=physician,
                                    Start=start,
                                    ExaminationRoom=examinationroom,
                                    PrepNurse=nurseid 
                                )
        db.session.add(appointment)
        db.session.commit()
        return make_response(jsonify(
                {
                    "message": "Appointment scheduled"
                }
            ) , 201)
    
    else:
        all_engagements = []
        physicians = Physician.query.all()
        for physician in physicians:
            engagements = []
            appointments = Appointment.query.filter_by(Physician = physician.EmployeeID).all()
            undergoes = Undergoes.query.filter_by(Physician = physician.EmployeeID).all()
            for appointment in appointments:
                engagements.append(appointment.Start)
            for undergo in undergoes:
                engagements.append(undergo.Date)
            physician_engagement =  {
                    'physician': physician
                    ,'engagements':engagements
                }
            
            all_engagements.append(physician_engagement)
        return make_response(
            jsonify({
                "phsyicians":all_engagements
                
            }),200
        )

# @Shreya and @Chirag

@app.route('/patient/<int:ssn>/test', methods=['POST', 'GET'])
def patient_ssn_test(ssn):

    if request.method == 'POST':
                # @Chirag the forms

        patient = ssn
        physician = request.form.get('physician')
        procedure = request.form.get('procedure')
        date = request.form.get('date')
        nurses = Nurse.query.all()
        nurseid = None
        for nurse in nurses:
            nurseid = nurse.EmployeeID
            break
        result = ""
        artifact = ""
        stays = Stay.query.all()
        stayid = -1
        for stay in stays:
            if stay.Patient == patient and stay.Start <= date and stay.End >= date:
                stayid = stay.StayID
                break

        if stayid == -1:
            return make_response(
            jsonify(
                {
                    "message": "Invalid test date"
                }
            ), 404
            )
        else:
            undergo = Undergoes(Patient=patient,
                                Procedure=procedure,
                                Stay=stayid,
                                Date=date,
                                Physician=physician,
                                AssistingNurse=nurseid,
                                Result=result,
                                Artifact=artifact)
            db.session.add(undergo)
            db.session.commit()
            return make_response(jsonify(
                {
                    "message": "Test scheduled"
                }
            ) , 201)
    else:
        all_engagements = []
        physicians = Physician.query.all()
        for physician in physicians:
            engagements = []
            appointments = Appointment.query.filter_by(Physician = physician.EmployeeID).all()
            undergoes = Undergoes.query.filter_by(Physician = physician.EmployeeID).all()
            for appointment in appointments:
                engagements.append(appointment.Start)
            for undergo in undergoes:
                engagements.append(undergo.Date)
            physician_engagement = {
                    "physician": physician
                    ,"engagements":engagements
                }
            
            all_engagements.append(physician_engagement)
        return make_response(
            jsonify({
                "phsyicians":all_engagements
            }),200
        )

@app.route('/physician', methods=['POST', 'GET'])
def physician():

    if request.method == 'POST':

        # extract the physician info recvd

        # add to db

        return 'PHYSICIAN POST'
    
    # get all physicians in DB
    return 'PHYSICIAN GET'

@app.route('/physician/<int:id>')
def physician_id(id):

    # get physician info (all)
    
    # get the patient info from appointment
    

    return f'PHYSCIAN {id} GET'

@app.route('/physician/engagements')
def physician_engagements():

    # get physician schedule (basically all appointments)
    return 'PHYSCIAN ENGAGEMENT GET'

@app.route('/procedure')
def procedure():

    # get all procedures
    return 'PROCEDURE GET'

@app.route('/procedure/<int:id>', methods=['PATCH'])
def procedure_id(id):

    if request.method == 'PATCH':

        # adding the recvd file to Undergoes
        return f'PROCEDURE {id} PATCH'
    return f'PROCEDURE {id} GET'

@app.route('/medication')
def medication():

    # get all medications
    return 'MEDICATION GET'

@app.route('/appointment/<int:id>', methods=['PATCH', 'GET'])
def appointment_id(id):

    if request.method == 'PATCH':

        return f'APPOINTMENT {id} PATCH'
    return f'APPOINTMENT {id} GET'

@app.route('/notify')
def notify():

    # send mails
    return 'NOTIFY MAILS'
