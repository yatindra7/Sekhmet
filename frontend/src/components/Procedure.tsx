import { ProcedureType, UndergoesType } from '../types';
import { RiHotelBedFill, RiStethoscopeFill } from 'react-icons/ri';
import { TbNurse } from 'react-icons/tb';
import { GiMedicines } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';
import { BsCalendarDateFill } from 'react-icons/bs';
import { getDateTimeStringFromISOString } from '../helpers';

function Procedure(props: { data: UndergoesType }) {
  return (
    <div className="procedure-details">
      <div className="info date">
        <BsCalendarDateFill size={25} />
        {getDateTimeStringFromISOString(props.data.Date)}
      </div>
      <div className="info meds">
        <GiMedicines size={25} />
        {props.data.Procedure.Name}
      </div>
      <div className="row">
        <div className="info pat">
          <RiHotelBedFill size={25} />
          {props.data.Patient}
        </div>
        <div className="info cost">
          <MdAttachMoney size={25} />
          {props.data.Procedure.Cost}
        </div>
      </div>
      <div className="row">
        <div className="info doc">
          <RiStethoscopeFill size={25} />
          {props.data.Physician.Name}
        </div>
        {props.data.AssistingNurse && (
          <div className="info doc">
            <TbNurse size={25} />
            {props.data.AssistingNurse}
          </div>
        )}
      </div>
    </div>
  );
}

export default Procedure;
