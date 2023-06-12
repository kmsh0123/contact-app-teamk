import { useContext, useEffect, useState } from "react";
import { Avatar, Loader, Table } from "@mantine/core";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, addFavourite } from "../redux/service/contactSlice";
import { Menu, Button } from "@mantine/core";
import { RiMore2Fill } from "react-icons/ri";

const ContactList = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searched = useSelector((state) => state.contactSlice.searched);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data, dispatch]);

  // console.log(data);

  const deleteHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-700 p-2 px-5 rounded-lg mx-2 text-white",
        cancelButton: "bg-red-700 p-2 px-5 rounded-lg text-white",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your contact has been deleted.",
            "success"
          );

          const { data } = await deleteContact({ id, token });
          console.log(data);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your contact has not been deleted)",
            "error"
          );
        }
      });
  };

  const rows = contacts
    ?.filter((item) => {
      if (searched === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searched.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    ?.map((contact) => {
      return (
        <tr className="hover:bg-blue-300 contact-list" key={contact?.id}>
          <td className="hidden md:table-cell">
            {contact?.email === null ? (
              <Avatar color="pink" size="md" radius="xl"></Avatar>
            ) : (
              <Avatar color="pink" size="md" radius="xl">
                {" "}
                <p className="text-lg">{contact?.name.substring(0, 1)}</p>{" "}
              </Avatar>
            )}
          </td>
          <td
            className={`${
              mode ? "text-slate-900" : "text-white"
            } hidden md:table-cell`}>
            {contact?.name === null ? "exampleName" : contact?.name}
          </td>
          <td className={`${mode ? "text-slate-900" : "text-white"}`}>
            {contact?.email === null ? "example@gmail.com" : contact?.email}
          </td>
          <td
            className={`${
              mode ? "text-slate-900" : "text-white"
            } hidden md:table-cell`}>
            {contact?.phone === null ? "-" : contact?.phone}
          </td>
          <td
            className={`${
              mode ? "text-slate-900" : "text-white"
            } hidden md:table-cell`}>
            {contact?.address === null ? "-" : contact?.address}
          </td>
          <td className="del-icon">
            <div className="flex justify-end">
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <div className=" flex items-center hover:bg-white w-[30px] h-[30px] rounded-[50%]">
                    <RiMore2Fill className="text-2xl ml-[3px] text-gray-400" />
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>
                    <p
                      onClick={() => deleteHandler(contact?.id)}
                      className=" text-red-700 cursor-pointer">
                      Delete
                    </p>
                  </Menu.Item>

                  <Menu.Item target="_blank">
                    <Link to={`/detail/${contact?.id}`}>
                      <p className="">Detail</p>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <p
                      onClick={() => dispatch(addFavourite(contact))}
                      className=" text-blue-700 cursor-pointer">
                      Favourite
                    </p>
                  </Menu.Item>

                  <Menu.Item target="_blank">
                    <Link to={`/edit/${contact?.id}`}>
                      <p className="">Edit</p>
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </td>
        </tr>
      );
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />;
      </div>
    );
  }

  return (
    <div className="flex justify-center md:justify-start">
      {data?.contacts?.data.length === 0 ? (
        <div className="flex justify-center flex-col gap-3 items-center h-screen w-[80%] mx-auto">
          <h1 className="text-3xl font-semibold text-blue-700">Hello Dear!</h1>
          <iframe src="https://embed.lottiefiles.com/animation/67375"></iframe>
          <div className="text-gray-500 text-sm text-center">
            <h1 className="">There are no contacts to display</h1>
            <p className="">Please check back later for updates</p>
          </div>
        </div>
      ) : (
        <div
          className={`lg:w-[70%] w-screen absolute ${
            isOpen ? "lg:left-[305px]" : "lg:left-0"
          } ${isOpen ? "lg:px-0" : "lg:px-3"} duration-500 transition-all ${
            isOpen ? "lg:w-[70%]" : "lg:w-full"
          }`}>
          <div className="flex justify-start pt-0 md:pt-10">
            <Table className="relative top-24 lg:top-12 md:top-16">
              <thead className="">
                <tr className="">
                  <th
                    className={`${
                      mode ? "color-slate" : "color-white !important"
                    } hidden md:table-cell`}>
                    Name
                  </th>
                  <th className={`${mode ? "color-slate" : "color-white"}`}>
                    Email
                  </th>
                  <th
                    className={`${
                      mode ? "color-slate" : "color-white"
                    } hidden md:table-cell`}>
                    Phone Number
                  </th>
                  <th
                    className={`${
                      mode ? "color-slate" : "color-white"
                    } hidden md:table-cell`}>
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="">{rows}</tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
