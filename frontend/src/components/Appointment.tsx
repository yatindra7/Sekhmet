import { getDateTimeStringFromISOString } from '../helpers';
import { AppointmentType } from '../types';
import { BsCalendarDateFill } from 'react-icons/bs';
import { RiHotelBedFill, RiStethoscopeFill } from 'react-icons/ri';
import { TbNurse } from 'react-icons/tb';
import { GiDoor, GiMedicines } from 'react-icons/gi';

function Appointment(props: { data: AppointmentType }) {
  return (
    <div className="appointment-details">
      <div className="info date">
        <BsCalendarDateFill size={25} />
        {getDateTimeStringFromISOString(props.data.start.toISOString())} -{' '}
        {getDateTimeStringFromISOString(props.data.end.toISOString())}
      </div>
      <div className="info pat">
        <RiHotelBedFill size={25} />
        {props.data.patient.name}
      </div>
      <div className="row">
        <div className="info doc">
          <RiStethoscopeFill size={25} />
          {props.data.physician.name} ({props.data.physician.position})
        </div>
        {props.data.prepNurse && (
          <div className="info doc">
            <TbNurse size={25} />
            {props.data.prepNurse.name} ({props.data.prepNurse.position})
          </div>
        )}
      </div>
      <div className="row">
        <div className="info meds">
          <GiMedicines size={25} />
          {props.data.medication.name} ({props.data.dose})
        </div>
        <div className="info room">
          <GiDoor size={25} />
          {props.data.examinationRoom}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
