import React, { useEffect, useState } from "react";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";
import axiosSecure from "../../services/axiosSecure";


export default function AdvisorDashboard({ advisorId }) {
  const [data, setData] = useState({
    timetables: [],
    registrations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisorData = async () => {
      try {
        const [ttRes, regRes] = await Promise.all([
          axiosSecure.get(`/timetables/advisor/${advisorId}`),
          axiosSecure.get(`/registrations/advisor/${advisorId}`),
        ]);
        setData({
          timetables: ttRes.data,
          registrations: regRes.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisorData();
  }, [advisorId]);

  if (loading) return <div className="text-center py-8">Loading advisor data...</div>;

  const cards = [
    { title: "TimeTables", count: data.timetables.length, icon: <FaCalendarAlt />, link: "/timetables" },
    { title: "Student Registrations", count: data.registrations.length, icon: <FaClipboardList />, link: "/registrations" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Advisor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
