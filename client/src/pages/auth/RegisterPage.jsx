import AuthLayout from "../../layouts/AuthLayout";
import Card, { CardBody, CardHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validationSchemas";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      console.log(response);

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        "Registration Failed: " +
          (error.response?.data?.message || "Please try again."),
      );
    }
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <h2>Create Account</h2>

          <p>Start your CareerOS journey</p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="firstName">First Name</Label>

            <Input
              name="firstName"
              placeholder="Dhava"
              register={register}
              error={errors.firstName}
            />

            <Label htmlFor="lastName">Last Name</Label>

            <Input
              name="lastName"
              placeholder="Mani"
              register={register}
              error={errors.lastName}
            />

            <Label htmlFor="email">Email</Label>

            <Input
              type="email"
              name="email"
              placeholder="dhava@example.com"
              register={register}
              error={errors.email}
            />

            <Label htmlFor="password">Password</Label>

            <Input
              type="password"
              name="password"
              placeholder="********"
              register={register}
              error={errors.password}
            />

            <Button type="submit" className="mt-2">
              Create Account
            </Button>
          </form>
        </CardBody>
      </Card>
    </AuthLayout>
  );
}

export default RegisterPage;
