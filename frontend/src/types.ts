export interface User {
  id: number;
  name: string;
  role: 'Doctor' | 'Admin' | 'Front Desk Operator' | 'Data Entry Operator';
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface PatientType {
  ssn: number;
  name: string;
  address: string;
  phone: string;
  insuranceID: number;
  primaryCarePhysician: string;
}

export interface PhysicianType {
  employeeID: number;
  name: string;
  position: string;
  ssn: number;
}

export interface NurseType {
  employeeID: number;
  name: string;
  position: string;
  registered: boolean;
  ssn: number;
}

export interface Medication {
  code: number;
  name: string;
  brand: string;
  description: string;
}

export interface AppointmentType {
  appointmentID: number;
  patient: PatientType;
  prepNurse: NurseType | null;
  physician: PhysicianType;
  start: Date;
  end: Date;
  examinationRoom: string;
  medication: Medication;
  dose: string;
}

export interface ProcedureType {
  procedureID: number;
  name: string;
  patient: PatientType;
  prepNurse: NurseType | null;
  physician: PhysicianType;
  cost: number;
}
