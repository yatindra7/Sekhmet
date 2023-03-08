import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { LoginForm } from '../types';
import { AiOutlineLoading } from 'react-icons/ai';
import { useAuthContext } from '../hooks/useAuthContext';
import { getFormData, handleAxiosError } from '../helpers';
import axios from 'axios';
import { BACKEND_URL } from '../data';

function Login() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const { loginHandler } = useAuthContext();

  const onSubmit = (data: LoginForm) => {
    setIsSubmitLoading(true);

    const formdata = getFormData(data);
    axios
      .post(`${BACKEND_URL}/user/login`, formdata)
      .then((response) => {
        loginHandler(response.data.Authenticate);
        setIsSubmitLoading(false);
      })
      .catch((error) => {
        handleAxiosError(error);
        setIsSubmitLoading(false);
      });
  };

  const { handleSubmit, handleChange, data, errors } = useForm<LoginForm>({
    validations: {
      email: {
        required: {
          value: true,
          message: 'Please input the email.',
        },
      },
      password: {
        required: {
          value: true,
          message: 'Please input the password.',
        },
        custom: {
          isValid: (value) => value.length > 6,
          message: 'The password needs to be atleast 6 characters long',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  return (
    <div className="login">
      <div className="form-wrapper">
        <div className="top">
          <img src="/src/assets/logo.png" alt="sekhmet" />
          <div className="title">Sekhmet</div>
        </div>
        <div className="subtitle">Hi! Please enter your credentials to get access to the hospital of heavens.</div>
        <form onSubmit={handleSubmit}>
          <div className="item-group">
            <div className="form-item form-item-long required">
              <div className="label">Email</div>
              <input id="email" type="email" value={data.email} onChange={handleChange('email')} />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
          </div>
          <div className="item-group">
            <div className="form-item form-item-long required">
              <div className="label">Password</div>
              <input id="password" type="password" value={data.password} onChange={handleChange('password')} />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
          </div>
          <button className="submit" disabled={isSubmitLoading} type="submit">
            Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
