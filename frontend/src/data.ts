import { AppointmentType, ProcedureType, Medication, NurseType, PatientType, PhysicianType, User } from './types';

export const BACKEND_URL =
  process.env.NODE_ENV === 'production' ? 'https://sekhmet.chiragghosh.dev' : 'http://localhost:5000';

export const Users: User[] = [];

export const Patients: PatientType[] = [];

export const Physicians: PhysicianType[] = [];

export const Nurses: NurseType[] = [];

export const Medications: Medication[] = [];

export const Appointments: AppointmentType[] = [];

export const Procedures: ProcedureType[] = [];
