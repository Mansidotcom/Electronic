import { Button } from "@/components/ui/button";
import { setCart } from "@/redux/productSlice";
import { store } from "@/redux/Store";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  REAL USER FROM REDUx
  const user = useSelector((state) => state.user?.user);
  const {cart} = useSelector(store=>store.product)

  console.log("STATE 👉", useSelector(state => state));

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false

  const logoutHandler = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        } 
      );

      // CLEAR STATE + TOKEN
      dispatch(setUser(null));
      dispatch(setCart({ items: [], totalPrice:0 }));
      localStorage.removeItem("accessToken");

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  console.log(cart)

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-pink-600" />
          <span className="text-2xl font-bold text-pink-600">Ekart</span>
        </div>

        {/* NAV */}
        <nav className="flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>

            {/* NAME SHOWS HERE */}
            {user && (
              <li>
                <Link to={`/profile/${user._id}`}>Hello, {user.firstname}</Link> 
              </li>
            )
            }

              {admin && (
              <li>
                <Link to={`/dashboard/sales}`}>Dashboard</Link> 
              </li>
            )
            }
          </ul>

          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* LOGOUT CLICK FIXED */}

          {user ? (
            <Button
              type="button"
              onClick={logoutHandler}
              className="bg-pink-600 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-600 text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
