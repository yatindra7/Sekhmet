import { useEffect, useMemo, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Column } from 'react-table';
import Table from '../components/Table';
import { PatientType } from '../types';
import fuzzysort from 'fuzzysort';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../data';
import { handleAxiosError } from '../helpers';

function Patient() {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [patients, setPatients] = useState<PatientType[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/patient`)
      .then((response) =>
        setPatients(
          response.data.patients.map((data: any) => {
            const temp: PatientType = { ...data[0] };
            temp.PCP = { ...data[1] };
            return temp;
          }),
        ),
      )
      .catch((error) => handleAxiosError(error));
  }, []);

  const columns = useMemo<Column<PatientType>[]>(
    () => [
      {
        Header: 'SSN',
        accessor: 'SSN',
        id: 'ssn',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Address',
        accessor: 'Address',
      },
      {
        Header: 'Phone',
        accessor: 'Phone',
      },
      {
        Header: 'Primary Physician',
        accessor: (data) => data.PCP.Name,
      },
      {
        Header: 'Action',
        accessor: 'SSN',
        id: 'action',
        Cell: (data) => (
          <button className="more-details-btn" onClick={() => navigate(`/patient/${data.row.original.SSN}`)}>
            More
          </button>
        ),
      },
    ],
    [],
  );

  const data: PatientType[] = useMemo(
    () => fuzzysort.go(query, patients, { key: 'Name', all: true }).map((result) => result.obj),
    [patients, query],
  );

  return (
    <div className="patient">
      <div className="top">
        <div className="search">
          <BiSearch size={20} className="search-icon" />
          <input
            id="patient-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here to search patients..."
          />
        </div>
        <button type="button" className="add-btn" onClick={() => navigate('/patient/new')}>
          Add +
        </button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Patient;
