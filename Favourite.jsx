// import { useEffect } from "react";
import { Button, Loader, Menu, Table } from "@mantine/core";
import { useGetContactQuery } from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
// import { addContacts } from "../redux/service/contactSlice";
import { FiHeart } from "react-icons/fi";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import { AiOutlineMenu } from "react-icons/ai";
import { toggleNavbar } from "../redux/service/navbarSlice";
import { removeFavourite } from "../redux/service/contactSlice";
import { useState } from "react";



const Favourite = () => {

  const [fillHeart,setFillHeart]=useState(true);
  
  const token = Cookies.get("token");
  const { isLoading } = useGetContactQuery(token);
  // const [deleteContact] = useDeleteContactMutation();
  // const contacts = useSelector((state) => state.contactSlice.contacts);
  const searched = useSelector((state) => state.contactSlice.searched);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { favourite } = useSelector((state) => state.contactSlice);
  // console.log(favourite);
  const dispatch = useDispatch();

  

  // useEffect(() => {
  //   dispatch(addContacts(data?.contacts?.data));
  // }, [data, dispatch]);

  function run(contactData){
    dispatch(removeFavourite(contactData))
    
  }

  const rows = favourite
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
      console.log(contact)
      
      return (
        <tr className="contact-list" key={contact?.id}>
          <td className="hidden md:table-cell">
            {contact?.name === null ? "exampleName" : contact?.name}
          </td>
          <td>
            {contact?.email === null ? "example@gmail.com" : contact?.email}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.phone === null ? "-" : contact?.phone}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.address === null ? "-" : contact?.address}
          </td>
          <td className="del-icon">
            <div className="flex justify-end">
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <Button variant="outline" >
                    <FiHeart className={`text-2xl ${fillHeart} ? fill-blue-500 :null`} onClick={()=> run(contact)} />
                  </Button>
                </Menu.Target>
              </Menu>
            </div>
          </td>
        </tr>
      );
    });

    if(favourite.length===0){
      return(
        
        <div className=" text-2xl">There is No Favourite</div>
      )
    }

  if (isLoading) {
    return (
      
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />;
      </div>
    );
  }

  return (
    <>
      {/* nav  */}
      <nav className="bg-white shadow p-2 md:p-5 flex items-center justify-between space-x-5 w-screen">
        <div className="flex items-center space-x-3">
          <div onClick={() => dispatch(toggleNavbar())} className="">
            {isOpen ? (
              <AiOutlineMenu
                className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}
              />
            ) : (
              <AiOutlineMenu
                className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}
              />
            )}
          </div>
          <img
            className="w-[40px] hidden md:block"
            src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
            alt=""
          />
          <h1 className="text-[#5f6368] text-2xl">Friends</h1>
          <SearchInput />
        </div>
        <div className="flex items-center lg:space-x-5 space-x-2">
          {/* <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='w-10 h-10' alt="" /> */}
          <UserMenu className="w-10 h-10" />
        </div>
      </nav>

      {/* nav  */}

      <div className="flex justify-center md:justify-start">
        <div
          className={`absolute ${isOpen ? "lg:left-[305px]" : "lg:left-0"} ${
            isOpen ? "lg:px-0" : "lg:px-3"
          } duration-500 transition-all`}
        >
          <div className=" mt-10">
            <h3 className=" text-2xl">Your Favourite</h3>
          </div>
          <div className="lg:w-[75vw] w-screen  flex justify-start pt-0 md:pt-10 text-white">
            <Table className="">
              <thead className="">
                <tr className="">
                  <th className="hidden md:table-cell">Name</th>
                  <th className="">Email</th>
                  <th className="hidden lg:table-cell">Phone Number</th>
                  <th className="hidden lg:table-cell">Address</th>
                </tr>
              </thead>
              <tbody className="">{rows}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
