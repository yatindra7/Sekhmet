import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { PatientType } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function AddPatient() {
  const navigate = useNavigate();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = (data: PatientType) => {
    setIsSubmitLoading(true);
    console.log(data);
    setIsSubmitLoading(false);
    navigate('/patient');
  };

  const { handleSubmit, handleChange, data, errors } = useForm<PatientType>({
    validations: {
      ssn: {
        required: {
          value: true,
          message: 'Please input the social security number of patient.',
        },
        custom: {
          isValid: (value) => value !== undefined && value.length === 9,
          message: 'The SSN needs to be of 9 digits',
        },
      },
      name: {
        required: {
          value: true,
          message: 'Please input the name of the patient.',
        },
      },
      address: {
        required: {
          value: true,
          message: 'Please input the address of the patient.',
        },
      },
      phone: {
        required: {
          value: true,
          message: 'Please input the phone number of the patient.',
        },
      },
      insuranceID: {
        required: {
          value: true,
          message: 'Please input the insurance ID of the patient.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  return (
    <div className="add-patient">
      <div className="title">New Patient Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Social Security</div>
            <input id="ssn" type="number" value={data.ssn} onChange={handleChange('ssn')} />
            {errors.ssn && <div className="error">{errors.ssn}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Name</div>
            <input id="name" type="text" value={data.name} onChange={handleChange('name')} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Address</div>
            <input id="address" type="text" value={data.address} onChange={handleChange('address')} />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Phone Number</div>
            <input id="phone" type="tel" value={data.phone} onChange={handleChange('phone')} />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Insurance ID</div>
            <input id="insurance" type="number" value={data.insuranceID} onChange={handleChange('insuranceID')} />
            {errors.insuranceID && <div className="error">{errors.insuranceID}</div>}
          </div>
        </div>
        <button className="submit" disabled={isSubmitLoading} type="submit">
          Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
