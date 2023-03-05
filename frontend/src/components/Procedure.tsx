import { ProcedureType } from '../types';
import { RiHotelBedFill, RiStethoscopeFill } from 'react-icons/ri';
import { TbNurse } from 'react-icons/tb';
import { GiMedicines } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';
import { BsCalendarDateFill } from 'react-icons/bs';
import { getDateTimeStringFromISOString } from '../helpers';

function Procedure(props: { data: ProcedureType }) {
  return (
    <div className="procedure-details">
      <div className="info date">
        <BsCalendarDateFill size={25} />
        {getDateTimeStringFromISOString(props.data.date.toISOString())}
      </div>
      <div className="info meds">
        <GiMedicines size={25} />
        {props.data.name}
      </div>
      <div className="row">
        <div className="info pat">
          <RiHotelBedFill size={25} />
          {props.data.patient.name}
        </div>
        <div className="info cost">
          <MdAttachMoney size={25} />
          {props.data.cost}
        </div>
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
    </div>
  );
}

export default Procedure;
