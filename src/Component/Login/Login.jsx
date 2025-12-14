import React, { useContext, useState } from 'react'

import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';

export const Login = () => {

const {insertUserToken} = useContext (authContext)
  const [isLouding, setIsLouding] = useState(false)


  const navigate = useNavigate()


  const scheme = z.object({

    email: z.email("invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),

    // z.coerce.date()  دي بتحول اي حاجه  اوبجكت او دايت  لسنرنج


  });




  async function signup(values) {

    setIsLouding(true)


    try {

      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", values);

      console.log(data);

      toast.success(data.message, {
        style: {
          background: "#0006",
          color: "white"
        }
      });
      localStorage.setItem("token" , data.token);
      insertUserToken(data.token);

      console.log(data.token);
      

      navigate("/");
      setIsLouding(false);


    } catch (e) {
      // console.log(e.response.data.error);
      toast.error(e.response.data.error, {
        style: {
          background: "#0006",
          color: "white"
        }
      });
      setIsLouding(false)

    }


    console.log(values);



  }

  const { register, handleSubmit, formState: { errors, touchedFields },/*setError    لما اكون عايزه اطلع ايرورر لمعادله معينه */  getValues, watch } = useForm({
    mode: "onBlur",
    defaultValues: {


      email: "",
      password: "",


    },

    resolver: zodResolver(scheme)
  });
  return (
    <section className='my-10 p-10 mx-auto w-1/2 shadow-2xl  shadow-blue-500 dark:shadow-white/20'>
      <h1 className=' text-center text-bold text-4xl mb-4'>Login Bage</h1>

      <form onSubmit={handleSubmit(signup)}>


        {/* input Email  */}
        <input type="email" placeholder="Email" className="input input-inf w-full mb-4 mt-5" id='email' {...register("email",/* {
          required: {
            value: true,
            message: "email is required"
          },

          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "invalid email"
          }

        }*/)} />
        {errors?.email && touchedFields?.email && <p className='text-red-500 mb-2'>{errors?.email?.message}</p>}
        {/* input Password  */}
        <input type="password" placeholder=" Password " className="input input-inf w-full mb-4" id="Password" {...register("password",/* {
          required: {
            value: true,
            message: "password is required"
          },

          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
            message: "pass mast start uppercase"
          }
        }*/)} />
        {errors?.password && touchedFields?.password && <p className='text-red-500 mb-2'>{errors?.password?.message}</p>}




        <button className="btn btn-soft btn-info mt-5 w-full" type='submit'> {isLouding ? <i className="fa-solid fa-spinner fa-spin text-light"></i> : "Login"}</button>


      </form>
    </section>
  )
}

