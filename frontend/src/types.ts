export interface User {
  id: number;
  name: string;
  role: 'Doctor' | 'Admin' | 'Front Desk Operator' | 'Data Entry Operator';
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface PatientType {
  SSN: number;
  Name: string;
  Address: string;
  Phone: string;
  InsuranceID: number;
  PCP: string;
  Gender: 'Male' | 'Female';
  Age: number;
}

export interface PhysicianType {
  EmployeeID: number;
  Name: string;
  Position: string;
  SSN: number;
}

export interface NurseType {
  EmployeeID: number;
  Name: string;
  Position: string;
  Registered: boolean;
  SSN: number;
}

export interface Medication {
  Code: number;
  Name: string;
  Brand: string;
  Description: string;
}

export interface AppointmentType {
  AppointmentID: number;
  Patient: PatientType;
  PrepNurse: NurseType;
  Physician: PhysicianType;
  Start: string;
  ExaminationRoom: string;
  Medication: Medication;
  Dose: string;
}

export interface ProcedureType {
  Procedure: number;
  Name: string;
  Patient: PatientType;
  AssistingNurse: NurseType | null;
  Physician: PhysicianType;
  Cost?: number;
  Date: string;
}

export type SchedulerFormType = {
  patient: number;
  physician: number;
  datetime: string;
  procedure: number;
};
