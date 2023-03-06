import { AppointmentType, ProcedureType, Medication, NurseType, PatientType, PhysicianType, User } from './types';

export const Users: User[] = [
  {
    id: 1,
    name: 'Sarita Singhania',
    role: 'Doctor',
    email: 'hello@gmail.com',
  },
  {
    id: 2,
    name: 'Yatindra Ardnitay',
    role: 'Doctor',
    email: 'olleh@gmail.com',
  },
];

export const Patients: PatientType[] = [
  {
    ssn: 100000001,
    name: 'John Smith',
    address: '42 Foobar Lane',
    phone: '555-0256',
    insuranceID: 68476213,
    primaryCarePhysician: 'John Dorian',
  },
  {
    ssn: 100000002,
    name: 'Grace Ritchie',
    address: '37 Snafu Drive',
    phone: '555-0512',
    insuranceID: 36546321,
    primaryCarePhysician: 'Elliot Reid',
  },
];

export const Physicians: PhysicianType[] = [
  {
    employeeID: 1,
    name: 'John Dorian',
    position: 'Staff Internist',
    ssn: 111111111,
  },
  {
    employeeID: 2,
    name: 'Elliot Reid',
    position: 'Attending Physician',
    ssn: 111111111,
  },
  {
    employeeID: 3,
    name: 'Christopher Turk',
    position: 'Surgical Attending Physician',
    ssn: 111111111,
  },
];

export const Nurses: NurseType[] = [
  {
    employeeID: 101,
    name: 'Carla Espinosa',
    position: 'Head Nurse',
    registered: true,
    ssn: 111111110,
  },
  {
    employeeID: 102,
    name: 'Laverne Roberts',
    position: 'Nurse',
    registered: true,
    ssn: 222222220,
  },
  {
    employeeID: 103,
    name: 'Paul Flowers',
    position: 'Nurse',
    registered: false,
    ssn: 333333330,
  },
];

export const Medications: Medication[] = [
  {
    code: 1,
    name: 'Procrastin-X',
    brand: 'X',
    description: 'N/A',
  },
  {
    code: 2,
    name: 'Thesisin',
    brand: 'Foo Labs',
    description: 'N/A',
  },
];

export const Appointments: AppointmentType[] = [
  {
    appointmentID: 13216584,
    patient: Patients[0],
    prepNurse: Nurses[0],
    physician: Physicians[0],
    start: new Date(),
    end: new Date(),
    examinationRoom: 'A',
    medication: Medications[0],
    dose: '5 per day',
  },
  {
    appointmentID: 26548913,
    patient: Patients[1],
    prepNurse: Nurses[1],
    physician: Physicians[1],
    start: new Date(),
    end: new Date(),
    examinationRoom: 'C',
    medication: Medications[1],
    dose: '10 per week',
  },
];

export const Procedures: ProcedureType[] = [
  {
    procedureID: 1,
    name: 'Bypass Surgery',
    patient: Patients[0],
    prepNurse: Nurses[0],
    physician: Physicians[0],
    cost: 5000,
    date: new Date(),
  },
  {
    procedureID: 2,
    name: 'Follicular Demiectomy',
    patient: Patients[1],
    prepNurse: Nurses[1],
    physician: Physicians[1],
    cost: 10000,
    date: new Date(),
  },
];
