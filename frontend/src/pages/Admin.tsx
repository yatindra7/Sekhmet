import fuzzysort from 'fuzzysort';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { User } from '../types';
import { Users as UsersData } from '../data';
import { BiSearch } from 'react-icons/bi';
import Table from '../components/Table';

function Admin() {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(UsersData);
  }, []);

  const columns = useMemo<Column<User>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    [],
  );

  const data: User[] = useMemo(
    () => fuzzysort.go(query, users, { keys: ['name', 'email', 'role'], all: true }).map((result) => result.obj),
    [users, query],
  );

  return (
    <div className="patient">
      <div className="top">
        <div className="search">
          <BiSearch size={20} className="search-icon" />
          <input
            id="user-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here to search users..."
          />
        </div>
        <button type="button" className="add-btn" onClick={() => navigate('/admin/new')}>
          Add +
        </button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Admin;
