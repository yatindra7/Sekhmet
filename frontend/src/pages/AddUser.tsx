import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { UserForm } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getFormData, handleAxiosError } from '../helpers';
import axios from 'axios';
import { BACKEND_URL } from '../data';
import toast from 'react-hot-toast';

const userModes = ['Doctor', 'Front Desk Operator', 'Data Entry Operator', 'Admin'];

function AddUser() {
  const navigate = useNavigate();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = (data: UserForm) => {
    setIsSubmitLoading(true);

    const formdata = getFormData(data);
    axios
      .post(`${BACKEND_URL}/user`, formdata)
      .then(() => {
        toast.success('New user created!');
        setIsSubmitLoading(false);
        navigate('/admin');
      })
      .catch((error) => {
        handleAxiosError(error);
        setIsSubmitLoading(false);
      });
  };

  const { handleSubmit, handleChange, changeValue, data, errors } = useForm<UserForm>({
    validations: {
      name: {
        required: {
          value: true,
          message: 'Please input the name of the user.',
        },
      },
      email: {
        required: {
          value: true,
          message: 'Please input the email id of the user.',
        },
      },
      role: {
        required: {
          value: true,
          message: 'Please select a role for the user.',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Please input the password of the user.',
        },
      },
      position: {
        required: {
          value: false,
          message: 'Please input the position of the user.',
        },
      },
      ssn: {
        required: {
          value: false,
          message: 'Please input the ssn of the user.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  return (
    <div className="add-patient">
      <div className="title">New User Registration</div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Name</div>
            <input id="name" type="text" value={data.name} onChange={handleChange('name')} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Email</div>
            <input id="new-email" type="email" value={data.email} onChange={handleChange('email')} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Role</div>
            <Select
              options={userModes.map((mode) => {
                return { value: mode, label: mode };
              })}
              onChange={(selectedRole) => changeValue('role')(selectedRole?.value)}
              classNamePrefix="custom-select"
            />
            {errors.role && <div className="error">{errors.role}</div>}
          </div>
        </div>
        {data.role === 'Doctor' && (
          <div className="item-group">
            <div className="form-item required">
              <div className="label">Position</div>
              <input id="position" type="text" value={data.position} onChange={handleChange('position')} />
              {errors.position && <div className="error">{errors.position}</div>}
            </div>
            <div className="form-item required">
              <div className="label">SSN</div>
              <input id="ssn" type="ssn" value={data.ssn} onChange={handleChange('ssn')} />
              {errors.ssn && <div className="error">{errors.ssn}</div>}
            </div>
          </div>
        )}
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Password</div>
            <input id="new-password" type="password" value={data.password} onChange={handleChange('password')} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
        </div>
        <button className="submit" disabled={isSubmitLoading} type="submit">
          Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
