import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      login();

      notification.success({
        message: "Success",
        description: "You are logged in successfully!",
      });

      navigate("/dashboard");
    } else {
      notification.error({
        message: "Login failed",
        description: "Incorrect username or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[512px] bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-[rgb(156,49,49)] mb-6">
          Welcome, Log into your account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          It is our great pleasure to have you on board!
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input className="h-[42px]" placeholder="Enter your Login" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              className="h-[42px]"
              placeholder="Enter your Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-[42px]"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Button
              type="link"
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-700 p-0"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
