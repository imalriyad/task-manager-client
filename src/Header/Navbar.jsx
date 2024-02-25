import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navbarRoutes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const NavbMenu = navbarRoutes?.map((item) => (
    <li key={item.path}>
      <NavLink to={item.path}>{item.name}</NavLink>
    </li>
  ));

  const handleLogout = () => {
    logout().then(() => {
      toast.success("🎊Successfully Logout!");
        navigate('/')
    }).catch((error) => {
      toast.error(`${error.message.slice(17).replace(")", "")}`)
    });
      
  };

  return (
    <div>
      <div className="navbar max-w-screen-xl md:px-6 mx-auto bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 font-medium  shadow bg-base-100 rounded-md border-neutral border w-52"
            >
              {NavbMenu}
            </ul>
          </div>
          <a className="md:text-3xl xl:text-4xl font-semibold text-2xl">
            TaskEase
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">{NavbMenu}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="m-1">
                <img
                  src={user.photoURL}
                  className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] cursor-pointer object-cover rounded-full"
                  alt=""
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to={"/dashboard"} className="btn btn-sm btn-neutral">
                  Dashboard
                </Link>
                <li onClick={handleLogout} className="btn mt-2 btn-sm btn-neutral">Logout</li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn btn-sm btn-neutral">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
