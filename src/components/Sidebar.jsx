import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  SettingOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToTolovlar = () => {
    navigate("/tolovlar");
  };

  const goToStudents = () => {
    navigate("/students");
  };

  return (
    <div
      className={`
        fixed lg:static top-0 left-0 z-50 bg-[#0B1C49] text-white 
        w-64 h-auto lg:w-[350px] p-6 flex flex-col justify-between 
        min-h-screen transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex justify-end lg:hidden mb-4">
        <button
          onClick={onClose}
          className="bg-[#3A4C8B] px-2 py-1 rounded text-sm"
        >
          Close
        </button>
      </div>

      <div className="mx-auto">
        <img className="w-[50px] h-[50px] rounded-4xl mx-auto mb-[10px]"
          src="https://static.vecteezy.com/system/resources/previews/008/213/768/non_2x/letter-n-thunderbolt-energy-logo-symbol-icon-design-vector.jpg"
          alt=""
        />
        <ul className="space-y-4">
          <li
            className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer"
            onClick={goToDashboard}
          >
            <DashboardOutlined /> Dashboard
          </li>
          <li
            className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer"
            onClick={goToTolovlar}
          >
            <TeamOutlined /> Tolovlar
          </li>
          <li
            className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer"
            onClick={goToStudents}
          >
            <UserOutlined /> Students
          </li>
          <li className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer">
            <CreditCardOutlined /> Billing
          </li>
          <li className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer">
            <SettingOutlined /> Settings and profile
          </li>
          <li className="flex items-center gap-2 hover:bg-[#3A4C8B] py-2 px-4 rounded cursor-pointer">
            <FileDoneOutlined /> Exams
          </li>
        </ul>
      </div>

      <div className="text-sm text-white mt-10">
        <span className="flex items-center gap-3 text-white py-1 px-2 rounded text-center">
          <FaGraduationCap className="w-6 h-6 text-white-700" />
          Features{" "}
          <span className="bg-blue-600 px-1 rounded text-xs text-black py-[4px] px-[11px]">
            NEW
          </span>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
