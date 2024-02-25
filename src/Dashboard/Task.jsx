import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useTask from "../Hooks/useTask";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import useAxios from "../Hooks/useAxios";

const Task = () => {
  const [task, refetch] = useTask();
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [filterTask, setFilterTask] = useState([]);
  const [toDoTask, setToDoTask] = useState([]);
  const [onGoingTask, setOnGoingTask] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);

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

  return (
    <div>
      <h1 className="md:py-2 text-xl">Welcome Back, {user?.displayName}</h1>
      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        <div className="">
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

      <div className=" pt-4 items-start justify-between gap-2">
        <div className="w-full relative gap-4 md:grid grid-cols-3 ">
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box md:p-10">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Title: {filterTask?.title}</h3>
              <p className="py-4">{filterTask?.description}</p>
              <p>
                <span className="font-semibold">Deadline</span>:{" "}
                {filterTask?.deadline?.slice(0, 10)}{" "}
              </p>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Task;
