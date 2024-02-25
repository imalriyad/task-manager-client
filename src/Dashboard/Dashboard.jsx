import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { MdMenuOpen } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import useTask from "../Hooks/useTask";
import Task from "./Task";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [, refetch] = useTask();
  const [taskType, setTaskType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosPubic = useAxios();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSelect = (e) => {
    setTaskType(e.target.value);
  };
  const navigate = useNavigate();
  const [isOpen, setMenu] = useState(false);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("🎊Successfully Logout!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`${error.message.slice(17).replace(")", "")}`);
      });
  };

  const onSubmit = async (data) => {
    const deadline = selectedDate;
    const title = data?.title;
    const description = data?.description;
    const email = user?.email;
    const newTask = {
      deadline,
      title,
      description,
      tag: taskType,
      email,
    };
    const res = await axiosPubic.post("/create-task", newTask);
    if (res.data.insertedId) {
      const modal = document.getElementById("my_modal_3");
      modal.close();
      toast.success("Task Added Successfully 🎊");
      refetch();
      reset();
    }
  };

  return (
    <div className="flex justify-between">
      <aside
        className={`list-none p-10 min-w-[250px]  text-base-100 bg-neutral min-h-screen ${
          isOpen ? "block " : "hidden"
        } md:block`}
      >
        <li className="text-2xl mb-10 border">TaskManger</li>

        <div className=" flex flex-col gap-4">
          <NavLink to={"/"} className="flex text-lg gap-3 items-center">
            <FaHome className="text-xl" /> Home
          </NavLink>

          <div className="dropdown cursor-pointer dropdown-end">
            <div tabIndex={0} className="m-1 flex items-center gap-2">
              <img
                src={user?.photoURL}
                className="w-[30px] h-[30px]  object-cover rounded-full"
                alt=""
              />{" "}
              <span className="flex-col flex">
                <h1 className="text-sm">{user?.displayName}</h1>
                <h1 className="text-xs">{user?.email}</h1>
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link to={"/dashboard"} className="btn btn-sm btn-neutral">
                Dashboard
              </Link>
              <li
                onClick={handleLogout}
                className="btn mt-2 btn-sm btn-neutral"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div className={`text-neutral px-4 w-full bg-[#F2F2F2] `}>
        <div className="md:hidden block pt-4 ">
          <div className="flex w-full justify-between">
            <div>
              <li
                className={`text-3xl ${
                  isOpen ? "hidden" : "block"
                } list-none mb-10`}
              >
                TaskManger
              </li>
            </div>
            <div onClick={() => setMenu(!isOpen)}>
              {!isOpen ? (
                <MdMenuOpen className="text-4xl cursor-pointer"></MdMenuOpen>
              ) : (
                <IoCloseSharp className="text-4xl btn btn-neutral btn-sm btn-circle cursor-pointer"></IoCloseSharp>
              )}
            </div>
          </div>
        </div>
        <span className={`${isOpen ? "hidden" : "block"}`}>
          {" "}
          <Outlet></Outlet>
          {pathname === "/dashboard" && <Task></Task>}
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn bg-green-500 hover:bg-green-500 btn-sm absolute md:bottom-8 bottom-4"
          >
            Create New Task <FaRegEdit className="text-xl" />{" "}
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box h-[70vh]">
              <form method="dialog">
                <button className="btn btn-neutral btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h1 className="text-xl">Add a New Task</h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:grid space-y-3 md:space-y-0 grid-cols-2 gap-4 md:pt-10 pt-5"
              >
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Task Tittle"
                  className="input focus:outline-none input-bordered text-xs input-sm w-full "
                />{" "}
                {errors.title?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Task Title is required
                  </p>
                )}
                <select
                  value={taskType}
                  onChange={handleSelect}
                  className="select select-sm select-bordered w-full text-xs focus:outline-none"
                >
                  <option selected>Task Type</option>
                  <option value="todo">To Do</option>
                  <option value={"ongoing"}>OnGoing</option>
                  <option value={"complete"}>Completed</option>
                </select>
                <textarea
                  rows={6}
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered  w-full focus:outline-none col-span-2 text-xs"
                  placeholder="Task Description"
                ></textarea>{" "}
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm">
                    Task Description is required
                  </p>
                )}
                <h1 className="">Pick The Deadline</h1>
                <DatePicker
                  showIcon
                  toggleCalendarOnIconClick
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />{" "}
                <button
                  type="submit"
                  className=" w-full col-span-2 btn-neutral btn  btn-sm "
                >
                  Add Task
                </button>
              </form>
            </div>
          </dialog>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
