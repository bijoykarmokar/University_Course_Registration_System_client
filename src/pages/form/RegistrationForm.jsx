import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      student_id: "",
      courses: [{ courseId: "" }],
      advisor_id: "",
      total_credit: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [students, setStudents] = useState([]);
  const [advisors, setAdvisors] = useState([]);

  // Fetch courses, students, advisors from backend
  useEffect(() => {
    const fetchData = async () => {
      const [courseRes, studentRes, advisorRes] = await Promise.all([
        axiosSecure.get("/courses"),
        axiosSecure.get("/students"),
        axiosSecure.get("/advisors"),
      ]);
      setCourseOptions(courseRes.data);
      setStudents(studentRes.data);
      setAdvisors(advisorRes.data);
    };
    fetchData();
  }, []);

  // Watch selected courses to calculate total credits
  const selectedCourses = watch("courses");
  const totalCredit = selectedCourses.reduce((acc, c) => {
    const found = courseOptions.find((co) => co._id === c.courseId);
    return found ? acc + found.credit : acc;
  }, 0);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const formatted = {
        student_id: data.student_id,
        courses: data.courses.map((c) => c.courseId).filter(Boolean),
        advisor_id: data.advisor_id,
        total_credit: totalCredit,
      };

      const res = await axiosSecure.post("/registrations", formatted);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registration completed!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to register. Try again!",
      });
    }
  };

  return (
    <div className="p-4 rounded-md shadow-lg max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-3">Register Courses</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Student */}
        <div>
          <label className="block font-medium">Student</label>
          <select
            {...register("student_id", { required: "Student is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s._id})
              </option>
            ))}
          </select>
          {errors.student_id && (
            <p className="text-red-500">{errors.student_id.message}</p>
          )}
        </div>

        {/* Courses */}
        <div>
          <label className="block font-medium">Courses</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <select
                {...register(`courses.${index}.courseId`, {
                  required: "Course is required",
                })}
                className="flex-1 border px-3 py-2 rounded"
              >
                <option value="">-- Select Course --</option>
                {courseOptions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c._id} - {c.name} ({c.credit} cr.)
                  </option>
                ))}
              </select>
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
            onClick={() => append({ courseId: "" })}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Course
          </button>
        </div>

        {/* Advisor */}
        <div>
          <label className="block font-medium">Advisor</label>
          <select
            {...register("advisor_id", { required: "Advisor is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Advisor --</option>
            {advisors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} ({a._id})
              </option>
            ))}
          </select>
          {errors.advisor_id && (
            <p className="text-red-500">{errors.advisor_id.message}</p>
          )}
        </div>

        {/* Total Credit */}
        <div>
          <label className="block font-medium">Total Credit</label>
          <input
            type="number"
            value={totalCredit}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
