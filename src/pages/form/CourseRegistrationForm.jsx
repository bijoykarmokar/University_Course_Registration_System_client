import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import axiosSecure from "../../services/axiosSecure";


const CoursesForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: "",
      name: "",
      credit: "",
      department:"",
      offered_in: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "offered_in",
  });

  const onSubmit = async (data) => {
    try {
      const formatted = {
        _id: data._id,
        name: data.name,
        credit: Number(data.credit),
        department:data.department,
        offered_in: data.offered_in.map((d) => d.value).filter(Boolean),
      };

      const res = await axiosSecure.post("/courses", formatted);
      // console.log("Backend response:", res.data);

      if (res.data.ok && res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Course added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "⚠️ Course already exists",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("❌ Error creating course:", err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "❌ Failed to create course. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="p-4 rounded-md shadow-lg max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-3">Add New Course</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Course ID */}
        <div>
          <label className="block font-medium">Course Code</label>
          <input
            {...register("_id", { required: "Course ID is required" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Course Code"
          />
          {errors._id && (
            <p className="text-red-500">{errors._id.message}</p>
          )}
        </div>

        {/* Course Name */}
        <div>
          <label className="block font-medium">Course Name</label>
          <input
            {...register("name", { required: "Course Name is required" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Course name"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Credit */}
        <div>
          <label className="block font-medium">Credit</label>
          <input
            type="number"
            {...register("credit", {
              required: "Credit is required",
              min: { value: 1, message: "Credit must be at least 1" },
            })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Credit"
          />
          {errors.credit && (
            <p className="text-red-500">{errors.credit.message}</p>
          )}
        </div>
        {/* departments */}
        <div>
          <label className="block font-medium">Department</label>
          <input
            type="input"
            {...register("department", {
              required: "Department is required",
            })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Department"
          />
          {errors.department && (
            <p className="text-red-500">{errors.department.message}</p>
          )}
        </div>

        {/* Offered In */}
        <div>
          <label className="block font-medium">Offered In (Semesters)</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`offered_in.${index}.value`, {
                  required: "Semester is required",
                })}
                className="flex-1 border px-3 py-2 rounded"
                placeholder="Spring 2025"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Semester
          </button>
          {errors.offered_in && (
            <p className="text-red-500">At least one semester is required</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CoursesForm;
