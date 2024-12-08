import { useQuery } from "react-query";
import { api } from "../service/axios";

const DepartmentDropdown = ({ value, onChange }) => {
  const fetchDepartments = async () => {
    const response = await api.get("/department-list");
    return response.data;
  };

  const { data: departments, error } = useQuery(
    "departments",
    fetchDepartments
  );

  if (error) {
    alert("Error fetching departments");
    return null;
  }

  return (
    <select value={value} onChange={onChange} required>
      <option value="">Select Department</option>
      {departments?.map((dept) => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </select>
  );
};

export default DepartmentDropdown;
