import { useEffect, useRef, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { PatientType, PhysicianType } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getFormData, handleAxiosError } from '../helpers';
import axios from 'axios';
import { BACKEND_URL } from '../data';
import Select from 'react-select';
import { toast } from 'react-hot-toast';

function AddPatient() {
  const navigate = useNavigate();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [physicians, setPhysicians] = useState<PhysicianType[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/physician`)
      .then((response) => setPhysicians(response.data.physicians))
      .catch((error) => handleAxiosError(error));
  }, []);

  const onSubmit = (data: PatientType) => {
    setIsSubmitLoading(true);

    const formdata = getFormData(data);
    axios
      .post(`${BACKEND_URL}/patient`, formdata)
      .then((response) => {
        toast.success('New patient registered');
        setIsSubmitLoading(false);
        navigate('/patient');
      })
      .catch((error) => {
        handleAxiosError(error);
        setIsSubmitLoading(false);
      });
  };

  const { handleSubmit, handleChange, changeValue, data, errors } = useForm<PatientType>({
    validations: {
      SSN: {
        required: {
          value: true,
          message: 'Please input the social security number of patient.',
        },
        custom: {
          isValid: (value) => value !== undefined && value.length === 9,
          message: 'The SSN needs to be of 9 digits',
        },
      },
      Name: {
        required: {
          value: true,
          message: 'Please input the name of the patient.',
        },
      },
      Address: {
        required: {
          value: true,
          message: 'Please input the address of the patient.',
        },
      },
      Phone: {
        required: {
          value: true,
          message: 'Please input the phone number of the patient.',
        },
      },
      InsuranceID: {
        required: {
          value: true,
          message: 'Please input the insurance ID of the patient.',
        },
      },
      Age: {
        required: {
          value: true,
          message: 'Please input the age of the patient.',
        },
      },
      Gender: {
        required: {
          value: true,
          message: 'Please input the gender of the patient.',
        },
      },
      PCP: {
        required: {
          value: true,
          message: 'Please select a PCP for the patient.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  const genderInputRef = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const handleGenderChange = (index: number) => {
    if (genderInputRef[index].current !== null) genderInputRef[index].current?.click();
  };

  return (
    <div className="add-patient">
      <div className="title">New Patient Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Social Security</div>
            <input id="ssn" type="number" value={data.SSN} onChange={handleChange('SSN')} />
            {errors.SSN && <div className="error">{errors.SSN}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Name</div>
            <input id="name" type="text" value={data.Name} onChange={handleChange('Name')} />
            {errors.Name && <div className="error">{errors.Name}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Address</div>
            <input id="address" type="text" value={data.Address} onChange={handleChange('Address')} />
            {errors.Address && <div className="error">{errors.Address}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Phone Number</div>
            <input id="phone" type="tel" value={data.Phone} onChange={handleChange('Phone')} />
            {errors.Phone && <div className="error">{errors.Phone}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Insurance ID</div>
            <input id="insurance" type="number" value={data.InsuranceID} onChange={handleChange('InsuranceID')} />
            {errors.InsuranceID && <div className="error">{errors.InsuranceID}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Age</div>
            <input id="age" type="number" value={data.Age} onChange={handleChange('Age')} />
            {errors.Age && <div className="error">{errors.Age}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Gender</div>
            <div className="radio-grp">
              <button
                type="button"
                title="male"
                data-checked={data.Gender === 'Male'}
                onClick={() => handleGenderChange(0)}
              >
                <input
                  ref={genderInputRef[0]}
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  checked={data.Gender === 'Male'}
                  onChangeCapture={handleChange('Gender')}
                />{' '}
                Male
              </button>
              <button
                type="button"
                title="female"
                data-checked={data.Gender === 'Female'}
                onClick={() => handleGenderChange(1)}
              >
                <input
                  ref={genderInputRef[1]}
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                  checked={data.Gender === 'Female'}
                  onChangeCapture={handleChange('Gender')}
                />{' '}
                Female
              </button>
            </div>
            {errors.Gender && <div className="error">{errors.Gender}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Physician</div>
            <Select
              options={physicians.map((physician) => {
                return { value: physician.EmployeeID, label: physician.Name };
              })}
              onChange={(selectedPhysician) => changeValue('PCP')(selectedPhysician?.value)}
              classNamePrefix="custom-select"
            />
            {errors.PCP && <div className="error">{errors.PCP}</div>}
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
