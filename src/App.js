import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeGenderFilter = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users?.filter((user) => {
    const name = user.name?.toLowerCase();
    const username = user.username?.toLowerCase();
    const searchTermLower = searchTerm?.toLowerCase();
    const gender = user.gender?.toLowerCase();
    return (
      (name.includes(searchTermLower) || username.includes(searchTermLower)) &&
      (genderFilter === "all" || genderFilter === gender)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name {renderSortIcon("name")}
          </th>
          <th onClick={() => handleSort("username")}>
            Username {renderSortIcon("username")}
          </th>
          <th onClick={() => handleSort("email")}>
            Email {renderSortIcon("email")}
          </th>
          <th onClick={() => handleSort("phone")}>
            Phone {renderSortIcon("phone")}
          </th>
          <th onClick={() => handleSort("website")}>
            Website {renderSortIcon("website")}
          </th>
        </tr>
      </thead>
    );
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const renderTableBody = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (filteredUsers?.length === 0) {
      return <div>No users found.</div>;
    }

    return (
      <tbody>
        {currentUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedUsers.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or username"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        <select
          className="form-control"
          value={genderFilter}
          onChange={handleChangeGenderFilter}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className="btn btn-primary" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
      <table className="table">
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {renderPagination()}
    </div>
  );
}

export default App;
