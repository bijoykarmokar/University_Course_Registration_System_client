import { FaBookOpen, FaUserGraduate, FaCalendarAlt, FaFileAlt, FaAward, FaTools } from "react-icons/fa";

const features = [
  {
    title: "Course Catalog",
    desc: "Browse and explore all available university courses by department and semester.",
    icon: <FaBookOpen className="w-10 h-10 text-primary" />,
  },
  {
    title: "Student Portal",
    desc: "Students can register, drop courses, and view their current credit load easily.",
    icon: <FaUserGraduate className="w-10 h-10 text-primary" />,
  },
  {
    title: "Timetable",
    desc: "Generate a personal timetable and prevent scheduling conflicts automatically.",
    icon: <FaCalendarAlt className="w-10 h-10 text-primary" />,
  },
  {
    title: "Registration Reports",
    desc: "Download and export course registration reports in PDF format for reference.",
    icon: <FaFileAlt className="w-10 h-10 text-primary" />,
  },
  {
    title: "Grading System",
    desc: "Track grades and academic progress with semester-wise GPA calculations.",
    icon: <FaAward className="w-10 h-10 text-primary" />,
  },
  {
    title: "Admin Tools",
    desc: "Admins can manage students, courses, advisors, and departments with ease.",
    icon: <FaTools className="w-10 h-10 text-primary" />,
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-12 px-6 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-10">
        Key Features of Our Registration System
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => (
          <div key={idx} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <div className="mb-3">{f.icon}</div>
              <h3 className="card-title">{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
