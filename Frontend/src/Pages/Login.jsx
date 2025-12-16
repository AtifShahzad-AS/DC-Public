
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/Shopcontext";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [currentstate, setcurrentstate] = useState("Login");
  const { token, settoken, backendurl, navigate } = useContext(ShopContext);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  const handlegooglelogin = async (response) => {
    try {
      const res = await axios.post(backendurl + "/api/auth/google", {
        credential: response.credential
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        settoken(res.data.token);
        navigate("/");
      }
    } catch (err) {
      toast.error("Google login failed");
    }
  };


  useEffect(() => {
    // console.log("Google Client ID:", GOOGLE_CLIENT_ID);

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handlegooglelogin
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);


  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (currentstate === "Signup") {
        const response = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }
  }, []);
  


  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">

      {/* LEFT SECTION */}
      <div className="w-full lg:w-1/2 cursor-default flex flex-col sm:px-8 px-6 py-3 bg-white h-screen ">

        {/* TOP BAR — LOGO LEFT, CONTINUE WITHOUT LOGIN RIGHT */}
        <div className="flex justify-between items-center mb-2">

          {/* LOGO */}
          <Link to="/" className="inline-block">
            <img className='w-12 sm:w-15 md:17 lg:w-20 ' src={assets.glogo} alt="" />

          </Link>

          {/* CONTINUE WITHOUT LOGIN */}

          <Link
            to="/"
            className="px-2 sm:px4 py-1 sm:py-2 bg-gray-100 text-black rounded-lg text-sm 
             font-semibold border border-gray-300 
             hover:bg-gray-200 transition"
          >
            Continue without login
          </Link>



        </div>


        {/* FORM BOX */}
        <div className="w-full  md:w-1/2  lg:w-4/6 bg-white lg:bg-none px-3 py-3  lg:py-5  rounded-md  shadow-xl lg:shadow-none border lg:border-none   m-auto flex flex-col">

          {/* Heading */}
          <h2 className="sm:text-2xl text-lg font-bold text-gray-900 mb-1 text-center">
            {currentstate === "Login" ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-gray-500 text-center text-sm mb-3 sm:mb-4 ">
            Please enter your details to continue
          </p>

          <form onSubmit={onsubmithandler} className="flex flex-col gap-3">

            {/* Google Login */}
            <div id="googleSignInDiv" className="gap-0" ></div>

            {/* OR separator  */}
             <div className="flex items-center  lg:my-1">
              <hr className="flex-grow border-t border-gray-300" />
              <span className=" mx-2 text-gray-400 font-semibold text-sm">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Inputs */}
            {currentstate === "Signup" && (
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                required
                type="text"
                className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
                placeholder="Full Name"
              />
            )}

            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
              type="email"
              className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
              placeholder="Email Address"
            />

            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              required
              type="password"
              className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
              placeholder="Password"
            />

            {/* Links */}
            <div className="flex justify-between text-xs">
              {currentstate === "Login" && (
                <p className="hover:cursor-pointer text-black sm:text-sm">Forgot Password?</p>
              )}

              {currentstate === "Login" ? (
                <p
                  onClick={() => setcurrentstate("Signup")}
                  className="hover:cursor-pointer text-black sm:text-sm"
                >
                  Don’t have an account?
                </p>
              ) : (
                <p
                  onClick={() => setcurrentstate("Login")}
                  className="hover:cursor-pointer text-black sm:text-sm"
                >
                  Already have an account?
                </p>
              )}
            </div>

            {/* Sign In / Sign Up Button */}
            <button
              className="w-full py-2.5 font-bold text-white rounded-lg bg-blue-500 hover:cursor-pointer shadow-md text-sm"
            >
              {currentstate === "Login" ? "Sign In" : "Sign Up"}
            </button>

          </form>
        </div>
      </div>

      {/* RIGHT SECTION - IMAGE + TEXT */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={assets.b6}
          alt="Login Side"
          className="w-full h-full object-cover"
        />

        {/* CENTERED TEXT BLOCK */}
        <div className="
    absolute inset-0 
    flex flex-col 
    justify-center 
    items-center 
    text-center 
    px-6
    text-black 
    max-w-lg 
    mx-auto
    drop-shadow-lg
  ">
          <h2 className="text-4xl font-bold mb-4">
            Transform Your Home with Comfort
          </h2>

          <p className="text-lg leading-relaxed">
            Shop premium bedsheets, pillows, curtains, sofa covers & more —
            beautifully crafted for your lifestyle.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
