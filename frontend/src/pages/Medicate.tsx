import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../data';
import { getFormData, handleAxiosError } from '../helpers';
import { useForm } from '../hooks/useForm';
import { Medication } from '../types';
import Select from 'react-select';
import { AiOutlineLoading } from 'react-icons/ai';

function Medicate() {
  const params = useParams();
  const navigate = useNavigate();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/medication`)
      .then((response) => setMedications(response.data.medications))
      .catch((error) => handleAxiosError(error));
  }, []);

  const onSubmit = (data: { medication: number; dose: string }) => {
    setIsSubmitLoading(true);
    const formdata = getFormData(data);
    axios
      .post(`${BACKEND_URL}/appointment/${params.id}`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        setIsSubmitLoading(false);
        navigate(`/patient/${params.ssn}`);
      })
      .catch((error) => {
        handleAxiosError(error);
        setIsSubmitLoading(false);
      });
  };

  const { handleSubmit, changeValue, handleChange, data, errors } = useForm<{ medication: number; dose: string }>({
    validations: {
      medication: {
        required: {
          value: true,
          message: 'Please select a medication.',
        },
      },
      dose: {
        required: {
          value: true,
          message: 'Please select a dose.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  return (
    <div className="medicate">
      <form onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Medication</div>
            <Select
              options={medications.map((medication) => {
                return { value: medication.Code, label: `${medication.Name} (${medication.Brand})` };
              })}
              onChange={(selectedMedication) => changeValue('medication')(selectedMedication?.value)}
              classNamePrefix="custom-select"
            />
            {errors.medication && <div className="error">{errors.medication}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Dose</div>
            <input id="dose" type="text" value={data.dose} onChange={handleChange('dose')} />
            {errors.dose && <div className="error">{errors.dose}</div>}
          </div>
        </div>
        <button className="submit" disabled={isSubmitLoading} type="submit">
          Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
        </button>
      </form>
    </div>
  );
}

export default Medicate;
