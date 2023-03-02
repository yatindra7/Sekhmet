import { useState } from "react";
import { BiSearch } from 'react-icons/bi'

function Patient() {

  const [query, setQuery] = useState<string>("")

  return (
    <div className="patient">
      <div className="search">
        <BiSearch size={20} className="search-icon" />
        <input
          id="patient-query"
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type here to search patients..."
        />
      </div>
    </div>
  );
}
  
  export default Patient;
  