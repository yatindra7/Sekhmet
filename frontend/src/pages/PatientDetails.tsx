import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppointmentType, PatientType, ProcedureType, UndergoesType } from '../types';
import { AiFillHome } from 'react-icons/ai';
import { RiStethoscopeFill } from 'react-icons/ri';
import { Appointments, Procedures, BACKEND_URL } from '../data';
import Appointment from '../components/Appointment';
import Procedure from '../components/Procedure';
import axios from 'axios';

function PatientDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState<PatientType>();
  const [appointmentData, setAppointmentData] = useState<AppointmentType[]>([]);
  const [procedureData, setProcedureData] = useState<UndergoesType[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/patient/${params.ssn}`).then((response) => {
      const temp: PatientType = { ...response.data.patient[0] };
      temp.PCP = { ...response.data.patient[1] };
      setPatientData(temp);
      setAppointmentData(
        response.data.appointments.map((data: any) => {
          const temp: AppointmentType = { ...data[0] };
          temp.Physician = { ...data[1] };
          temp.Medication = { ...data[2] };
          return temp;
        }),
      );
      setProcedureData(
        response.data.undergoes.map((data: any) => {
          const temp: UndergoesType = { ...data[0] };
          temp.Physician = { ...data[1] };
          temp.Procedure = { ...data[2] };
          return temp;
        }),
      );
    });
  }, [params]);

  if (!patientData) return null;

  return (
    <div className="patient-details">
      <div className="panel">
        <div className="top">
          <img
            src={`https://randomuser.me/api/portraits/${patientData.Gender === 'Male' ? 'men' : 'women'}/${
              patientData.SSN % 100
            }.jpg`}
            alt={patientData.Name}
          />
          <div className="meta">
            <div className="name">{patientData.Name}</div>
            <div className="secondary">
              {patientData.Gender}, {patientData.Age} years old
            </div>
            <div className="doc">
              <RiStethoscopeFill size={25} />
              {patientData.PCP.Name}
            </div>
            <div className="address">
              <AiFillHome size={25} /> {patientData.Address}
            </div>
          </div>
          <div className="contacts">
            <div>
              <strong>Phone: </strong>
              {patientData.Phone}
            </div>
            <div>
              <strong>SSN: </strong>
              {patientData.SSN}
            </div>
            <div>
              <strong>Insurance: </strong>
              {patientData.InsuranceID}
            </div>
          </div>
        </div>
        <div className="tests">
          <div className="top-bar">
            <div className="title">Procedures and tests</div>
            <button type="button" className="add-btn" onClick={() => navigate('schedule/test')}>
              Add +
            </button>
          </div>
          <div className="list">
            {procedureData.map((procedure) => (
              <Procedure key={procedure.Date} data={procedure} />
            ))}
          </div>
        </div>
      </div>
      <div className="panel appointment">
        <div className="top-bar">
          <div className="title">Appointments</div>
          <button type="button" className="add-btn" onClick={() => navigate('schedule/appointment')}>
            Add +
          </button>
        </div>
        <div className="list">
          {appointmentData.map((appointment) => (
            <Appointment key={appointment.AppointmentID} data={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
