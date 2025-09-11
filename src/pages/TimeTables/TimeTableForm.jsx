import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendarPlus } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";

export default function TimeTableForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [courses, setCourses] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, advisorRes] = await Promise.all([
          axiosSecure.get("/courses"),
          axiosSecure.get("/advisors"),
        ]);
        setCourses(courseRes.data);
        setAdvisors(advisorRes.data);
      } catch (err) {
        console.error("Error fetching courses/advisors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axiosSecure.post("/timetables", {
        courseId: data.courseId,
        advisorId: data.advisorId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        room: data.room,
      });
      alert("TimeTable added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add timetable.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading courses and advisors...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaCalendarPlus className="text-primary" /> Add TimeTable
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Course */}
        <div className="form-control w-full">
          <label className="label">Select Course</label>
          <select
            className={`select select-bordered w-full ${errors.courseId && "select-error"}`}
            {...register("courseId", { required: "Course is required" })}
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <span className="text-red-500 text-sm mt-1">{errors.courseId.message}</span>
          )}
        </div>

        {/* Advisor */}
        <div className="form-control w-full">
          <label className="label">Select Advisor</label>
          <select
            className={`select select-bordered w-full ${errors.advisorId && "select-error"}`}
            {...register("advisorId", { required: "Advisor is required" })}
          >
            <option value="">-- Select Advisor --</option>
            {advisors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} ({a.department})
              </option>
            ))}
          </select>
          {errors.advisorId && (
            <span className="text-red-500 text-sm mt-1">{errors.advisorId.message}</span>
          )}
        </div>

        {/* Day */}
        <div className="form-control w-full">
          <label className="label">Day</label>
          <select
            className={`select select-bordered w-full ${errors.day && "select-error"}`}
            {...register("day", { required: "Day is required" })}
          >
            <option value="">-- Select Day --</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
          </select>
          {errors.day && (
            <span className="text-red-500 text-sm mt-1">{errors.day.message}</span>
          )}
        </div>

        {/* Start Time */}
        <div className="form-control w-full">
          <label className="label">Start Time</label>
          <input
            type="time"
            className={`input input-bordered w-full ${errors.startTime && "input-error"}`}
            {...register("startTime", { required: "Start time is required" })}
          />
          {errors.startTime && (
            <span className="text-red-500 text-sm mt-1">{errors.startTime.message}</span>
          )}
        </div>

        {/* End Time */}
        <div className="form-control w-full">
          <label className="label">End Time</label>
          <input
            type="time"
            className={`input input-bordered w-full ${errors.endTime && "input-error"}`}
            {...register("endTime", { required: "End time is required" })}
          />
          {errors.endTime && (
            <span className="text-red-500 text-sm mt-1">{errors.endTime.message}</span>
          )}
        </div>

        {/* Room */}
        <div className="form-control w-full">
          <label className="label">Room</label>
          <input
            type="text"
            placeholder="e.g., Room 101"
            className={`input input-bordered w-full ${errors.room && "input-error"}`}
            {...register("room", { required: "Room is required" })}
          />
          {errors.room && (
            <span className="text-red-500 text-sm mt-1">{errors.room.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${submitting ? "loading" : ""}`}
          disabled={submitting}
        >
          Add TimeTable
        </button>
      </form>
    </div>
  );
}
