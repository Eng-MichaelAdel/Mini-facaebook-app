import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginschema } from './LoginSchema';
import { loginAPI } from "../../Services/authService";
import { authContext } from "../../Contexts/AuthContext";

export default function LoginPage() {

  const [isLoading, setisLoading] = useState(false)
  const [errMsg, seterrMsg] = useState("")
  const navigate = useNavigate()

  const {handleSubmit , register , formState: {errors} ,reset} = useForm({
    defaultValues:{
      email:"",
      password:"",
    },
    resolver: zodResolver(loginschema),
    mode: "onBlur"
  }
  );

  const {setisLoggedIn} = useContext(authContext)

  async function handleLogin (formdata){
    setisLoading (true)
    const data = await loginAPI(formdata)
    setisLoading (false)

    if (data.message == "success"){
      reset()
      seterrMsg("")
      localStorage.setItem("token" , data.token)
      setisLoggedIn(true);
      setTimeout(() => {
        const PathName = location.pathname
        navigate(PathName == "/login"? "/" : PathName)
      }, 1000);
    }else{
      seterrMsg(data)
    }
  }


  return (
    <>
        <div className="max-w-xl mx-auto bg-gray-300/60 py-8 mt-10 shadow-2xl rounded-2xl ">
          <h1 className="text-center mb-6">Login Page</h1>
          <form className="w-3/4 mx-auto" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-4">
              <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register("email")} />

              <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register("password")} />

              <Button isLoading = {isLoading} type="submit" color="primary" variant="bordered" className="bg-blue-400 text-white " >Login</Button>

              {errMsg && <p className="text-center text-sm text-red-800 bg-red-400/30 rounded-xl p-2">{errMsg}</p>}

              <p className="ps-3">U don't have an account? <Link className="text-blue-600" to={"/register"}>Signup now </Link> </p>
            </div>
          </form>
        </div>
    </>
  );
}
