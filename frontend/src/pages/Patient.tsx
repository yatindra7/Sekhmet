import { useEffect, useMemo, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Column } from 'react-table';
import Table from '../components/Table';
import { PatientType } from '../types';
import fuzzysort from 'fuzzysort';
import { useNavigate } from 'react-router-dom';

function Patient() {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [patients, setPatients] = useState<PatientType[]>([]);

  useEffect(() => {
    setPatients([
      {
        ssn: 100000001,
        name: 'John Smith',
        address: '42 Foobar Lane',
        phone: '555-0256',
        insuranceID: 68476213,
        primaryCarePhysician: 'John Dorian',
      },
      {
        ssn: 100000002,
        name: 'Grace Ritchie',
        address: '37 Snafu Drive',
        phone: '555-0512',
        insuranceID: 36546321,
        primaryCarePhysician: 'Elliot Reid',
      },
    ]);
  }, []);

  const columns = useMemo<Column<PatientType>[]>(
    () => [
      {
        Header: 'SSN',
        accessor: 'ssn',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Primary Physician',
        accessor: 'primaryCarePhysician',
      },
    ],
    [],
  );

  const data: PatientType[] = useMemo(
    () => fuzzysort.go(query, patients, { key: 'name', all: true }).map((result) => result.obj),
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
