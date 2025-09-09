import Marquee from "react-fast-marquee";
import CSELOGO from "../assets/cse_logo.jpg"
import EEELOGO from "../assets/eee_logo.jpg"
import CHEMLOGO from "../assets/chemistry_logo.png"
import PHYLOGO from "../assets/physis_logo.jpg"
import MATLOGO from "../assets/math_logo.jpg"
import BANLOGO from "../assets/bangla_logo.jpg"
import ENGLOGO from "../assets/english_logo.jpg"
import ACCLOGO from "../assets/accounting_logo.jpg"
import SOCLOGO from "../assets/social_logo.jpg"
import ORTHLOGO from "../assets/orhoniti_logo.jpg"

const logos = [ CSELOGO, EEELOGO,CHEMLOGO,PHYLOGO,MATLOGO,BANLOGO,ENGLOGO,ACCLOGO,SOCLOGO,ORTHLOGO];

const DepartmentLogos = () => {
  return (
    <div className="py-10 bg-base-200">
      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-10">
        Our University Departments
      </h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-10 flex items-center">
            <img src={logo} alt="Department Logo" className="h-20 w-auto object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default DepartmentLogos;
