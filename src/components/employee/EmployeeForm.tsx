import { useForm } from "react-hook-form";
import DepartmentDropdown from "../DepartmentDropdown";
import FileInput from "../FileInput";
import { useState } from "react";

enum StatusEnum {
  Active = "Active",
  InActive = "InActive",
}

const EmployeeForm = ({ initialValues, onSubmitForm, isEditForm }) => {
  const [photo, setPhoto] = useState<string>();
  const { register, handleSubmit } = useForm({
    initialValues,
  });

  const submitForm = (data) => {
    const formData = { ...data };
    if (photo) {
      formData.photo = photo;
    }
    onSubmitForm(formData);
  };

  return (
    <div className="w-full md:w-[400px] mx-auto">
      <h2 className="text-center font-bold text-2xl py-3">
        {isEditForm ? "Edit Employee" : "Add new Employee"}
      </h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* Department Dropdown */}
        <div className="flex justify-between mb-2">
          <label>Department</label>
          <DepartmentDropdown register={register} />
        </div>

        {/* Other Form Fields */}
        <div className="flex justify-between mb-2">
          <label>Name</label>
          <input type="text" {...register("name")} required />
        </div>
        <div className="flex justify-between mb-2">
          <label>Date of Birth</label>
          <input type="date" {...register("dob")} required />
        </div>
        <div className="flex justify-between mb-2">
          <label>Phone</label>
          <input type="text" {...register("phone")} required />
        </div>
        <div className="flex justify-between mb-2">
          <label>Email</label>
          <input type="email" {...register("email")} required />
        </div>
        <div className="flex justify-between mb-2">
          <label>Salary</label>
          <input type="number" {...register("salary")} required />
        </div>
        <div className="flex justify-between mb-2">
          <label>Photo</label>
          <FileInput setFileUrl={(file) => setPhoto(file)} />
        </div>
        <div className="flex justify-between mb-2">
          <label>Status</label>
          <select {...register("status")}>
            <option value={StatusEnum.Active}>Active</option>
            <option value={StatusEnum.InActive}>InActive</option>
          </select>
        </div>
        <div className="flex justify-center mt-3 mb-7">
          <button
            type="submit"
            className="bg-green-600 text-white rounded py-2 px-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
