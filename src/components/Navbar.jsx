import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import {HiSearch} from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleNavbar } from "../redux/service/navbarSlice";
import SearchInput from "./SearchInput";
import UserMenu from "../components/UserMenu"
import { useState } from "react";

const Navbar = () => {
	const [click,setClick] = useState(true)
	const isOpen = useSelector((state) => state.navbar.isOpen);
	const dispatch = useDispatch();

	return (
		<>
			{/* NAVBAR */}
			{/* <>
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
				</div>
				< className="flex items-center lg:space-x-5 space-x-2">
					{/* <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='w-10 h-10' alt="" /> */}
					{/* <UserMenu className="w-10 h-10" /> */}
				{/* </div> */}
			{/* </nav> */}
			{/* </> */}
			<nav className='bg-white p-2 flex items-center w- justify-between space-x-5 cursor-pointer'>
           <div className="flex items-center space-x-3">
            <div onClick={() => dispatch(toggleNavbar())} className="">
              {
                isOpen ? 

              <AiOutlineMenu className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/> 
              :
              <AiOutlineMenu className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/>
              }
            </div>
           <img className='w-[40px] hidden md:block' src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png" alt="" />
           <h1 className='text-[#5f6368] text-2xl'>Friends</h1>
           {/* <div className="lg:space-x-24">
           <HiSearch onClick={() => setClick(!click)} className='absolute lg:top-[13px] md:top-[9px] top-[3px] lg:ms-[7rem] md:ms-3 hover:bg-[#3c404314] cursor-pointer w-12 h-12 lg:w-10 lg:h-10 p-3 hover:rounded-full duration-100'/><input type="text" placeholder='Search' className={`lg:w-[600px] md:w-[400px] w-[12rem] p-3 bg-[#3c404314] outline-none rounded-lg md:px-16 pe-1 cursor-pointer absolute top-[5px] left-0 md:static bg-white ms-2 lg:ms-auto shadow shadow-gray-950 ${click ? "hidden" : "block"} md:bg-transparent md:block`}/> 
           <AiOutlineClose onClick={() => setClick(!click)} className={`absolute top-[20px] left-[170px] md:static ${click ? "hidden" : "block"} md:hidden`}/>
           </div> */}
			<SearchInput />
           </div>
              <div className='flex items-center lg:space-x-5 space-x-2'>
                    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only"/>
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                      </div>
                    </label>
                <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='w-10 h-10' alt="" />
              </div>
        </nav>
			
			{/* NAVBAR */}

			{/* SIDEBAR */}
			<div
				className={`lg:w-[14rem] absolute top-0 lg:top-auto z-50 text-center bg-white shadow lg:shadow-none shadow-black h-screen lg:h-auto cursor-pointer transition-all duration-500 my-0 lg:my-5 ${
					isOpen ? "left-0" : "left-[-400px]"
				}`}
			>
				<Link to={"/create"}>
					<div
						className="lg:flex lg:flex-row hidden items-center space-x-2 p-2 ms-0 rounded-3xl shadow shadow-black hover:text-blue-800 hover:bg-blue-100 duration-300 transition-all hover:shadow-md hover:shadow-black"
		
					>
						<svg
							className="me-1"
							width="36"
							height="36"
							viewBox="0 0 36 36"
						>
							<path fill="#34A853" d="M16 16v14h4V20z"></path>
							<path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
							<path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
							<path fill="#EA4335" d="M20 16V6h-4v14z"></path>
							<path fill="none" d="M0 0h36v36H0z"></path>
						</svg>
						<h1 className="text-sm">Create Contacts</h1>
					</div>
				</Link>

				<div className="flex lg:hidden items-center ms-2 mt-2 space-x-3">
					<img
						src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png"
						className="h-6"
						alt=""
					/>
					<span className="text-2xl">Friends</span>
					<AiOutlineClose
						className="ms-2"
						onClick={() => dispatch(toggleNavbar())}
					/>
				</div>

				<div className="">
					<ul className="space-y-0 mt-6">
						<NavLink
							to="/"
							className="space-x-5 flex items-center p-3 px-5 text-sm"
						>
							<BsFillPersonFill className="" />
							<p className="">Contacts</p>
						</NavLink>

						<NavLink
							to="/other"
							className="space-x-5 flex items-center p-3 px-5"
						>
							<BiArchiveIn className="" />
							<p className="">Other contacts</p>
						</NavLink>
					</ul>
				</div>
			</div>
			{/* SIDEBAR */}
		</>
	);
};

export default Navbar;
