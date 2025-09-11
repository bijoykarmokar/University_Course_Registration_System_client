import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaBook, FaClipboardList, FaChalkboardTeacher, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";
import axiosSecure from "../../services/axiosSecure";


export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    registrations: 0,
    advisors: 0,
    timetables: 0,
    grades: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, coursesRes, regRes, advisorsRes, ttRes, gradesRes] = await Promise.all([
          axiosSecure.get("/students"),
          axiosSecure.get("/courses"),
          axiosSecure.get("/registrations"),
          axiosSecure.get("/advisors"),
          axiosSecure.get("/timetables"),
          axiosSecure.get("/grades"),
        ]);
        setCounts({
          students: studentsRes.data.length,
          courses: coursesRes.data.length,
          registrations: regRes.data.length,
          advisors: advisorsRes.data.length,
          timetables: ttRes.data.length,
          grades: gradesRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  const cards = [
    { title: "Students", count: counts.students, icon: <FaUserGraduate />, link: "/students" },
    { title: "Courses", count: counts.courses, icon: <FaBook />, link: "/courses" },
    { title: "Registrations", count: counts.registrations, icon: <FaClipboardList />, link: "/registrations" },
    { title: "Advisors", count: counts.advisors, icon: <FaChalkboardTeacher />, link: "/advisors" },
    { title: "TimeTables", count: counts.timetables, icon: <FaCalendarAlt />, link: "/timetables" },
    { title: "Grades", count: counts.grades, icon: <FaGraduationCap />, link: "/grades" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
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
