import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validationSchemas";
import AuthLayout from "../../layouts/AuthLayout";
import Card, { CardBody, CardHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <h2 className="text-3xl font-bold">Welcome Back</h2>

          <p className="text-slate-500 mt-2">Sign in to continue</p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              register={register}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              error={errors.password}
            />

            <Button type="submit" className="mt-2">
              Login
            </Button>

            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </AuthLayout>
  );
}

export default LoginPage;
