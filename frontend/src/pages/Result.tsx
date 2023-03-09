import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import FileSelector from '../components/FileSelector';
import { BACKEND_URL } from '../data';
import { getFormData, handleAxiosError } from '../helpers';
import { useForm } from '../hooks/useForm';
import { UndergoesType } from '../types';

function Result() {
  const navigate = useNavigate();
  const params = useParams();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [procedure, setProcedure] = useState<UndergoesType>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const data = localStorage.getItem('procedureDetails');
    if (data) setProcedure(JSON.parse(data));
  }, []);

  const onSubmit = (data: { file: boolean; result: string }) => {
    setIsSubmitLoading(true);
    const temp = {
      result: data.result,
      patient: procedure?.Patient,
      date: procedure?.Date,
      stay: procedure?.Stay,
    };
    const formdata = getFormData(temp);
    if (file) formdata.append('file', file);

    axios
      .post(`${BACKEND_URL}/procedure/${procedure?.Procedure.Code}`, formdata)
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

  const { handleSubmit, changeValue, handleChange, data, errors } = useForm<{ file: boolean; result: string }>({
    validations: {
      file: {
        required: {
          value: true,
          message: 'Please select a medication.',
        },
        custom: {
          isValid: (value) => value !== undefined && value !== 'false',
          message: 'Please select a medication.',
        },
      },
      result: {
        required: {
          value: true,
          message: 'Please write a result.',
        },
      },
    },
    onSubmit: () => onSubmit(data),
  });

  const fileSelectHandler = (file: FileList) => {
    changeValue('file')(true);
    setFile(file[0]);
  };

  const onClear = () => {
    setFile(undefined);
    changeValue('file')(false);
  };

  return (
    <div className="result">
      <form onSubmit={handleSubmit}>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Report file</div>
            <div className="file-uploader">
              {!data.file ? (
                <FileSelector allowMultiple={false} mimeType="application/pdf" fileUploadHandler={fileSelectHandler} />
              ) : (
                <div className="file-preview">
                  <div className="file-name">{file?.name}</div>
                  <button type="button" onClick={onClear}>
                    <AiOutlineClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="item-group">
          <div className="form-item form-item-long required">
            <div className="label">Result</div>
            <input id="dose" type="text" value={data.result} onChange={handleChange('result')} />
            {errors.result && <div className="error">{errors.result}</div>}
          </div>
        </div>
        <button className="submit" disabled={isSubmitLoading} type="submit">
          Submit {isSubmitLoading && <AiOutlineLoading size={15} />}
        </button>
      </form>
    </div>
  );
}

export default Result;
