import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.username === values.username
    );

    if (userExists) {
      notification.error({
        message: "Username already exists",
        description: "Please choose a different username or Sign In.",
      });
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));

    notification.success({
      message: "Account Created",
      description: "You can now Sign In with your credentials.",
    });

    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome to Our App!
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Create an account to get started.
        </p>

        <Form layout="vertical" onFinish={onFinish} className="space-y-5">
          <Form.Item
            name="email"
            label={<span className="text-gray-700">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              style={{
                height: "44px",
                borderRadius: "8px",
                paddingLeft: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="username"
            label={<span className="text-gray-700">Username</span>}
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input
              placeholder="Choose a username"
              style={{
                height: "44px",
                borderRadius: "8px",
                paddingLeft: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-gray-700">Password</span>}
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              placeholder="Create a password"
              style={{
                height: "44px",
                borderRadius: "8px",
                paddingLeft: "14px",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-11 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <Button
              type="link"
              onClick={() => navigate("/signin")}
              className="p-0 text-blue-500 hover:text-blue-700 font-medium"
            >
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
