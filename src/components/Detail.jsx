import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/Api/contactListApi";
import { Loader } from "@mantine/core";
import a1 from "../images/avator1.jpeg";
import {
  BsTelephone,
  BsQuestionOctagon,
} from "../../node_modules/react-icons/bs";
import { GoMail } from "../../node_modules/react-icons/go";
import { SlPlus } from "../../node_modules/react-icons/sl";
import { RxTwitterLogo } from "../../node_modules/react-icons/rx";
import gmail from "../images/gmail.svg";
import facebook from "../images/facebook.svg";
import twitter from "../images/twitter.svg";
import {
  AiOutlineStar,
  AiOutlinePrinter,
} from "../../node_modules/react-icons/ai";
import { BsThreeDotsVertical } from "../../node_modules/react-icons/bs";
import { TfiExport } from "../../node_modules/react-icons/tfi";
import { FiSettings } from "../../node_modules/react-icons/fi";
import { BiHelpCircle } from "../../node_modules/react-icons/bi";

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
    <div>
      {/* navbar */}
      <nav className="bg-white shadow flex items-center justify-around py-3 top-0 fixed w-full ">
        <div className=" flex items-center">
          <img
            className="w-[40px] hidden md:block"
            src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
            alt=""
          />
          <h1 className=" text-2xl font-sans font-bold text-blue-400">
            Friends
          </h1>
          <div className=" border px-4 py-1 ms-6 rounded-full hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className=" outline-none "
            />
          </div>
        </div>
        <div className="flex items-center">
          <BiHelpCircle className=" text-gray-600 text-lg" />
          <FiSettings className=" text-gray-600 text-lg mx-3" />
          <div className=" w-12 h-12 ms-5 rounded-full bg-blue-600"></div>
        </div>
      </nav>

      <div className=" bg-white  px-10">
        <div className=" flex flex-col gap-10 w-full">
          {/* Avator */}
          <div className=" img flex flex-col md:flex-row justify-center gap-14 items-center mt-12">
            <img
              src={a1}
              alt=""
              className=" w-60 h-60 object-cover mt-12 rounded-full"
            />
            <div className=" flex flex-col gap-3">
              <p className=" font-semibold text-2xl mb-3 mt-12 text-gray-700 font-sans tracking-wide">
                {data.contact.name}
              </p>
              <div>
                <button className=" flex items-center shadow py-2 px-4 font-sans text-gray-500 font-normal border border-gray-200 rounded">
                  Add Label
                  <SlPlus className=" ms-2 text-gray-700" />
                </button>
              </div>
              <div className="flex items-center mt-10">
                <AiOutlineStar className=" text-gray-600 text-lg" />
                <AiOutlinePrinter className=" text-gray-600 text-lg mx-2" />
                <TfiExport className=" text-gray-600 text-lg" />
                <Link to={`/edit/:${data.contact.id}`}>
				<button className=" font-sans font-bold bg-slate-700 ms-2 text-white px-4 py-2 leading-4 rounded">
                  Edit
                </button>
				</Link>
              </div>
            </div>
          </div>
          {/* info & interaction */}
          <div className=" flex flex-col md:flex-row justify-center gap-5">
            {/* contact info */}
            <div >
				<div className=" shadow px-4 py-6 border w-auto md:w-[500px]">
					<p className=" h-6 font-sans font-semibold">Contact info</p>
					<div className=" mt-4">
					<div className=" flex items-center">
						<BsTelephone className=" inline font-bold me-3 text-gray-500" />
						<a
						href="#"
						className=" text-gray-700 font-sans font-medium">
						{data?.contact?.phone}
						</a>
					</div>
					<div className=" flex items-center">
						<GoMail className=" inline font-bold me-3 text-gray-500" />
						<a
						href="#"
						className=" text-gray-700 font-sans font-medium">
						{data?.contact?.name}@gmail.com
						</a>
					</div>
					<div className=" flex items-center">
						<RxTwitterLogo className=" inline font-bold me-3 text-gray-500" />
						<a
						href="#"
						className=" text-gray-700 font-sans font-medium">
						https://twitter.com/{data?.contact?.name}
						</a>
					</div>
					</div>
				</div>
			</div>
            {/* recent interaction */}
            <div>
              <div className="  shadow px-4 py-6 border md:w-[450px]">
                <p className=" h-6 font-sans font-semibold">
                  Recent Interaction
                </p>
                <div className=" mt-4">
                  <div className=" flex items-center my-2">
                    <img src={gmail} alt="" className=" w-6 me-3" />
                    <p className=" text-gray-500 font-sans font-normal text-sm">
                      how is going today Gilb?
                    </p>
                  </div>
                  <div className=" flex items-center my-2">
                    <img src={twitter} alt="" className=" w-6 me-3" />
                    <p className=" text-gray-500 font-sans font-normal text-sm">
                      {" "}
                      sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className=" flex items-center my-2">
                    <img src={gmail} alt="" className=" w-6 me-3" />
                    <p className=" text-gray-500 font-sans font-normal text-sm">
                      {" "}
                      ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <img src={facebook} alt="" className=" w-6 me-3" />
                    <p className=" text-gray-500 font-sans font-normal text-sm">
                      amet consectetur adipisicing elit. Libero in corporis
                      voluptate.
                    </p>
                  </div>
                </div>
              </div>
			  {/* history */}
			<div className="  my-5 flex justify-start flex-nowrap">
				<div>
					<span className=" h-6 font-sans font-normal text-gray-500">
				history
				<BsQuestionOctagon className="text-gray-500 inline-block ms-2 mb-1" />
					</span>
					<div className=" mt-4">
					<pre className=" font-sans font-normal text-sm text-gray-700">
						last edited at{" "}
						<span className=" text-gray-500 text-sm font-sans">
						{" "}
						{data.contact.updated_at}
						</span>
					</pre>
					<pre className=" font-sans font-normal text-sm text-gray-700">
						Added to Contact{" "}
						<span className=" text-gray-500 text-sm font-sans">
						Today,12:20 PM
						</span>
					</pre>
					</div>
				</div>
			</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Detail;
