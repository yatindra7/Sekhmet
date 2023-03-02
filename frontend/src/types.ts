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
