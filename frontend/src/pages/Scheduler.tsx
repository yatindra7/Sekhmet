import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { SchedulerFormType } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import Select from 'react-select';
import { Physicians, Procedures } from '../data';
import CalendarComponent from 'react-calendar';
import { getDateString } from '../helpers';

type TimeSlot = {
  start: string;
  end: string;
  isAvailable: boolean;
};

function Scheduler() {
  const params = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState<string>('test');
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number>(-1);

  useEffect(() => {
    if (params.type) setType(params.type);
  }, [params.type]);

  const onSubmit = (data: SchedulerFormType) => {
    setIsSubmitLoading(true);
    console.log(data);
    setIsSubmitLoading(false);
    navigate(`/patient/${params.ssn}`);
  };

  const { handleSubmit, changeValue, data, errors } = useForm<SchedulerFormType>({
    validations: {
      physician: {
        required: {
          value: true,
          message: 'Please select a physician.',
        },
      },
      procedure: {
        required: {
          value: type === 'test',
          message: 'Please select a procedure.',
        },
      },
      datetime: {
        required: {
          value: true,
          message: 'Please select a time slot.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  useEffect(() => {
    if (!data.physician) {
      setSlots([]);
      setSelectedSlot(-1);
    } else {
      const mySlots: TimeSlot[] = [
        { start: '10', end: '11', isAvailable: true },
        { start: '11', end: '12', isAvailable: true },
        { start: '12', end: '13', isAvailable: false },
        { start: '13', end: '14', isAvailable: true },
        { start: '14', end: '15', isAvailable: true },
        { start: '15', end: '16', isAvailable: true },
        { start: '16', end: '17', isAvailable: true },
        { start: '17', end: '18', isAvailable: true },
      ];
      setSlots(mySlots);
      setSelectedSlot(-1);
    }
  }, [data.physician, date]);

  const slotSelectHandler = (slot: TimeSlot, index: number, date: Date) => {
    setSelectedSlot(index);
    const datetime = getDateString(date) + 'T' + `${slot.start}:00:00.000Z`;
    changeValue('datetime')(datetime);
  };

  return (
    <div className="scheduler">
      <div className="panel">
        <form onSubmit={handleSubmit}>
          <div className="item-group">
            <div className="form-item form-item-long required">
              <div className="label">Physician</div>
              <Select
                options={Physicians.map((physician) => {
                  return { value: physician.employeeID, label: physician.name };
                })}
                onChange={(selectedPhysician) => changeValue('physician')(selectedPhysician?.value)}
                classNamePrefix="custom-select"
              />
              {errors.physician && <div className="error">{errors.physician}</div>}
            </div>
          </div>
          {type === 'test' && (
            <div className="item-group">
              <div className="form-item form-item-long required">
                <div className="label">Procedure/Test</div>
                <Select
                  options={Procedures.map((procedure) => {
                    return { value: procedure.procedureID, label: procedure.name };
                  })}
                  onChange={(selectedProcedure) => changeValue('procedure')(selectedProcedure?.value)}
                  classNamePrefix="custom-select"
                />
                {errors.procedure && <div className="error">{errors.procedure}</div>}
              </div>
            </div>
          )}
          <button className="submit" disabled={isSubmitLoading} type="submit">
            Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
          </button>
        </form>
      </div>
      <div className="panel">
        <CalendarComponent minDate={new Date()} value={date} onChange={(date: Date) => setDate(date)} />
        <div className="title">Please select an available slot below</div>
        <div className="slot-list">
          {slots.map((slot, index) => (
            <button
              key={slot.start}
              className="slot-btn"
              type="button"
              onClick={() => slotSelectHandler(slot, index, date)}
              data-active={index === selectedSlot}
              disabled={!slot.isAvailable}
            >
              {slot.start} - {slot.end} hours
            </button>
          ))}
        </div>
        {errors.datetime && <div className="error">{errors.datetime}</div>}
      </div>
    </div>
  );
}

export default Scheduler;
