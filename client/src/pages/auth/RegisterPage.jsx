import AuthLayout from "../../layouts/AuthLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validationSchemas";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

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

        alert("Registration Successful!");

        navigate("/login");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Registration Failed"
        );
    }
};

    return (
        <AuthLayout>
            <Card>

                <h2 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h2>

                <p className="text-gray-500 text-center mb-8">
                    Start your AI career journey
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Label htmlFor="firstName">
                        First Name
                    </Label>

                    <Input
                        name="firstName"
                        placeholder="Dhava"
                        register={register}
                        error={errors.firstName}
                    />

                    <Label htmlFor="lastName">
                        Last Name
                    </Label>

                    <Input
                        name="lastName"
                        placeholder="Mani"
                        register={register}
                        error={errors.lastName}
                    />

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
                        Create Account
                    </Button>

                </form>

            </Card>
        </AuthLayout>
    );
}

export default RegisterPage;