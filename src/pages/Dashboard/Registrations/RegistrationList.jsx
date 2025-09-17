import { useEffect, useState } from "react";
import axiosSecure from "../../../services/axiosSecure";


const RegistrationList = () => {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const fetchRegs = async () => {
      const res = await axiosSecure.get("/registrations");
      setRegs(res.data);
    };
    fetchRegs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Registrations</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Student</th>
            <th>Courses</th>
            <th>Advisor</th>
            <th>Total Credit</th>
          </tr>
        </thead>
        <tbody>
          {regs.map((r) => (
            <tr key={r.student_id}>
              <td>{r.student_id}</td>
              <td>{r.courses?.join(", ")}</td>
              <td>{r.advisor_id}</td>
              <td>{r.total_credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
