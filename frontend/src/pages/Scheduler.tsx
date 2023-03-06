import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { SchedulerFormType } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import Select from 'react-select';
import { Physicians, Procedures } from '../data';
import CalendarComponent from 'react-calendar';

function Scheduler() {
  const params = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState<string>('test');
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    if (params.type) setType(params.type);
  }, [params.type]);

  const onSubmit = (data: SchedulerFormType) => {
    setIsSubmitLoading(true);
    console.log(data);
    setIsSubmitLoading(false);
    navigate(`/patient/${params.ssn}`);
  };

  const { handleSubmit, handleChange, changeValue, data, errors } = useForm<SchedulerFormType>({
    validations: {},
    onSubmit: () => onSubmit(data),
  });

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
      </div>
    </div>
  );
}

export default Scheduler;
