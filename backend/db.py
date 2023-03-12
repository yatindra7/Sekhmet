from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import os

from dotenv import load_dotenv
load_dotenv()

# if len(sys.argv) != 2:
#     print("Usage: db.py <db_name>.db")

# give as first argument
dbname = os.getenv('DBNAME')
_uname = os.getenv('UNAME')
_password = os.getenv('PASSWORD')
_host = os.getenv('HOST')

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{_uname}:{_password}@{_host}/{dbname}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


#  backref in medication is left was giving error idk why  -- done
# bckref in block 

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)

class Physician(db.Model):
    __tablename__ = 'physician'
    EmployeeID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Position = db.Column(db.Text, nullable=False)
    SSN = db.Column(db.Integer, nullable=False)

class Department(db.Model):
    __tablename__ = 'department'
    DepartmentID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Head = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), nullable=False)
    physicians = db.relationship("Physician", backref="physician_department")

class Affiliated_With(db.Model):
    __tablename__ = 'affiliated_with'
    Physician = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), primary_key=True)
    physicians = db.relationship("Physician", backref = "physician_affiliated_with")
    Department = db.Column(db.Integer, db.ForeignKey('department.DepartmentID'), primary_key=True)
    departments = db.relationship("Department", backref="department_affiliated_with")
    PrimaryAffiliation = db.Column(db.Boolean, nullable=False)

class Procedure(db.Model):
    __tablename__ = 'procedure'
    Code = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Cost = db.Column(db.Float, nullable=False)

class Trained_In(db.Model):
    __tablename__ = 'trained_in'
    Physician = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), primary_key=True)
    physicians = db.relationship("Physician", backref="physician_trained_in")
    Treatment = db.Column(db.Integer, db.ForeignKey('procedure.Code'), primary_key=True)
    procedures = db.relationship("Procedure", backref="procedure_trained_in")
    CertificationDate = db.Column(db.DateTime, nullable=False)
    CertificationExpires = db.Column(db.DateTime, nullable=False)

class Patient(db.Model):
    __tablename__ = 'patient'
    SSN = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Address = db.Column(db.Text, nullable=False)
    Phone = db.Column(db.Text, nullable=False)
    InsuranceID = db.Column(db.Integer, nullable=False)
    PCP = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), nullable=False)
    physicians = db.relationship("Physician", backref = "physician_patient")
    Gender = db.Column(db.Text, nullable=False)
    Age = db.Column(db.Integer, nullable=False)

class Nurse(db.Model):
    __tablename__ = 'nurse'
    EmployeeID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Position = db.Column(db.Text, nullable=False)
    Registered = db.Column(db.Boolean, nullable=False)
    SSN = db.Column(db.Integer, nullable=False)

class Appointment(db.Model):
    __tablename__ = 'appointment'
    AppointmentID = db.Column(db.Integer, primary_key=True)
    Patient = db.Column(db.Integer, db.ForeignKey('patient.SSN'), nullable=False)
    patients = db.relationship("Patient", backref="patient_appointment")
    PrepNurse = db.Column(db.Integer, db.ForeignKey('nurse.EmployeeID'),nullable = True)
    nurses = db.relationship("Nurse", backref="nurse_appointment")
    Physician = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), nullable=False)
    physicians = db.relationship("Physician", backref="physician_appointment")
    Start = db.Column(db.DateTime, nullable=False)
    # End = db.Column(db.DateTime, nullable=False)
    ExaminationRoom = db.Column(db.Text, nullable=False)

class Medication(db.Model):
    __tablename__ = 'medication'
    Code = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.Text, nullable=False)
    Brand = db.Column(db.Text, nullable=False)
    Description = db.Column(db.Text, nullable=False)
    
class Prescribes(db.Model):
    __tablename__ = 'prescribes'
    Physician = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), primary_key=True)
    physicians = db.relationship("Physician", backref="physician_prescribes")
    Patient = db.Column(db.Integer, db.ForeignKey('patient.SSN'), primary_key=True)
    patients = db.relationship("Patient", backref="patient_prescribes")
    Medication = db.Column(db.Integer, db.ForeignKey('medication.Code'), primary_key=True)
    medications = db.relationship("Medication", backref="medication_prescribes")
    Date = db.Column(db.DateTime, primary_key=True)
    Appointment = db.Column(db.Integer, db.ForeignKey('appointment.AppointmentID'))
    appointments = db.relationship("Appointment", backref = "appointment_prescribes")
    Dose = db.Column(db.Text)

class Block(db.Model):
    __tablename__ = 'block'
    Floor = db.Column(db.Integer, primary_key=True, nullable=False)
    Code = db.Column(db.Integer, primary_key=True, nullable=False)

class Room(db.Model):
    __tablename__ = 'room'
    Number = db.Column(db.Integer, primary_key=True, nullable=False)
    Type = db.Column(db.Text, nullable=False)
    BlockFloor = db.Column(db.Integer, nullable=False)
    BlockCode = db.Column(db.Integer, nullable=False)
    # blocks = db.relationship("Block", backref = "block_room")
    __table_args__ = (db.ForeignKeyConstraint(['BlockFloor', 'BlockCode'], ['block.Floor','block.Code']),)
    blocks = db.relationship("Block", backref="block_room", foreign_keys=[BlockFloor, BlockCode])
    Unavailable = db.Column(db.Boolean, nullable=False)

class On_Call(db.Model):
    __tablename__ = 'on_call'
    Nurse = db.Column(db.Integer, db.ForeignKey('nurse.EmployeeID'), primary_key=True)
    nurses = db.relationship("Nurse", backref="nurse_on_call")
    BlockFloor = db.Column(db.Integer,primary_key=True)
    BlockCode = db.Column(db.Integer, primary_key=True)
    # blocks = db.relationship("Block", backref = "block_on_call")
    __table_args__ = (db.ForeignKeyConstraint(['BlockFloor', 'BlockCode'], ['block.Floor','block.Code']),)
    blocks = db.relationship("Block", backref="block_on_call", foreign_keys=[BlockFloor, BlockCode])
    Start = db.Column(db.DateTime, primary_key=True)
    End = db.Column(db.DateTime, primary_key=True)

class Stay(db.Model):
    __tablename__ = 'stay'
    StayID = db.Column(db.Integer, primary_key=True, nullable=False)
    Patient = db.Column(db.Integer, db.ForeignKey('patient.SSN'), nullable=False)
    patients = db.relationship("Patient", backref="patient_stay")
    Room = db.Column(db.Integer, db.ForeignKey('room.Number'), nullable=False)
    rooms = db.relationship("Room", backref="room_stay")
    Start = db.Column(db.DateTime, nullable=False)
    End = db.Column(db.DateTime, nullable=True)

class Undergoes(db.Model):
    __tablename__ = 'undergoes'
    Patient = db.Column(db.Integer, db.ForeignKey('patient.SSN'), nullable=False, primary_key=True)
    patients = db.relationship("Patient", backref = "patient_undergoes")
    Procedure = db.Column(db.Integer, db.ForeignKey('procedure.Code'), nullable=False, primary_key=True)
    procedures = db.relationship("Procedure", backref="procedure_undergoes")
    Stay = db.Column(db.Integer, db.ForeignKey('stay.StayID'), nullable=False, primary_key=True)
    stays = db.relationship("Stay", backref = "stay_undergoes")
    Date = db.Column(db.DateTime, nullable=False, primary_key=True)
    Physician = db.Column(db.Integer, db.ForeignKey('physician.EmployeeID'), nullable=False)
    physicians = db.relationship("Physician", backref = "physician_undergoes")  
    AssistingNurse = db.Column(db.Integer, db.ForeignKey('nurse.EmployeeID'))
    nurses = db.relationship("Nurse", backref="nurse_undergoes")

    Result = db.Column(db.Text)
    Artifact = db.Column(db.Text)


with app.app_context():
    db.create_all()

    print("DB_CREATE_ALL")

    physicians_data = [
        Physician(EmployeeID=1, Name='John Dorian', Position ='Staff Internist', SSN=111111111),
        Physician(EmployeeID=2, Name='Elliot Reid', Position ='Attending Physician', SSN=222222222),
        Physician(EmployeeID=3, Name='Christopher Turk', Position ='Surgical Attending Physician', SSN=333333333),
        Physician(EmployeeID=4, Name='Percival Cox', Position ='Senior Attending Physician', SSN=444444444),
        Physician(EmployeeID=5, Name='Bob Kelso', Position ='Head Chief of Medicine', SSN=555555555),
        Physician(EmployeeID=6, Name='Todd Quinlan', Position ='Surgical Attending Physician', SSN=666666666),
        Physician(EmployeeID=7, Name='John Wen', Position ='Surgical Attending Physician', SSN=777777777),
        Physician(EmployeeID=8, Name='Keith Dudemeister', Position ='MD Resident', SSN=888888888),
        Physician(EmployeeID=9, Name='Molly Clock', Position ='Attending Psychiatrist', SSN=999999999),
    ]

    departments_data = [
        Department(DepartmentID= 1, Name='General Medicine' , Head=4 ),
        Department(DepartmentID= 2, Name='Surgery' , Head= 7),
        Department(DepartmentID= 3, Name='Psychiatry' , Head= 9)
    ]

    affiliated_with_data = [
        Affiliated_With(Physician= 1,Department= 1,PrimaryAffiliation=1),
        Affiliated_With(Physician= 2,Department= 1,PrimaryAffiliation=1),
        Affiliated_With(Physician= 3,Department= 1,PrimaryAffiliation=0),
        Affiliated_With(Physician= 3,Department= 2,PrimaryAffiliation=1),
        Affiliated_With(Physician= 4,Department= 1,PrimaryAffiliation=1),
        Affiliated_With(Physician= 5,Department= 1,PrimaryAffiliation=1),
        Affiliated_With(Physician= 6,Department= 2,PrimaryAffiliation=1),
        Affiliated_With(Physician= 7,Department= 1,PrimaryAffiliation=0),
        Affiliated_With(Physician= 7,Department= 2,PrimaryAffiliation=1),
        Affiliated_With(Physician= 8,Department= 1,PrimaryAffiliation=1),
        Affiliated_With(Physician= 9,Department= 3,PrimaryAffiliation=1)
    ]

    procedure_data = [
        Procedure(Code=1 ,Name='Reverse Rhinodoplasty' ,Cost= 1500.0),
        Procedure(Code=2 ,Name='Obtuse Pyloric Recombobulation' ,Cost=3750.0 ),
        Procedure(Code=3 ,Name='Folded Demiophtalmectomy' ,Cost= 4500.0),
        Procedure(Code=4 ,Name='Complete Walletectomy' ,Cost= 10000.0),
        Procedure(Code=5 ,Name='Obfuscated Dermogastrotomy' ,Cost=4899.0 ),
        Procedure(Code=6 ,Name='Reversible Pancreomyoplasty' ,Cost=5600.0 ),
        Procedure(Code=7 ,Name= 'Follicular Demiectomy',Cost= 25.0),
    ]

    patient_data =[
        Patient(SSN= 100000001,Name ='John Smith',Address = '42 Foobar Lane',Phone = '555-0256',InsuranceID= 68476213,PCP=1, Gender = 'Male', Age =52),
        Patient(SSN= 100000002,Name ='Grace Ritchie',Address = '37 Snafu Drive',Phone = '555-0512',InsuranceID= 36546321,PCP=2, Gender = 'Male', Age =52),
        Patient(SSN= 100000003,Name ='Random J. Patient',Address = '101 Omgbbq Street',Phone = '555-1204',InsuranceID= 65465421,PCP=2, Gender = 'Male', Age =52),
        Patient(SSN= 100000004,Name ='Dennis Doe',Address = '1100 Foobaz Avenue',Phone = '555-2048',InsuranceID= 68421879,PCP=3, Gender = 'Male', Age =52)
    ]

    nurse_data =[    
        Nurse(EmployeeID = 101,Name = 'Carla Espinosa',Position= 'Head Nurse', Registered = 1, SSN = 111111110),
        Nurse(EmployeeID = 102,Name = 'Laverne Roberts',Position= 'Nurse', Registered = 1, SSN = 222222220),
        Nurse(EmployeeID = 103,Name = 'Paul Flowers',Position= 'Nurse', Registered = 0, SSN = 333333330)
    ]

    # appointment_data = [
    #     Appointment(AppointmentID = 13216584,Patient = 100000001,PrepNurse = 101,Physician = 1,Start = datetime.strptime('2008-04-24 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-24 10:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'A'),
    #     Appointment(AppointmentID = 26548913,Patient = 100000002,PrepNurse = 101,Physician = 2,Start = datetime.strptime('2008-04-24 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-24 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'B'),
    #     Appointment(AppointmentID = 36549879,Patient = 100000001,PrepNurse = 102,Physician = 1,Start = datetime.strptime('2008-04-25 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-25 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'A'),
    #     Appointment(AppointmentID = 46846589,Patient = 100000004,PrepNurse = 103,Physician = 4,Start = datetime.strptime('2008-04-25 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-25 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'B'),
    #     Appointment(AppointmentID = 59871321,Patient = 100000004,PrepNurse =None,Physician = 4,Start = datetime.strptime('2008-04-26 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-26 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'C'),
    #     Appointment(AppointmentID = 69879231,Patient = 100000003,PrepNurse = 103,Physician = 2,Start = datetime.strptime('2008-04-26 11:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-26 12:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'C'),
    #     Appointment(AppointmentID = 76983231,Patient = 100000001,PrepNurse =None,Physician = 3,Start = datetime.strptime('2008-04-26 12:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-26 13:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'C'),
    #     Appointment(AppointmentID = 86213939,Patient = 100000004,PrepNurse = 102,Physician = 9,Start = datetime.strptime('2008-04-27 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-21 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'A'),
    #     Appointment(AppointmentID = 93216548,Patient = 100000002,PrepNurse = 101,Physician = 2,Start = datetime.strptime('2008-04-27 10:00:00' , '%Y-%m-%d %H:%M:%S'),End = datetime.strptime('2008-04-27 11:00:00', '%Y-%m-%d %H:%M:%S'),ExaminationRoom = 'B')
    # ]

    appointment_data = [
        Appointment(AppointmentID = 13216584,Patient = 100000001,PrepNurse = 101,Physician = 1,Start = datetime.strptime('2008-04-24 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'A'),
        Appointment(AppointmentID = 26548913,Patient = 100000002,PrepNurse = 101,Physician = 2,Start = datetime.strptime('2008-04-24 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'B'),
        Appointment(AppointmentID = 36549879,Patient = 100000001,PrepNurse = 102,Physician = 1,Start = datetime.strptime('2008-04-25 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'A'),
        Appointment(AppointmentID = 46846589,Patient = 100000004,PrepNurse = 103,Physician = 4,Start = datetime.strptime('2008-04-25 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'B'),
        Appointment(AppointmentID = 59871321,Patient = 100000004,PrepNurse =None,Physician = 4,Start = datetime.strptime('2008-04-26 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'C'),
        Appointment(AppointmentID = 69879231,Patient = 100000003,PrepNurse = 103,Physician = 2,Start = datetime.strptime('2008-04-26 11:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'C'),
        Appointment(AppointmentID = 76983231,Patient = 100000001,PrepNurse =None,Physician = 3,Start = datetime.strptime('2008-04-26 12:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'C'),
        Appointment(AppointmentID = 86213939,Patient = 100000004,PrepNurse = 102,Physician = 9,Start = datetime.strptime('2008-04-27 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'A'),
        Appointment(AppointmentID = 93216548,Patient = 100000002,PrepNurse = 101,Physician = 2,Start = datetime.strptime('2008-04-27 10:00:00' , '%Y-%m-%d %H:%M:%S'), ExaminationRoom = 'B')
    ]
    medication_data = [
        
    Medication(Code = 1,Name = 'Procrastin-X',Brand = 'X',Description ='N/A'),
    Medication(Code = 2,Name = 'Thesisin',Brand = 'Foo Labs',Description ='N/A'),
    Medication(Code = 3,Name = 'Awakin',Brand = 'Bar Laboratories',Description ='N/A'),
    Medication(Code = 4,Name = 'Crescavitin',Brand = 'Baz Industries',Description ='N/A'),
    Medication(Code = 5,Name = 'Melioraurin',Brand = 'Snafu Pharmaceuticals',Description ='N/A')
    ]

    prescribes_data = [
        
        Prescribes(Physician = 1,Patient = 100000001,Medication = 1,Date = datetime.strptime('2008-04-24 10:47:00' , '%Y-%m-%d %H:%M:%S'), Appointment = 13216584,Dose = '5'),
        Prescribes(Physician = 9,Patient = 100000004,Medication = 2,Date = datetime.strptime('2008-04-27 10:53:00' , '%Y-%m-%d %H:%M:%S'), Appointment = 86213939,Dose = '10'),
        Prescribes(Physician = 9,Patient = 100000004,Medication = 2,Date = datetime.strptime('2008-04-30 16:53:00' , '%Y-%m-%d %H:%M:%S'), Appointment = None,Dose = '5')
    ]

    block_data = [
        
    Block(Floor = 1,Code = 1),
    Block(Floor = 1,Code = 2),
    Block(Floor = 1,Code = 3),
    Block(Floor = 2,Code = 1),
    Block(Floor = 2,Code = 2),
    Block(Floor = 2,Code = 3),
    Block(Floor = 3,Code = 1),
    Block(Floor = 3,Code = 2),
    Block(Floor = 3,Code = 3),
    Block(Floor = 4,Code = 1),
    Block(Floor = 4,Code = 2),
    Block(Floor = 4,Code = 3)
    ]

    room_data = [
        Room(Number = 101,Type = 'Single',BlockFloor = 1, BlockCode = 1,Unavailable = 0),
        Room(Number = 102,Type = 'Single',BlockFloor = 1, BlockCode = 1,Unavailable = 0),
        Room(Number = 103,Type = 'Single',BlockFloor = 1, BlockCode = 1,Unavailable = 0),
        Room(Number = 111,Type = 'Single',BlockFloor = 1, BlockCode = 2,Unavailable = 0),
        Room(Number = 112,Type = 'Single',BlockFloor = 1, BlockCode = 2,Unavailable = 1),
        Room(Number = 113,Type = 'Single',BlockFloor = 1, BlockCode = 2,Unavailable = 0),
        Room(Number = 121,Type = 'Single',BlockFloor = 1, BlockCode = 3,Unavailable = 0),
        Room(Number = 122,Type = 'Single',BlockFloor = 1, BlockCode = 3,Unavailable = 0),
        Room(Number = 123,Type = 'Single',BlockFloor = 1, BlockCode = 3,Unavailable = 0),
        Room(Number = 201,Type = 'Single',BlockFloor = 2, BlockCode = 1,Unavailable = 1),
        Room(Number = 202,Type = 'Single',BlockFloor = 2, BlockCode = 1,Unavailable = 0),
        Room(Number = 203,Type = 'Single',BlockFloor = 2, BlockCode = 1,Unavailable = 0),
        Room(Number = 211,Type = 'Single',BlockFloor = 2, BlockCode = 2,Unavailable = 0),
        Room(Number = 212,Type = 'Single',BlockFloor = 2, BlockCode = 2,Unavailable = 0),
        Room(Number = 213,Type = 'Single',BlockFloor = 2, BlockCode = 2,Unavailable = 1),
        Room(Number = 221,Type = 'Single',BlockFloor = 2, BlockCode = 3,Unavailable = 0),
        Room(Number = 222,Type = 'Single',BlockFloor = 2, BlockCode = 3,Unavailable = 0),
        Room(Number = 223,Type = 'Single',BlockFloor = 2, BlockCode = 3,Unavailable = 0),
        Room(Number = 301,Type = 'Single',BlockFloor = 3, BlockCode = 1,Unavailable = 0),
        Room(Number = 302,Type = 'Single',BlockFloor = 3, BlockCode = 1,Unavailable = 1),
        Room(Number = 303,Type = 'Single',BlockFloor = 3, BlockCode = 1,Unavailable = 0),
        Room(Number = 311,Type = 'Single',BlockFloor = 3, BlockCode = 2,Unavailable = 0),
        Room(Number = 312,Type = 'Single',BlockFloor = 3, BlockCode = 2,Unavailable = 0),
        Room(Number = 313,Type = 'Single',BlockFloor = 3, BlockCode = 2,Unavailable = 0),
        Room(Number = 321,Type = 'Single',BlockFloor = 3, BlockCode = 3,Unavailable = 1),
        Room(Number = 322,Type = 'Single',BlockFloor = 3, BlockCode = 3,Unavailable = 0),
        Room(Number = 323,Type = 'Single',BlockFloor = 3, BlockCode = 3,Unavailable = 0),
        Room(Number = 401,Type = 'Single',BlockFloor = 4, BlockCode = 1,Unavailable = 0),
        Room(Number = 402,Type = 'Single',BlockFloor = 4, BlockCode = 1,Unavailable = 1),
        Room(Number = 403,Type = 'Single',BlockFloor = 4, BlockCode = 1,Unavailable = 0),
        Room(Number = 411,Type = 'Single',BlockFloor = 4, BlockCode = 2,Unavailable = 0),
        Room(Number = 412,Type = 'Single',BlockFloor = 4, BlockCode = 2,Unavailable = 0),
        Room(Number = 413,Type = 'Single',BlockFloor = 4, BlockCode = 2,Unavailable = 0),
        Room(Number = 421,Type = 'Single',BlockFloor = 4, BlockCode = 3,Unavailable = 1),
        Room(Number = 422,Type = 'Single',BlockFloor = 4, BlockCode = 3,Unavailable = 0),
        Room(Number = 423,Type = 'Single',BlockFloor = 4, BlockCode = 3,Unavailable = 0)
    ]

    on_call_data = [
        
        On_Call(Nurse = 101,BlockFloor = 1,BlockCode = 1,Start = datetime.strptime('2008-11-04 11:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S')),
        On_Call(Nurse = 101,BlockFloor = 1,BlockCode = 2,Start = datetime.strptime('2008-11-04 11:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S')),
        On_Call(Nurse = 102,BlockFloor = 1,BlockCode = 3,Start = datetime.strptime('2008-11-04 11:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S')),
        On_Call(Nurse = 103,BlockFloor = 1,BlockCode = 1,Start = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-05 03:00:00','%Y-%m-%d %H:%M:%S')),
        On_Call(Nurse = 103,BlockFloor = 1,BlockCode = 2,Start = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-05 03:00:00','%Y-%m-%d %H:%M:%S')),
        On_Call(Nurse = 103,BlockFloor = 1,BlockCode = 3,Start = datetime.strptime('2008-11-04 19:00:00','%Y-%m-%d %H:%M:%S') ,End = datetime.strptime('2008-11-05 03:00:00','%Y-%m-%d %H:%M:%S'))
    ]

    stay_data = [
        
        Stay(StayID = 3215,Patient = 100000001,Room = 111,Start = datetime.strptime('2008-05-01','%Y-%m-%d'),End = datetime.strptime('2008-05-04','%Y-%m-%d')),
        Stay(StayID = 3216,Patient = 100000003,Room = 123,Start = datetime.strptime('2008-05-03','%Y-%m-%d'),End = datetime.strptime('2008-05-14','%Y-%m-%d')),
        Stay(StayID = 3217,Patient = 100000004,Room = 112,Start = datetime.strptime('2008-05-02','%Y-%m-%d'),End = datetime.strptime('2008-05-03','%Y-%m-%d'))
    ]

    undergoes_data = [
        Undergoes(Patient = 100000001,Procedure = 6,Stay = 3215,Date = datetime.strptime('2008-05-02','%Y-%m-%d'),Physician = 3,AssistingNurse = 101),
        Undergoes(Patient = 100000001,Procedure = 2,Stay = 3215,Date = datetime.strptime('2008-05-03','%Y-%m-%d'),Physician = 7,AssistingNurse = 101),
        Undergoes(Patient = 100000004,Procedure = 1,Stay = 3217,Date = datetime.strptime('2008-05-07','%Y-%m-%d'),Physician = 3,AssistingNurse = 102),
        Undergoes(Patient = 100000004,Procedure = 5,Stay = 3217,Date = datetime.strptime('2008-05-09','%Y-%m-%d'),Physician = 6,AssistingNurse = None),
        Undergoes(Patient = 100000001,Procedure = 7,Stay = 3217,Date = datetime.strptime('2008-05-10','%Y-%m-%d'),Physician = 7,AssistingNurse = 101),
        Undergoes(Patient = 100000004,Procedure = 4,Stay = 3217,Date = datetime.strptime('2008-05-13','%Y-%m-%d'),Physician = 3,AssistingNurse = 103)
    ]

    trained_in_data = [  
        Trained_In(Physician = 3,Treatment = 1,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 3,Treatment = 2,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 3,Treatment = 5,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 3,Treatment = 6,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 3,Treatment = 7,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 6,Treatment = 2,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 6,Treatment = 5,CertificationDate = datetime.strptime('2007-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2007-12-31','%Y-%m-%d')),
        Trained_In(Physician = 6,Treatment = 6,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 1,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 2,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 3,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 4,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 5,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 6,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d')),
        Trained_In(Physician = 7,Treatment = 7,CertificationDate = datetime.strptime('2008-01-01','%Y-%m-%d'),CertificationExpires = datetime.strptime('2008-12-31','%Y-%m-%d'))
    ]
    
    db.session.add_all(physicians_data)
    db.session.add_all(departments_data)
    db.session.add_all(affiliated_with_data)
    db.session.add_all(procedure_data)
    db.session.add_all(patient_data)
    db.session.add_all(nurse_data)
    db.session.add_all(appointment_data)
    db.session.add_all(medication_data)
    db.session.add_all(prescribes_data)
    db.session.add_all(block_data)
    db.session.add_all(room_data)
    db.session.add_all(on_call_data)
    db.session.add_all(stay_data)
    db.session.add_all(undergoes_data)
    db.session.add_all(trained_in_data)

    db.session.commit()

    # physicians = Physician.query.all()
    # dep = Trained_In.query.filter_by(Treatment = 4).all()

    # print the results
    # for physician in dep:
    #    print(physician)
    # physicians = session.query(Physician).all()
    # surgeons = Trained_In.query.all()

    # print the results
    # for physician in surgeons:
    #    print(physician)
