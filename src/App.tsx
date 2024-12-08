import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeAdd from "./components/employee/EmployeeAdd";
import EmployeeEdit from "./components/employee/EmployeeEdit";
import Dashboard from "./components/Dashboard";

function App() {
  const navList = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Employee List",
      path: "/employee-list",
    },
  ];
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <ul className="navbar-nav flex justify-center gap-4 mt-3">
              {navList.map((item) => (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    className={({ isActive }) =>
                      (isActive
                        ? "bg-slate-600 text-white"
                        : "bg-gray-200 text-black") +
                      " py-2 px-4 rounded shadow-md"
                    }
                    to={item.path}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-employee" element={<EmployeeAdd />} />
          <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
