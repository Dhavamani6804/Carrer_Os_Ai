import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validationSchemas";
import AuthLayout from "../../layouts/AuthLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useAuth } from "../../context/AuthContext";

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

        alert(
            error.response?.data?.message ||
            "Login Failed"
        );

    }
};

    return (
        <AuthLayout>
            <Card>

                <h2 className="text-3xl font-bold text-center mb-2">
    Welcome Back
</h2>

<p className="text-gray-500 text-center mb-8">
    Sign in to continue your AI career journey
</p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Label htmlFor="email">
                        Email
                    </Label>

                    <Input
                        type="email"
                        name="email"
                        placeholder="dhava@example.com"
                        register={register}
                        error={errors.email}
                    />

                    <Label htmlFor="password">
                        Password
                    </Label>

                    <Input
                        type="password"
                        name="password"
                        placeholder="********"
                        register={register}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        className="mt-2"
                    >
                        Login 
                    </Button>

                    <p className="text-center mt-6 text-sm">
    Don't have an account?{" "}
    <span className="text-blue-600 cursor-pointer">
        Register
    </span>
</p>

                </form>

            </Card>
        </AuthLayout>
    );
}

export default LoginPage;