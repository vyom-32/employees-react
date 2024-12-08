import { useEffect, useState } from "react";
import { api } from "../../service/axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="border border-slate-400 px-4 py-2">
                  {emp.photo}
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
              </tr>
            ))}
          </tbody>
        </table>
        {count > 0 && (
          <div className="flex items-center justify-end mb-3 mt-2">
            {!loading && (
              <div className="mr-2">
                {skip + 1}-{Math.min(skip + limit, count)}/{count}
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
