import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { registerschema } from "./RegisterSchema";
import { registerAPI } from "../../Services/authService";
import { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const [isLoading, setisLoading] = useState(false)
  const [errMsg, seterrMsg] = useState("")
  const [succesMsg, setsuccesMsg] = useState("")
  const navigate = useNavigate()

  const {handleSubmit , register , formState: {errors} ,reset} = useForm({
    defaultValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""
    },
    resolver: zodResolver(registerschema),
    mode: "onBlur"
  }
  );


  async function handleRegistration (formdata){
    setisLoading (true)
    const data = await registerAPI(formdata)
    setisLoading (false)
    
    if(data.message == "success"){
      reset()
      setsuccesMsg(data.message)
      seterrMsg("")
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    }else{
      seterrMsg(data)
      setsuccesMsg("")
    }
  }


  return (
    <>
        <div className="max-w-xl mx-auto bg-gray-300/60 py-8 mt-10 shadow-2xl rounded-2xl ">
          <h1 className="text-center mb-6">Register Page</h1>
          <form className="w-3/4 mx-auto" onSubmit={handleSubmit(handleRegistration)}>
            <div className="flex flex-col gap-4">
              <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} variant="bordered" label="Name" type="text" {...register("name")} />

              <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register("email")} />

              <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register("password")} />

              <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} variant="bordered" label="Confirm Password" type="password" {...register("rePassword")} />

              <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} variant="bordered" label="Date Of Birth" type="date" {...register("dateOfBirth")} />

              <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant="bordered"  label="Gender" {...register("gender")}>
                <SelectItem key={"male"} >Male</SelectItem>
                <SelectItem key={"female"} >Female</SelectItem>
              </Select>

              <Button isLoading = {isLoading} type="submit" color="primary" variant="bordered" className="bg-blue-400 text-white " >Register</Button>

              {errMsg && <p className="text-center text-sm text-red-800 bg-red-400/30 rounded-xl p-2">{errMsg}</p>}
              {succesMsg && <p className="text-center text-sm text-green-800 bg-green-400/20 rounded-xl p-2">{succesMsg}</p>}

              <p className="ps-3">U already have an account? <Link className="text-blue-600" to={"/login"}>Login now </Link> </p>
            </div>
          </form>
        </div>
    </>
  );
}
