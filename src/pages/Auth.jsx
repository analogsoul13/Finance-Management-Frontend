import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../services/allApis";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const changeAuth = () => {
    setIsLogin(!isLogin)
  }

  const handleRegister = async () => {
    const { email, name, password } = formData
    if(!email || !name || !password){
        toast.warning("All fields required")
    } else {
        const res = await registerApi(formData)
        console.log(res)
        if(res.status == 201) {
            toast.success("Registration Succesful!")
            changeAuth()
            setFormData({
                email:"", name:"",password:""
            })
        } else {
            if(res.data){
                toast.error(res.data)
            }else{
                toast.error("Something went wrong!")
            }
        }
    }

  }

  const handleLogin = async () => {
    const {email, password } = formData
    if(!email || !password){
        toast.warning("All fields required")
    } else {
        const res = await loginApi(formData)
        if(res.status == 200) {
            toast.success("Login Succesful!!")
            setFormData({
                email:"", password:""
            })
            console.log(res)
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('name',res.data.name)
            nav('/dashboard')
            setIsLogin(true)
        }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={changeAuth}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {isLogin ? "Create new account" : "Sign in to existing account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
