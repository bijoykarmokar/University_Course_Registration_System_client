import { useForm } from "react-hook-form";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

const AdvisorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const advisor = {
      _id: data._id,
      name: data.name,
      email: data.email,
    };

    const res = await axiosSecure.post("/advisors", advisor);
    console.log("Backend info:", res.data);

    if (res.data.insertedId || res.data.ok) {
      Swal.fire({
        icon: "success",
        title: "✅ Advisor Added Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
    } else {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Could not add advisor",
      });
    }
  } catch (err) {
    console.error("❌ Advisor add error:", err);

    if (err.response?.status === 409) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Advisor already exists!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "❌ Failed to add advisor. Try again!",
      });
    }
  }
};


  return (
    <div className="p-4 rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">Add New Advisor</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Advisor ID */}
        <div>
          <label className="block font-medium">Advisor ID</label>
          <input
            type="text"
            {...register("_id", { required: "Advisor ID is required" })}
            placeholder="Advisor Id"
            className="w-full border px-3 py-2 rounded"
          />
          {errors._id && <p className="text-red-500">{errors._id.message}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Advisor name"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="karim@univ.edu"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Advisor
        </button>
      </form>
    </div>
  );
};

export default AdvisorForm;
