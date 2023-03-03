import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientType } from '../types';
import { AiFillHome } from 'react-icons/ai';
import { RiStethoscopeFill } from 'react-icons/ri';

const data: PatientType[] = [
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

function PatientDetails() {
  const params = useParams();

  const [patientData, setPatientData] = useState<PatientType>();

  useEffect(() => {
    data.forEach((patient) => {
      if (params.ssn && patient.ssn === parseInt(params.ssn)) setPatientData(patient);
    });
  }, [params]);

  if (!patientData) return null;

  return (
    <div className="patient-details">
      <div className="panel">
        <div className="top">
          <img src={`https://randomuser.me/api/portraits/men/${patientData.ssn % 100}.jpg`} alt={patientData.name} />
          <div className="meta">
            <div className="name">{patientData.name}</div>
            <div className="secondary">Male, 24 years old</div>
            <div className="doc">
              <RiStethoscopeFill size={25} />
              {patientData.primaryCarePhysician}
            </div>
            <div className="address">
              <AiFillHome size={25} /> {patientData.address}
            </div>
          </div>
          <div className="contacts">
            <div>
              <strong>Phone: </strong>
              {patientData.phone}
            </div>
            <div>
              <strong>SSN: </strong>
              {patientData.ssn}
            </div>
            <div>
              <strong>Insurance: </strong>
              {patientData.insuranceID}
            </div>
          </div>
        </div>
        <div className="tests">
          <div className="title">Procedures and tests</div>
        </div>
      </div>
      <div className="panel appointment">
        <div className="title">Appointments</div>
      </div>
    </div>
  );
}

export default PatientDetails;
