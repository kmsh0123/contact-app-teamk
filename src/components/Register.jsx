import { useGetRegisterMutation } from "../redux/Api/contactApi";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterSchema } from "../schemas/registerSchema";
import { useDispatch, useSelector } from "react-redux";
import "../style/login.css";
import "../style/glassmorphic.css";
import { toggleNavbar } from "../redux/service/navbarSlice";


const Register = () => {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [getRegister, { isLoading }] = useGetRegisterMutation();
  const dispatch = useDispatch();

  const form = useForm({
    validate: zodResolver(RegisterSchema),
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <div>
      <div className={` bg-transparent`}>
        <div className=" flex justify-center items-center h-screen">
          <div className=" md:space-x-8 lg:space-x-28 flex items-center p-5">
            <div>
              <div
                className={` overflow-hidden flex flex-col ${
                  isOpen ? "returnAni" : ""
                }`}
              >
                <img
                  className={` hidden md:flex ${isOpen ? "" : "jumpAni"}`}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-7964197-6381807.png?f=webp"
                  alt=""
                />
              </div>
              <div className=" hidden md:flex justify-center gap-[8px]">
                {isOpen ? (
                  <p className=" flex items-center select-none leftAni text-gray-600">
                    Already have an account?
                  </p>
                ) : (
                  <p className=" flex items-center select-none downAni text-gray-600">
                    Already have an account?
                  </p>
                )}

                <span onClick={() => dispatch(toggleNavbar())} className="">
                  {isOpen ? (
                    <button className=" select-none leftAni text-blue-700 border bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid glassmorphic border-t border-l rounded-lg p-2 cursor-pointer">
                      Log in here.
                    </button>
                  ) : (
                    <button className=" select-none upAni text-blue-700 border bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] glassmorphic border-solid border-t border-l rounded-lg p-2 cursor-pointer">
                      Log in here.
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <form
                onSubmit={form.onSubmit(async (values) => {
                  try {
                    const data = await getRegister(values);
                    console.log(data);
                    if (data?.data?.success === true) {
                      dispatch(toggleNavbar());
                    }
                  } catch (error) {
                    console.log(error);
                  }
                })}
                className={` xl:w-96 md:w-96 w-80 ${
                  isOpen ? "pointer-events-none" : null
                } flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg p-[1.8rem] md:p-[3.9rem] ${
                  isOpen ? "zAni" : "delayAni"
                }`}
              >
                <h2
                  className=" text-center justify-center text-gray-500 font-medium text-[32px]
      "
                >
                  <div
                    className={` container mx-auto ${
                      isOpen ? "endTypeAni" : "twoTypeAni"
                    }`}
                  >
                    Hello there!
                  </div>

                  <span
                    className={` grid  ${
                      isOpen ? "endAni" : "upAni"
                    } justify-center mt-[-6px] text-[13px]`}
                  >
                    Please sign in here to proceed.
                  </span>
                </h2>
                <TextInput
                  {...form.getInputProps("name")}
                  placeholder="Enter your name"
                  variant="filled"
                />
                <TextInput
                  {...form.getInputProps("email")}
                  placeholder="Enter your email"
                  variant="filled"
                />
                <PasswordInput
                  {...form.getInputProps("password")}
                  placeholder=" Enter your Password"
                  variant="filled"
                />
                <PasswordInput
                  {...form.getInputProps("password_confirmation")}
                  placeholder="Confirm your Password ..."
                  variant="filled"
                />

                <div className=" text-[13px] md:hidden flex justify-center gap-1 md:gap-[6px]">
                  {isOpen ? (
                    <p className=" select-none text-[13px] leftAni text-gray-600">
                      Already have an account?
                    </p>
                  ) : (
                    <p className=" select-none downAni text-gray-600">
                      Already have an account?
                    </p>
                  )}

                  <span onClick={() => dispatch(toggleNavbar())} className="">
                    {isOpen ? (
                      <p className=" select-none text-[13px] leftAni text-blue-700 cursor-pointer">
                        Log in here.
                      </p>
                    ) : (
                      <p className=" select-none upAni text-blue-700 cursor-pointer">
                        Login here.
                      </p>
                    )}
                  </span>
                </div>

                <button
                  disabled={isLoading && true}
                  type="submit"
                  className=" bg-red-600 text-white hover:bg-red-400 px-4 py-1 transition duration-300 rounded w-40 h-9 mx-auto block"
                >
                  {isLoading ? (
                    <Loader
                      className=" mx-auto my-auto block"
                      color="white"
                      size="sm"
                      variant="dots"
                    />
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
