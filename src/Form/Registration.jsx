import { useState } from "react";
import { Link } from "react-router-dom";
import Google from "../Form/GoogleLogin";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import useAxios from "../Hooks/useAxios";
const imgBbUploadKEy = import.meta.env.VITE_APP_IMGBBKEY;
const photoUploadApi = `https://api.imgbb.com/1/upload?key=${imgBbUploadKEy}`;
/* eslint-disable react/no-unescaped-entities */
const Registration = () => {
  const { resgistration } = useAuth();
  const [isShow, setShow] = useState(false);
  const [occupation, setOccupation] = useState("");
  const axiosPublic = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelect = (e) => {
    setOccupation(e.target.value);
  };

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const imageFile = { image: data?.photourl[0] };
    const res = await axiosPublic.post(photoUploadApi, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const photoUrl = res.data?.data?.display_url;

    resgistration(email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: photoUrl,
        })
          .then(async () => {
            toast.success("Registration Successfully! 🎉");
          })
          .catch((err) =>
            toast.error(`${err.message.slice(17).replace(")", "")}`)
          );
      })
      .catch((err) => toast.error(`${err.message.slice(17).replace(")", "")}`));
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-4 md:py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <p className="text-center md:text-3xl text-xl font-medium  ">
            Sign up to your account and take control of your tasks🥳
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 "
          >
            <div>
              <label htmlFor="Name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Name"
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Name is required
                  </p>
                )}

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="mt-0 pt-0">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Email is required
                  </p>
                )}

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="Number" className="sr-only">
                Number
              </label>

              <div className="relative">
                <input
                  type="number"
                  {...register("number", { required: true })}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Number"
                />
                {errors.number?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Number is required
                  </p>
                )}

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={`${isShow ? "text" : "password"}`}
                  className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Password is required
                  </p>
                )}

                <span
                  onClick={() => setShow(!isShow)}
                  className="absolute cursor-pointer inset-y-0 end-0 grid place-content-center px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="md:flex gap-2 items-center">
              <div className=" md:pb-0 pb-4">
                <label htmlFor="type" className="sr-only">
                  Type
                </label>

                <div className="relative">
                  <select
                    value={occupation}
                    onChange={handleSelect}
                    className="select select-bordered w-full  focus:outline-none"
                  >
                    <option selected>
                      What is your occupation?
                    </option>
                    <option>Student</option>
                    <option>Teacher</option>
                    <option>Banker</option>
                    <option>Developer</option>
                    <option>Markter</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="password" className="sr-only">
                  Picture
                </label>

                <div className="relative">
                  <input
                    type="file"
                    {...register("photourl", { required: true })}
                    className="file-input w-full text-xs  focus:outline-none"
                  />{" "}
                  {errors.photourl?.type === "required" && (
                    <p role="alert" className="text-red-500 text-sm">
                      Photo is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg  bg-neutral px-5 py-3 text-sm font-medium text-white"
            >
              Sign up
            </button>

            <p className="text-center text-sm flex text-gray-600">
              Already have an account?
              <Link to={"/login"} className="underline ml-1 cursor-pointer">
                Sign in
              </Link>
            </p>
          </form>
          <div className="md:max-w-[220px] max-w-[140px]">
            {" "}
            <Google></Google>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
