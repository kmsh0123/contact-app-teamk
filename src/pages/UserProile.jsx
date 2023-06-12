import React from 'react'
import Cookies from "js-cookie";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/service/authSlice";
import { Avatar, Loader, ScrollArea } from "@mantine/core";
import "../style/glassmorphic.css";
import { useGetLogOutMutation } from "../redux/Api/contactApi";


const UserProile = () => {
    const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logout, { isLoading }] = useGetLogOutMutation();

  const nav = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/formPage");
    console.log(data);
  };
  return (
    <div>
      <div className=" flex flex-col justify-center items-center h-screen">
        <div className=" flex flex-col gap-3 p-3 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded glassmorphic  w-72">
          {/* Back arrow */}
          <Link to={"/"}>
            <button className=" flex flex-col text-gray-600 px-5 pb-5 pt-2 hover:text-gray-400 text-2xl ml-[-20px] ">
              <BsArrowLeftCircle />
            </button>
          </Link>
          {/* inner texts of Form */}
          <div className=" flex flex-col gap-3 rounded-t-xl bg-gray-100 p-5 ">
            {/* Icon */}
            <div className=" relative mb-2 mt-[-60px] mx-auto ">
              <Avatar
                className=" outline-double outline-4 outline-cyan-300"
                color="cyan"
                size="xl"
                radius="xl"
              >
                {" "}
                <p className="text-4xl">
                  {user?.name.substring(0, 1)}
                </p>{" "}
              </Avatar>
            </div>
            {/* name */}
            <ScrollArea w={200} type="never">
              <p className=" text-gray-600 text-lg mt-1 font-medium">
                {user?.name}
              </p>
            </ScrollArea>
          </div>
          {/* email */}
          <div className=" flex flex-col rounded-b-xl bg-gray-100 p-5 mt-[-6px]">
            <ScrollArea w={200} type="never">
              <p className=" text-gray-600 text-lg font-medium">
                {user?.email}
              </p>
            </ScrollArea>
          </div>
          {/* signout */}
          <button
            onClick={logoutHandler}
            disabled={isLoading && true}
            type="submit"
            className=" bg-red-600 text-white px-4 hover:bg-gray-400 my-3 rounded w-40 h-9 mx-auto block"
          >
            {isLoading ? (
              <Loader
                className=" mx-auto my-auto block"
                color="white"
                size="sm"
                variant="dots"
              />
            ) : (
              "Sign out"
            )}
          </button>
        </div>
        <div className=" text-sm w-[700px] text-center mt-8">
          <p>Plenty of features are yet to come and currently in development. Our team&#39;s developers are trying out their hardest and best to improve the experience over using this application, with bloods, sweats, tears and souls, without sleeping all days all nights. Hence we like to request our users to wait and give us a little bit of more time. Thank you for your patientness ...</p>
        </div>
      </div>
    </div>
  )
}

export default UserProile