import { AppointmentType, ProcedureType, Medication, NurseType, PatientType, PhysicianType, User } from './types';

export const BACKEND_URL = 'http://localhost:5000';

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

export const Patients: PatientType[] = [];

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

export const Appointments: AppointmentType[] = [];

export const Procedures: ProcedureType[] = [];
