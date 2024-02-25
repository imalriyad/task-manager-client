import { MdOutlineChecklistRtl } from "react-icons/md";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-screen-xl px-6 mx-auto ">
      <div className="max-w-screen-xl mx-auto min-h-[90vh] md:py-20 pb-10 ">
        <div className="flex justify-between items-end flex-col-reverse md:flex-row">
          <div className="">
            <h1 className="mb-5 lg:text-5xl md:text-4xl text-2xl font-bold">
              Manage Your Task With TaskManger
            </h1>
            <p className="mb-5 space-y-2 md:text-sm font-medium text-xs text-[#2c3e50]">
              <li className="list-none flex items-center font-semibold">
                {" "}
                <MdOutlineChecklistRtl className="text-xl mr-2" />
                Intuitive User Interface
              </li>
              <li className="list-none flex items-center font-semibold">
                {" "}
                <MdOutlineChecklistRtl className="text-xl mr-2" />
                Collaborative Tools
              </li>
              <li className="list-none flex items-center font-semibold">
                {" "}
                <MdOutlineChecklistRtl className="text-xl mr-2" />
                Customizable Task Features
              </li>
              <li className="list-none flex items-center font-semibold">
                {" "}
                <MdOutlineChecklistRtl className="text-xl mr-2" />
                Cross-Platform Accessibility
              </li>
            </p>
            <Link to={"dashboard"} className="btn btn-sm btn-neutral">
              Let’s Explore <FaMagnifyingGlassChart />
            </Link>
          </div>
          <img
            src="https://i.postimg.cc/rFkzMHG8/banner.png"
            className="md:w-[35%] mx-auto md:mx-0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
