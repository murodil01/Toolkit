import { Button } from "antd";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaGraduationCap } from "react-icons/fa";
import {
  BellOutlined,
  UserAddOutlined,
  BankOutlined,
  UpOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const goToTeachers = () => {
    navigate("/teachers");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar goToTeachers={goToTeachers} />

      <main className="flex-1 p-8 overflow-auto bg-white relative">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-700">
            Learn how to launch faster <br /> watch our webinar for tips from
            our experts and get a limited time offer.
          </p>
          <div className="flex items-center gap-4">
            <BellOutlined className="text-2xl text-gray-600" />
            <Button
              type="primary"
              className="bg-blue-800 hover:bg-blue-900 px-6 py-2 font-medium"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Welcome to your dashboard, Udemy school
        </h1>
        <p className="text-sm text-gray-500 pl-[52px] mb-6">
          Uyo/school/@teachable.com
        </p>

        <div className="space-y-6 px-[52px]">
          <div className="flex gap-4 items-start">
            <UserAddOutlined className="text-4xl text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Add other admins
              </h3>
              <p className="text-gray-600 max-w-[500px]">
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they'll appear on
                your site!
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <BankOutlined className="text-4xl text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Add classes
              </h3>
              <p className="text-gray-600 max-w-[500px]">
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they'll appear on
                your site!
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <FaGraduationCap className="w-10 h-10 text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Add students
              </h3>
              <p className="text-gray-600 max-w-[500px]">
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they'll appear on
                your site!
              </p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 absolute bottom-6 right-6 bg-[#1B2B65] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#122054] transition-all">
          <PhoneOutlined /> Support <UpOutlined />
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
