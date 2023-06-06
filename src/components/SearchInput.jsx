import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setSearched } from "../redux/service/contactSlice";

export default function SearchInput() {
	const dispatch = useDispatch();

	const searched = useSelector((state) => state.contactSlice.searched);
	const [click, setClick] = useState(true);

	const handleChange = (e) => {
		dispatch(setSearched(e.target.value));
	};

	const handleSearchIconClick = () => {
		setClick(!click);
	};

	const handleCloseIconClick = () => {
		setClick(!click);
	};

	return (
		<div className="lg:space-x-24">
			<HiSearch
				onClick={handleSearchIconClick}
				className="absolute lg:top-[13px] md:top-[9px] top-[3px] lg:ms-[7rem] md:ms-3 hover:bg-[#3c404314] cursor-pointer w-12 h-12 lg:w-10 lg:h-10 p-3 hover:rounded-full duration-100"
			/>
			<input
				type="text"
				placeholder="Search Name"
				value={searched}
				onChange={handleChange}
				className={`lg:w-[600px] md:w-[400px] w-[12rem] p-3 bg-[#3c404314] outline-none rounded-lg md:px-16 pe-1 cursor-pointer absolute top-[5px] left-0 md:static bg-white ms-2 lg:ms-auto shadow shadow-gray-950 ${
					click ? "hidden" : "block"
				} md:bg-transparent md:block`}
			/>
			<AiOutlineClose
				onClick={handleCloseIconClick}
				className={`absolute top-[20px] left-[170px] md:static ${
					click ? "hidden" : "block"
				} md:hidden`}
			/>
		</div>
	);
}
