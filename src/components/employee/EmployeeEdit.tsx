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

  const {
    data: employeeDetails,
    error: employeeDetailsError,
    isLoading,
  } = useQuery(["employeeDetails", id], getEmployeeData);

  const onSubmitForm = (data) => {
    const formData = { ...data };

    api
      .post("/update-employee", formData)
      .then(() => {
        alert("Employee updated successfully");
        navigate("/employee-list");
      })
      .catch((e) => alert(e));
  };

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : (
    <EmployeeForm
      initialValues={employeeDetails}
      onSubmitForm={onSubmitForm}
      isEditForm={true}
    />
  );
};

export default EmployeeEdit;
