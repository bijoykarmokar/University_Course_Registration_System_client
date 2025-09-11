import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axiosSecure from "../../services/axiosSecure";


export default function TimeTable() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const res = await axiosSecure.get("/timetables");
        setTimetables(res.data);
      } catch (err) {
        console.error("Error fetching timetables:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading timetables...</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-primary" /> TimeTables
      </h2>

      {timetables.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <span>No timetable data found!</span>
        </div>
      ) : (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room</th>
              <th>Advisor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((t, idx) => (
              <tr key={t._id}>
                <th>{idx + 1}</th>
                <td>{t.course.name}</td>
                <td>{t.day}</td>
                <td>{t.startTime}</td>
                <td>{t.endTime}</td>
                <td>{t.room}</td>
                <td>{t.advisor.name}</td>
                <td>
                  <button className="btn btn-sm btn-outline btn-primary mr-2">View</button>
                  <button className="btn btn-sm btn-outline btn-secondary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
