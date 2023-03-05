import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { User } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const userModes = ['Doctor', 'Front Desk Operator', 'Data Entry Operator', 'Admin'];

function AddUser() {
  const navigate = useNavigate();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onSubmit = (data: User) => {
    setIsSubmitLoading(true);
    console.log(data);
    setIsSubmitLoading(false);
    navigate('/admin');
  };

  const { handleSubmit, handleChange, changeValue, data, errors } = useForm<User>({
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
          message: 'Please input the email id of the patient.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  return (
    <div className="add-patient">
      <div className="title">New User Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item required">
            <div className="label">Name</div>
            <input id="name" type="text" value={data.name} onChange={handleChange('name')} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-item required">
            <div className="label">Email</div>
            <input id="email" type="email" value={data.email} onChange={handleChange('email')} />
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
        <button className="submit" disabled={isSubmitLoading} type="submit">
          Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
