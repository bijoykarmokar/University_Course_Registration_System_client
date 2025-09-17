import { useForm } from "react-hook-form";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

const DepartmentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { _id: "", name: "" },
  });

  const onSubmit = async (data) => {
    try {
      // Send data to backend
      const res = await axiosSecure.post("/departments", data);

      // Check response
      if (res.data && res.data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "✅ Department added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Failed to add department!",
          text: res.data?.error || "Unknown error",
        });
      }
    } catch (err) {
      console.error("❌ Department error:", err);
      await Swal.fire({
        icon: "error",
        title: "Failed to save department",
        text: err.response?.data?.error || err.message || "Unknown error",
      });
    }
  };

  return (
    <div className="p-4 rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">Add New Department</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Department ID */}
        <div>
          <label className="block font-medium">Department ID</label>
          <input
            type="text"
            {...register("_id", { required: "Department ID is required" })}
            placeholder="e.g. CSE"
            className="w-full border px-3 py-2 rounded"
          />
          {errors._id && <p className="text-red-500">{errors._id.message}</p>}
        </div>

        {/* Department Name */}
        <div>
          <label className="block font-medium">Department Name</label>
          <input
            type="text"
            {...register("name", { required: "Department name is required" })}
            placeholder="Computer Science and Engineering"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
