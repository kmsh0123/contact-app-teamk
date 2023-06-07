import { Loader, TextInput } from "@mantine/core";
import { useCreateContactMutation } from "../redux/Api/contactListApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm, zodResolver } from "@mantine/form";
import { CreateContactSchema } from "../schemas/createContactSchema";

const CreateContact = () => {
	const token = Cookies.get("token");

	const [createContact, { isLoading }] = useCreateContactMutation();

	const nav = useNavigate();

	const form = useForm({
		validate: zodResolver(CreateContactSchema),
		initialValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	return (
		<>
			<div className=" flex justify-center items-center h-screen bg-amber-200">
				<form
					className=" w-96 border p-5 rounded-xl bg-orange-400 flex flex-col gap-5 shadow-lg"
					onSubmit={form.onSubmit(async (values) => {
						try {
							const { data } = await createContact({
								token,
								data: values,
							});
							if (data?.success) {
								nav("/");
							}
							console.log(data);
							console.log(values);
						} catch (error) {
							console.log(error);
						}
					})}
				>
					<h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
						Create Contact
					</h1>
					<div className="flex flex-col gap-5">
						<TextInput
							mt="sm"
							label="Name"
							placeholder="Name"
							{...form.getInputProps("name")}
						/>
						<TextInput
							mt="sm"
							label="Email"
							placeholder="Email"
							{...form.getInputProps("email")}
						/>
						<TextInput
							mt="sm"
							label="Phone Number"
							placeholder="Phone Number"
							{...form.getInputProps("phone")}
						/>
						<TextInput
							mt="sm"
							label="Address"
							placeholder="Address"
							{...form.getInputProps("address")}
						/>
						<button
							disabled={isLoading && true}
							type="submit"
							className=" bg-green-400 text-black py-2 rounded-2xl"
						>
							{isLoading ? (
								<Loader
									className=" w-10 mx-auto items-center "
									color="grape"
									variant="dots"
								/>
							) : (
								"Create"
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateContact;
