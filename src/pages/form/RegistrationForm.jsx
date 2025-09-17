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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [students, setStudents] = useState([]);
  const [advisors, setAdvisors] = useState([]);


  // Fetch options
  useEffect(() => {
    const fetchData = async () => {
      const [c, s, a] = await Promise.all([
        axiosSecure.get("/courses"),
        axiosSecure.get("/students"),
        axiosSecure.get("/advisors"),
      ]);
      setCourseOptions(c.data);
      setStudents(s.data);
      setAdvisors(a.data);
    };
    fetchData();
  }, []);

  // Watch courses
  const selectedCourses = watch("courses");
  const totalCredit = selectedCourses.reduce((sum, c) => {
    const found = courseOptions.find((co) => co._id === c.courseId);
    return found ? sum + found.credit : sum;
  }, 0);

  // Submit
 const onSubmit = async (data) => {
  try {
    const payload = {
      student_id: data.student_id,
      courses: data.courses.map((c) => c.courseId).filter(Boolean),
      advisor_id: data.advisor_id,
    };
    const res = await axiosSecure.post("/registrations/register", payload);
    console.log("Backend info:",res.data);
    
    if (res.data.ok) {
      Swal.fire("Success", "Registration completed!", "success");
      reset();
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to register!", "error");
  }
};


  return (
    <div className="p-4 shadow rounded max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Register Courses</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Student */}
        <div>
          <label>Student</label>
          <select {...register("student_id", { required: true })} className="w-full border p-2 rounded">
            <option value="">-- Select --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s._id})
              </option>
            ))}
          </select>
        </div>

        {/* Courses */}
        <div>
          <label>Courses</label>
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <select {...register(`courses.${idx}.courseId`, { required: true })} className="flex-1 border p-2 rounded">
                <option value="">-- Select Course --</option>
                {courseOptions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c._id} - {c.name} ({c.credit} cr.)
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => remove(idx)} className="bg-red-500 text-white px-2 rounded">
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ courseId: "" })} className="bg-green-600 text-white px-3 py-1 rounded">
            + Add Course
          </button>
        </div>

        {/* Advisor */}
        <div>
          <label>Advisor</label>
          <select {...register("advisor_id", { required: true })} className="w-full border p-2 rounded">
            <option value="">-- Select --</option>
            {advisors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} ({a._id})
              </option>
            ))}
          </select>
        </div>

        {/* Total Credit */}
        <div>
          <label>Total Credit</label>
          <input value={totalCredit} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
