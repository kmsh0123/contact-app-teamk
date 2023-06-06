import React, { useState } from "react";
import { useEditContactMutation } from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import { Loader, TextInput } from "@mantine/core";

const Edit = () => {
  const token = Cookies.get("token");
  const [ediContact, {isLoading}] = useEditContactMutation();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState('')

  

  return (
    <div className="">
      <div className="flex justify-center items-center h-screen shadow-xl rounded-2xl">
        <form className=" w-96 border p-5 rounded-xl bg-orange-400 flex flex-col gap-5 shadow-lg">
        <h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
            Edit Contact
          </h1>
          <div className="flex flex-col gap-5">
            <TextInput
              mt="sm"
              label="Name"
              placeholder="Name"
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Email"
            />
            <TextInput
              mt="sm"
              label="Phone Number"
              placeholder="Phone Number"
            />
            <TextInput
              mt="sm"
              label="Address"
              placeholder="Address"
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
                "Done"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
