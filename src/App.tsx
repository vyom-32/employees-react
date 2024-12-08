import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeForm from "./components/employee/EmployeeForm";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeAdd from "./components/employee/EmployeeAdd";
import EmployeeEdit from "./components/employee/EmployeeEdit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/employee-list" />} />
          <Route path="/add-employee" element={<EmployeeAdd />} />
          <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
