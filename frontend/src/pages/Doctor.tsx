import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppointmentType, PhysicianType, ProcedureType, UndergoesType } from '../types';
import { Appointments, Procedures, BACKEND_URL } from '../data';
import Appointment from '../components/Appointment';
import Procedure from '../components/Procedure';
import axios from 'axios';
import { handleAxiosError } from '../helpers';
import { useAuthContext } from '../hooks/useAuthContext';

function Doctor() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [physicianData, setPhysicianData] = useState<PhysicianType>();
  const [appointmentData, setAppointmentData] = useState<AppointmentType[]>([]);
  const [procedureData, setProcedureData] = useState<UndergoesType[]>([]);

  useEffect(() => {
    if (user?.role !== 'Doctor') navigate('/');

    axios.get(`${BACKEND_URL}/physician/${user?.id}`).then((response) => {
      const temp: PhysicianType = { ...response.data.physician };
      setPhysicianData(temp);
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

  if (!physicianData) return null;

  return (
    <div className="patient-details physician-details">
      <div className="panel">
        <div className="top">
          <div className="meta">
            <div className="name">{physicianData.Name}</div>
            <div className="secondary">{physicianData.Position}</div>
          </div>
          <div className="contacts">
            <div>
              <strong>Employee ID: </strong>
              {physicianData.EmployeeID}
            </div>
            <div>
              <strong>SSN: </strong>
              {physicianData.SSN}
            </div>
          </div>
        </div>
        <div className="tests">
          <div className="top-bar">
            <div className="title">Procedures and tests</div>
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

export default Doctor;
