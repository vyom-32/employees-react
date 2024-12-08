import { useForm } from "react-hook-form";
import { api } from "../../service/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm"; // The form component

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }

  const getEmployeeData = async () => {
    const response = await api.get(`/employee-details/${id}`);
    return response.data;
  };

  const { data: employeeDetails, error: employeeDetailsError } = useQuery(
    ["employeeDetails", id],
    getEmployeeData
  );

  const { register, handleSubmit, reset, control } = useForm({
    employeeDetails,
  });

  const onSubmitForm = (data) => {
    const formData = { ...data };
    if (photo) formData.photo = photo;

    api
      .post("/update-employee", formData)
      .then(() => {
        alert("Employee updated successfully");
        navigate("/");
      })
      .catch((e) => alert(e));
  };

  return (
    <EmployeeForm
      initialValues={employeeDetails}
      onSubmitForm={onSubmitForm}
      isEditForm={true}
    />
  );
};

export default EmployeeEdit;
