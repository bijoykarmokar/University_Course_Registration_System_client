import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";
import axiosSecure from "../../services/axiosSecure";


export default function StudentDashboard({ studentId }) {
  const [data, setData] = useState({
    registrations: [],
    timetables: [],
    grades: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [regRes, ttRes, gradesRes] = await Promise.all([
          axiosSecure.get(`/registrations/student/${studentId}`),
          axiosSecure.get(`/timetables/student/${studentId}`),
          axiosSecure.get(`/grades/student/${studentId}`),
        ]);
        setData({
          registrations: regRes.data,
          timetables: ttRes.data,
          grades: gradesRes.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [studentId]);

  if (loading) return <div className="text-center py-8">Loading student data...</div>;

  const cards = [
    { title: "Registered Courses", count: data.registrations.length, icon: <FaClipboardList />, link: "/registrations" },
    { title: "TimeTables", count: data.timetables.length, icon: <FaCalendarAlt />, link: "/timetables" },
    { title: "Grades", count: data.grades.length, icon: <FaGraduationCap />, link: "/grades" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.title} to={card.link}>
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center gap-4 rounded-lg">
              <div className="text-4xl text-primary">{card.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-3xl font-bold">{card.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
