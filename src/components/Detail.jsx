import Cookies from "js-cookie";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/Api/contactListApi";
import { Loader } from "@mantine/core";

const Detail = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data, isLoading } = useGetSingleContactQuery({ id, token });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 shadow-xl p-5 border rounded-xl w-72 h-70 items-center text-center">
        <img src="" alt="" className="" />
        <h1 className="">{data?.contact?.name}</h1>
        <h1 className="">{data?.contact?.email}</h1>
        <h1 className="">{data?.contact?.phone}</h1>
        <h1 className="">{data?.contact?.address}</h1>
        <Link to={"/"}>
          <button className="bg-teal-600 text-blue-800 py-2 px-5 rounded-2xl">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
