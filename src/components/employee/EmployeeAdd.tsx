import { api } from "../../service/axios";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm"; // The form component

const EmployeeAdd = () => {
  const navigate = useNavigate();

  const defaultValues = {
    department_id: "",
    name: "",
    dob: "",
    phone: "",
    email: "",
    salary: "",
    status: "Active",
  };

  const onSubmitForm = (data) => {
    const formData = { ...data };

    api
      .post("/create-employee", formData)
      .then(() => {
        alert("Employee created successfully");
        navigate("/employee-list");
      })
      .catch((e) => alert(e));
  };

  return (
    <EmployeeForm
      initialValues={defaultValues}
      onSubmitForm={onSubmitForm}
      isEditForm={false}
    />
  );
};

export default EmployeeAdd;
