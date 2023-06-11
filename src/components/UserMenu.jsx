import { Avatar, Loader, Menu, ScrollArea } from "@mantine/core";
import Cookies from "js-cookie";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import "../style/glassmorphic.css";
import { useGetLogOutMutation } from "../redux/Api/contactApi";
import { removeUser } from "../redux/service/authSlice";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = () => {
  const token = Cookies.get("token");

  const user = JSON.parse(Cookies.get("user"));

  const [getLogOut, { isLoading }] = useGetLogOutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    const { data } = await getLogOut(token);
    dispatch(removeUser());
    if (data?.success) {
      nav("/formPage");
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
          {/* <div className=" relative hover:bg-gray-600 w-12 h-12 rounded-[50%] bg-blue-200 text-gray-600 hover:text-gray-300">
            <p className=" absolute w-12 h-12 rounded-[50%] text-center mt-[4px] text-[27px] font-bold">
              {user?.name.substring(0, 1).toUpperCase()}
            </p>
          </div> */}
          <Avatar color="cyan" size="lg" radius="xl">
            {" "}
            <p className="text-3xl">
              {user?.name.substring(0, 1).toUpperCase()}
            </p>{" "}
          </Avatar>
        </Menu.Target>

        {/* dropdown is here. */}
        <Menu.Dropdown className=" mt-1 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg">
          <Menu.Item className=" hover:bg-transparent">
            <div className=" flex flex-col">
              <div className=" container mx-auto flex">
                {/* name */}
                <ScrollArea w={160} h={30} type="never">
                  <p
                    title="Scroll to see full name"
                    className=" text-gray-600 font-medium text-2xl pb-1"
                  >
                    {user?.name}
                  </p>
                </ScrollArea>
                {/* Enter arrow */}
                <Link to={"/userProfile"}>
                  <div
                    title="To User Profile"
                    className=" relative ml-[-18px] mt-[1px] bg-transparent w-9 h-9 rounded-[50%] items-center hover:bg-gray-400 hover:text-white"
                  >
                    <BsBoxArrowInRight className=" absolute mt-[6px] ml-[3px] text-2xl " />
                  </div>
                </Link>
              </div>
              {/* email */}
              <ScrollArea w={170} type="never">
                <p
                  title="Scroll to see full email"
                  className=" overflow-hidden text-gray-600 mb-[18px] font-medium"
                >
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
              className=" bg-red-600 text-white text-[15px] px-4 mb-2 py-1 hover:bg-red-400 rounded w-25 h-9 mx-auto block"
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
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default UserMenu;
