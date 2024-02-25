import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";

const Google = () => {
  const { githubLogin, googleLogin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const handleGithub = () => {
    githubLogin()
      .then(async (res) => {
        const newUser = {
          email: res.user.email,
          photoUrl: res.user.photoURL,
          name: res.user.displyName,
        };
        const response = await axiosPublic.post("/create-user", newUser);
        if (response.status === 201) {
          toast.error("user already exist");
        }
        if (response.data.insertedId) {
          toast.success("Login Successfully! 🎉");
          navigate(state ? state : "/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGoogle = () => {
    googleLogin()
      .then(async (res) => {
        const newUser = {
          email: res.user.email,
          photoUrl: res.user.photoURL,
          name: res.user.displayName,
        };
        axiosPublic.post("/create-user", newUser);
        toast.success("Login Successfully! 🎉");
        navigate(state ? state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="flex items-center gap-2">
      <button onClick={handleGoogle} className="btn btn-sm w-full ">
        <img
          src="https://i.postimg.cc/jdCrbHMW/Logo-google-icon-PNG.png"
          alt=""
          className="w-[15px]"
        />
        Google
      </button>{" "}
      <button onClick={handleGithub} className="btn btn-sm w-full ">
        <img
          src="https://i.postimg.cc/YSpfTxfk/github-logo.png"
          alt=""
          className="w-[15px]"
        />
        Github
      </button>
    </div>
  );
};

export default Google;
