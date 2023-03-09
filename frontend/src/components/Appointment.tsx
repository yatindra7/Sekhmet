import { getDateTimeStringFromISOString } from '../helpers';
import { AppointmentType } from '../types';
import { BsCalendarDateFill } from 'react-icons/bs';
import { RiHotelBedFill, RiStethoscopeFill } from 'react-icons/ri';
import { TbNurse } from 'react-icons/tb';
import { GiDoor, GiMedicines } from 'react-icons/gi';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function Appointment(props: { data: AppointmentType }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="appointment-details">
      <div className="info date">
        <BsCalendarDateFill size={25} />
        {getDateTimeStringFromISOString(props.data.Start)}
      </div>
      <div className="info pat">
        <RiHotelBedFill size={25} />
        {props.data.Patient}
      </div>
      <div className="row">
        <div className="info doc">
          <RiStethoscopeFill size={25} />
          {props.data.Physician.Name} ({props.data.Physician.Position})
        </div>
        {props.data.PrepNurse && (
          <div className="info doc">
            <TbNurse size={25} />
            {props.data.PrepNurse}
          </div>
        )}
      </div>
      <div className="row">
        <div className="info meds">
          <GiMedicines size={25} />
          {props.data.Medication.Name || user?.role !== 'Doctor' ? (
            <>
              {props.data.Medication.Name} ({props.data.Medication.Dose})
            </>
          ) : (
            <button
              className="medicate-btn"
              type="button"
              onClick={() => navigate(`medicate/${props.data.AppointmentID}`)}
            >
              Prescribe
            </button>
          )}
        </div>
        <div className="info room">
          <GiDoor size={25} />
          {props.data.ExaminationRoom}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
