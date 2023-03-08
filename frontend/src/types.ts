export interface User {
  id: number;
  name: string;
  role: 'Doctor' | 'Admin' | 'Front Desk Operator' | 'Data Entry Operator';
  email: string;
}

export interface UserForm extends User {
  password: string;
  position: string;
  ssn: string;
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
  PCP: PhysicianType;
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
  Patient: string;
  PrepNurse: string;
  Physician: PhysicianType;
  Start: string;
  ExaminationRoom: string;
  Medication: Medication;
  Dose: string;
}

export interface ProcedureType {
  Name: string;
  Code: string;
  Cost: string;
}

export interface UndergoesType {
  Procedure: ProcedureType;
  Patient: string;
  AssistingNurse: string | null;
  Physician: PhysicianType;
  Date: string;
  Result: string;
  Stay: string;
  Artifact: string;
}

export type SchedulerFormType = {
  patient: number;
  physician: number;
  datetime: string;
  procedure: number;
};
