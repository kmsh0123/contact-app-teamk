import React, { useEffect, useState } from "react";
import {
  useEditContactMutation,
  useGetSingleContactQuery,
} from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import { Loader, TextInput } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";

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
    await UpdateContact({ id, contact: user, token });
    console.log(user);
    if (data?.success) {
      nav("/");
    }
  };

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader className=" mx-auto my-auto block" color="white" size="sm" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e5e5f6] to-blue-500">
        <div className="xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded-lg p-[2.9rem]">
          <form onSubmit={updateHandler} className="">
            <h1 className="text-3xl text-blue-700 font-semibold text-center mb-5">
              Create Your Contact
            </h1>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <BsPersonCircle className="text-2xl text-blue-800" />
                <input
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-lg shadow-xl outline-0 p-4 w-full text-blue-600"
                  type="text"
                  placeholder=" Enter Your UserName"
                />
              </div>
              <div className="flex items-center gap-2">
                <TfiEmail className="text-2xl text-blue-800" />
                <input
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-lg shadow-xl outline-0 p-4 w-full text-blue-600"
                  type="tel"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="flex items-center gap-2">
                <BsTelephone className="text-2xl text-blue-800" />
                <input
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg p-4 w-full shadow-xl outline-0 text-blue-600"
                  type="email"
                  placeholder="Enter Your email"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaRegAddressCard className="text-2xl text-blue-800" />
                <input
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded-lg p-4 w-full shadow-xl outline-0 text-blue-600"
                  type="text"
                  placeholder="Enter Your Address"
                />
              </div>
              <div className="flex ">
                <button
                  type="submit"
                  className={`bg-blue-600 text-white hover:bg-gray-500 px-4 py-1 rounded-lg w-28 md:w-44 lg:w-44 h-14 mx-auto block ${
                    isLoading && "btn-disabled"
                  }`}
                >
                  {isLoading ? (
                    <ImSpinner2 className="animate-spin mx-auto h-5 w-5" />
                  ) : (
                    "Update Contact"
                  )}
                </button>
                <Link to={"/"}>
                  <button className="py-1 px-4 h-14 bg-gray-500 rounded-lg text-white">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
