import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Google = () => {
  const { githubLogin, googleLogin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleGithub = () => {
    githubLogin()
      .then(() => {
        toast.success("Login Successfully! 🎉");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGoogle = () => {
    googleLogin()
      .then(() => {
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
