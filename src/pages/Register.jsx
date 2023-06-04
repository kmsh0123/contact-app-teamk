import React from "react";
import { useGetRegisterMutation } from "../redux/Api/contactApi";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterSchema } from "../schemas/registerSchema";

const Register = () => {
	const [getRegister, { isLoading }] = useGetRegisterMutation();

	const navigate = useNavigate();

	const { onSubmit, getInputProps } = useForm({
		validate: zodResolver(RegisterSchema),
		initialValues: {
			email: "",
			name: "",
			password: "",
			password_confirmation: "",
		},
	});

	const handleSubmit = async (values) => {
		try {
			const { data } = await getRegister(values);

			if (data?.success) {
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		<div className="flex justify-center text-center h-screen">
			<h1 className="">Loading</h1>
		</div>;
	}

	return (
		<div className="flex justify-center items-center h-screen bg-amber-200">
			<form
				className=" w-96 p-5 flex flex-col gap-5 shadow-lg bg-orange-400"
				onSubmit={onSubmit(handleSubmit)}
			>
				<h1 className=" text-center mb-3 text-xl font-semibold ">
					Hello Friend!
				</h1>
				<div className="flex flex-col gap-5">
					<TextInput
						mt="sm"
						label="Email"
						placeholder="Email"
						{...getInputProps("email")}
					/>
					<TextInput
						label="Name"
						placeholder="Name"
						{...getInputProps("name")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Password"
						{...getInputProps("password")}
					/>
					<PasswordInput
						mt="sm"
						label="Confirm password"
						placeholder="Confirm password"
						{...getInputProps("password_confirmation")}
					/>
					<div className=" flex justify-around items-center">
						<h1 className="">Already have an acc?</h1>
						<Link to={"/login"}>
							<p className=" cursor-pointer font-semibold">
								Login
							</p>
						</Link>
					</div>
					<button
						disabled={isLoading && true}
						type="submit"
						className=" bg-teal-400 text-black py-2"
					>
						{isLoading ? (
							<Loader
								className=" w-10 mx-auto items-center "
								color="grape"
								variant="dots"
							/>
						) : (
							"Register"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
