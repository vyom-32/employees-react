import { useEffect, useState } from "react";
import { api } from "../../service/axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeData();
  }, [limit]);

  const initializeData = async () => {
    setLoading(true);
    await getCount();
    await getEmployees(skip);
  };

  const getPreviousPage = async () => {
    if (skip > 0) {
      setSkip((previous) => previous - limit);
      await getEmployees(skip - limit);
    }
  };

  const getNextPage = async () => {
    if (skip + limit < count) {
      setSkip((previous) => previous + limit);
      await getEmployees(skip + limit);
    }
  };

  const getEmployees = async (newSkip: number) => {
    setLoading(true);
    await api
      .post("/employee-list", { skip: newSkip, limit })
      .then((response) => {
        console.log("employees Res....", response.data);
        setEmployees(response.data.data);
      });
    setLoading(false);
  };

  const getCount = async () => {
    await api.post("/employee-count").then((response) => {
      setCount(response.data);
    });
  };

  const getImageUrl = (url: string) => {
    if (url && url.length) {
      return import.meta.env.VITE_IMAGE_BASE_URL + url;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full pt-4">
      <div className="px-3 mx-auto">
        <div className="flex justify-end">
          <Link to="/add-employee">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Employee
            </button>
          </Link>
        </div>
        <div className="py-3" />

        <table className="border-collapse border border-slate-400 shadow">
          <thead>
            <tr>
              <th className="border border-slate-400 px-4 py-2">Photo</th>
              <th className="border border-slate-400 px-4 py-2">Name</th>
              <th className="border border-slate-400 px-4 py-2">Department</th>
              <th className="border border-slate-400 px-4 py-2">Email</th>
              <th className="border border-slate-400 px-4 py-2">Phone</th>
              <th className="border border-slate-400 px-4 py-2">DOB</th>
              <th className="border border-slate-400 px-4 py-2">Salary</th>
              <th className="border border-slate-400 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="border border-slate-400 px-4 py-2">
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {emp.photo && emp.photo.length ? (
                      <img
                        src={getImageUrl(emp.photo)}
                        alt="Employee"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">
                        {emp.name[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.name}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.department_name}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.email}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.phone}
                </td>
                <td className="border border-slate-400 px-4 py-2">{emp.dob}</td>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.salary}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  <Link to={`/edit-employee/${emp.id}`}>
                    <i className="fa fa-edit text-blue-500 hover:text-blue-700" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {count > 0 && (
          <div className="flex items-center justify-end mb-3 mt-2">
            <div className="mr-7">
              <label htmlFor="limit" className="pr-2">
                Items Per Page
              </label>
              <select
                value={limit}
                className="bg-slate-100 border border-gray-800  py-1 px-4 rounded"
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            {!loading && (
              <div className="mr-7">
                Records : {skip + 1}-{Math.min(skip + limit, count)}/{count}
              </div>
            )}
            <div className="flex">
              {skip > 0 && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={getPreviousPage}
                >
                  {"<"} previous
                </button>
              )}
              {skip + limit < count && (
                <button
                  className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={getNextPage}
                >
                  next {">"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
