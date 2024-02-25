import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useTask from "../Hooks/useTask";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import useAxios from "../Hooks/useAxios";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";

const Task = () => {
  const [task, refetch] = useTask();
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [filterTask, setFilterTask] = useState([]);
  const [toDoTask, setToDoTask] = useState([]);
  const [onGoingTask, setOnGoingTask] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const toDo = task?.filter((item) => item.tag === "todo");
    setToDoTask(toDo);
    const ongoing = task?.filter((item) => item.tag === "ongoing");
    setOnGoingTask(ongoing);
    const complete = task?.filter((item) => item.tag === "complete");
    setCompleteTask(complete);
  }, [task]);

  const openModal = (taskId) => {
    const taskDetails = task.find((task) => task._id === taskId);
    setFilterTask(taskDetails);
    document.getElementById("my_modal_4").showModal();
  };

  // Handle Delete
  const handleDeleteTask = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Task",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosPublic.delete(`/delete-task/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            swal("Poof! Your Task file has been deleted!", {
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // Handle task type update
  const handleTaskTag = async (_id, tag) => {
    document.getElementById("my_modal_4").close();
    swal({
      title: "Are you sure?",
      text: "Once update, you will not be able to undo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosPublic.put(`/update-tag/${_id}`, { tag }).then((res) => {
          if (res.data.modifiedCount > 0) {
            swal("Poof! Your Task tag updated", {
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // handleModalforTaskUpdate
  const handleModalforTaskUpdate = () => {
    document.getElementById("my_modal_5").showModal();
    document.getElementById("my_modal_4").close();
  };

  // Update modal Submission
  const onSubmit = async (data) => {
    const deadline = selectedDate;
    const title = data?.title;
    const description = data?.description;
    const updateTask = {
      deadline,
      title,
      description,
    };
    const res = await axiosPublic.patch(
      `/update-task/${filterTask._id}`,
      updateTask
    );
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      const modal = document.getElementById("my_modal_5");
      modal.close();
      toast.success("Task Updated Successfully 🎊");
      refetch();
      reset();
    }
  };

  return (
    <div>
      <h1 className="md:py-2 text-xl">Welcome Back, {user?.displayName}</h1>
      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        {/* Todo task */}
        <div>
          <div className="bg-white mb-4 p-3 rounded-sm w-full border-t-2 border-orange-500 font-medium text-sm">
            <h1>To do</h1>
          </div>
          <div className="space-y-4">
            {toDoTask?.map((item) => (
              <div
                key={item._id}
                className="bg-base-100 rounded-md text-neutral cursor-pointer relative p-4"
              >
                <h1 className="text-sm flex items-start gap-x-1 font-medium">
                  <span className="font-bold"></span>
                  <IoMdInformationCircleOutline className="text-xl " />
                  {item.title}
                </h1>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => openModal(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <IoEyeSharp />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OnGoing task list */}
        <div className="flex flex-col">
          <div className="bg-white p-3 mb-4 rounded-sm w-full border-t-2 border-purple-500  font-medium text-sm">
            <h1>On Going</h1>
          </div>
          <div className="space-y-4">
            {onGoingTask?.map((item) => (
              <div
                key={item._id}
                className="bg-base-100 rounded-md text-neutral cursor-pointer relative p-4"
              >
                <h1 className="text-sm flex items-start gap-x-1 font-medium">
                  <span className="font-bold"></span>
                  <IoMdInformationCircleOutline className="text-xl " />
                  {item.title}
                </h1>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => openModal(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <IoEyeSharp />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complte task list */}
        <div className="flex flex-col">
          <div className="bg-white p-3 mb-4 rounded-sm w-full border-t-2 border-green-500 font-medium text-sm">
            <h1>Complete</h1>
          </div>
          <div className="space-y-4">
            {completeTask?.map((item) => (
              <div
                key={item._id}
                className="bg-base-100 rounded-md text-neutral cursor-pointer relative p-4"
              >
                <h1 className="text-sm flex items-start gap-x-1 font-medium">
                  <span className="font-bold"></span>
                  <IoMdInformationCircleOutline className="text-xl " />
                  {item.title}
                </h1>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => openModal(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <IoEyeSharp />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(item._id)}
                    className="btn hover:bg-green-500 btn-xs"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open modal for see task details */}
      <div className=" pt-4 items-start justify-between gap-2">
        <div className="w-full relative gap-4 md:grid grid-cols-3 ">
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box bg-gray-50 md:p-10">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <button
                onClick={handleModalforTaskUpdate}
                className="btn btn-sm btn-circle btn-ghost absolute left-4 top-2"
              >
                <FaEdit className="text-xl" />
              </button>
              <h1 className="text-center text-xl border-neutral border-b-2  pb-2">
                Task Details
              </h1>
              <h3 className="font-bold text-lg pt-2">
                Title: {filterTask?.title}
              </h3>
              <p className="py-4">{filterTask?.description}</p>
              <p className="badge-warning badge">
                <span className="font-semibold">Due</span>:{" "}
                {filterTask?.deadline?.slice(0, 10)}{" "}
              </p>
              <p className="flex flex-wrap pt-4 gap-3">
                {filterTask?.tag !== "complete" && (
                  <button
                    onClick={() => handleTaskTag(filterTask._id, "complete")}
                    className="badge badge-neutral"
                  >
                    Mark as Complete
                  </button>
                )}
                {filterTask?.tag !== "ongoing" && (
                  <button
                    onClick={() => handleTaskTag(filterTask._id, "ongoing")}
                    className="badge badge-neutral"
                  >
                    Mark as Ongoing
                  </button>
                )}
                {filterTask?.tag !== "todo" && (
                  <button
                    onClick={() => handleTaskTag(filterTask._id, "todo")}
                    className="badge badge-neutral"
                  >
                    Mark as To DO
                  </button>
                )}
              </p>
            </div>
          </dialog>
        </div>

        {/* modal for updating task */}
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box bg-gray-50 md:p-10">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h1 className="text-center text-xl border-neutral border-b-2  pb-2">
              Task Update
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" space-y-3  gap-4 md:pt-10 pt-5"
            >
              <input
                type="text"
                {...register("title")}
                placeholder="Task Tittle"
                value={filterTask.title}
                onChange={(e) =>
                  setFilterTask({ ...filterTask, title: e.target.value })
                }
                className="input focus:outline-none input-bordered text-xs input-sm w-full "
              />{" "}
              {errors.title?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm">
                  Task Title is required
                </p>
              )}
              <textarea
                rows={6}
                {...register("description")}
                value={filterTask.description}
                onChange={(e) =>
                  setFilterTask({ ...filterTask, description: e.target.value })
                }
                className="textarea textarea-bordered  w-full focus:outline-none col-span-2 text-xs"
                placeholder="Task Description"
              ></textarea>{" "}
              {errors.password?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm">
                  Task Description is required
                </p>
              )}
              <h1 className="">Pick The Deadline</h1>
              <ReactDatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />{" "}
              <button
                type="submit"
                className=" w-full col-span-2 btn-neutral btn  btn-sm "
              >
                Update Task
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Task;
