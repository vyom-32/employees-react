import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../service/axios";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/statistics").then((response) => {
      setStatistics(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Dashboard</h2>
      {statistics !== null && (
        <div className="flex flex-wrap gap-4 justify-center">
          <div className=" p-4 border rounded-lg bg-slate-100 shadow">
            <h2 className="text-lg font-bold mb-2 text-center underline">
              Salary Range Wise Employee Count
            </h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Salary Range</th>
                  <th className="px-4 py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(statistics.rangeWiseCount).map((key) => (
                  <tr key={key}>
                    <td className="px-4 py-2">{key}</td>
                    <td className="px-4 py-2">
                      {statistics.rangeWiseCount[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" p-4 border rounded-lg bg-slate-100 shadow">
            <h2 className="text-lg font-bold mb-2 text-center underline">
              Department Wise Highest Salary
            </h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Highest Salary</th>
                </tr>
              </thead>
              <tbody>
                {statistics.departmentWiseHighestSalary.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.department}</td>
                    <td className="px-4 py-2">{item.highest_salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" p-4 border rounded-lg bg-slate-100 shadow">
            <h2 className="text-lg font-bold mb-2 text-center underline">
              Department Wise Youngest Employee
            </h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                </tr>
              </thead>
              <tbody>
                {statistics.departmentWiseYougestEmployees.map(
                  (item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.department_name}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.age}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/employee-list")}
          className="mt-4  px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go to Employee List
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
