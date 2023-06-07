import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import {
	useEditContactMutation,
	useGetSingleContactQuery,
} from "../redux/Api/contactListApi";
import { CreateContactSchema } from "../schemas/createContactSchema";

const Edit = () => {
	const [isLoading, setIsLoading] = useState(false);

	const token = Cookies.get("token");
	const { id } = useParams();
	const { data } = useGetSingleContactQuery({ id, token });
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	console.log(data);

	useEffect(() => {
		setName(data?.contact?.name);
		setPhone(data?.contact?.phone);
		setEmail(data?.contact?.email);
		setAddress(data?.contact?.address);
	}, [data]);

	// const {register,handleSubmit} = useForm();
	const nav = useNavigate();

	const [UpdateContact] = useEditContactMutation();

	const updateHandler = async (e) => {
		e.preventDefault();

		const user = { name, phone, email, address };
		const result = CreateContactSchema.safeParse(data);

		if (!result.status) {
			return;
		}

		await UpdateContact({ id, contact: user, token });
		console.log(user);
		if (data?.success) {
			nav("/");
		}
	};

	return (
		<div>
			<div className="flex justify-center items-center min-h-screen ">
				<form
					onSubmit={updateHandler}
					className="w-96 shadow shadow-violet-300 p-5 rounded-2xl m-2 md:m-2 lg:m-0"
				>
					<h1 className="text-3xl text-violet-600 font-semibold text-center mb-5">
						Create Your Contact
					</h1>
					<div className="space-y-5">
						<input
							defaultValue={name}
							onChange={(e) => setName(e.target.value)}
							className="border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500"
							type="text"
							placeholder="Enter Your UserName"
						/>
						<input
							defaultValue={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500"
							type="tel"
							placeholder="Enter Your Phone"
						/>
						<input
							defaultValue={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500"
							type="email"
							placeholder="Enter Your email"
						/>
						<input
							defaultValue={address}
							onChange={(e) => setAddress(e.target.value)}
							className="border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500"
							type="text"
							placeholder="Enter Your Address"
						/>
						<div className="">
							<button
								type="submit"
								className={`bg-violet-700 rounded-3xl p-4 w-full text-white hover:bg-violet-900 transition duration-300 ${
									isLoading && "btn-disabled"
								}`}
							>
								{isLoading ? (
									<ImSpinner2 className="animate-spin mx-auto h-5 w-5" />
								) : (
									"Update Contact"
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Edit;
