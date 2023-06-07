import React from "react";
import { Menu, Button, Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BsBoxArrowInRight } from "react-icons/bs";
import { ScrollArea } from "@mantine/core";
import { useGetContactQuery } from "../redux/Api/contactListApi";
import { removeUser } from "../redux/service/authSlice";
import { useGetLogOutMutation } from "../redux/Api/contactApi";
import { FaUser } from "react-icons/fa";

const UserMenu = () => {
	const token = Cookies.get("token");

	const user = JSON.parse(Cookies.get("user"));
	const { data } = useGetContactQuery(token);

	const [getLogOut, { isLoading }] = useGetLogOutMutation();

	const nav = useNavigate();
	const dispatch = useDispatch();

	const logOutHandler = async () => {
		const { data } = await getLogOut(token);
		dispatch(removeUser());
		if (data?.success) {
			nav("/login");
		}
		// console.log(data);
	};

	return (
		<div>
			{/* Dropdown menu start here. Please change colors for dark-mode yourself.*/}
			<Menu
				trigger="hover"
				openDelay={100}
				closeDelay={400}
				width={200}
				shadow="md"
				transitionProps={{ transition: "scale-y", duration: 150 }}
			>
				{/* Icon is here. */}
				<Menu.Target>
					<button className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center">
						<FaUser className="text-md" />
					</button>
				</Menu.Target>

				{/* dropdown is here. */}
				<Menu.Dropdown className=" mt-1 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg">
					<Menu.Item className=" hover:bg-transparent">
						<div className=" flex flex-col">
							<div className=" container mx-auto flex">
								{/* name */}
								<ScrollArea w={160} h={30} type="never">
									<p className=" text-gray-600 font-medium text-2xl pb-1">
										{user?.name}
									</p>
								</ScrollArea>
								{/* Enter arrow */}
								<Link to={"/profile"}>
									<div className=" relative ml-[-18px] mt-[1px] bg-transparent w-9 h-9 rounded-[50%] items-center hover:bg-gray-400 hover:text-white">
										<BsBoxArrowInRight className=" absolute mt-[6px] ml-[3px] text-2xl " />
									</div>
								</Link>
							</div>
							{/* email */}
							<ScrollArea w={170} type="never">
								<p className=" overflow-hidden text-gray-600 mb-[18px] font-medium">
									{user?.email}
								</p>
							</ScrollArea>
						</div>
						<hr />
					</Menu.Item>

					{/* signout start here */}
					<Menu.Item className=" hover:bg-transparent" component="a">
						<button
							onClick={logOutHandler}
							disabled={isLoading && true}
							type="submit"
							className=" bg-red-600 text-white text-[15px] px-4 mb-2 py-1 hover:bg-gray-400 rounded w-25 h-9 mx-auto block"
						>
							{isLoading ? (
								<Loader
									className=" mx-auto my-auto block"
									color="white"
									size="sm"
								/>
							) : (
								"Sign out"
							)}
						</button>
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserMenu;
