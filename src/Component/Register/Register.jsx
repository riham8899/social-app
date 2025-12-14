import React, { useState } from 'react';
import stylee from './Register.module.css';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export const Register = () => {


  const [isLouding, setIsLouding] = useState(false)

  const navigate = useNavigate()

  const scheme = z.object({
    name: z.string().min(3, "min length 3").max(15, "max lengh 15"),
    email: z.email("invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    dateOfBirth: z.coerce.date().refine(function (value) {
      const currentYear = new Date().getFullYear();
      const userYear = value.getFullYear();

      if (currentYear - userYear >= 18) {
        return true;

      }

      return false


    }, "mast user > 18"),

    // z.coerce.date()  دي بتحول اي حاجه  اوبجكت او دايت  لسنرنج
    gender: z.enum(["female", "male"]),


  }).refine(function (values) {
    if (values.password === values.rePassword) {
      return true;
    }
    return false
  }, " repass doesnot match ");



  async function signup(values) {

    setIsLouding(true)


    try {

      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", values);

      console.log(data);

      toast.success(data.message, {
        style: {
          background: "#0006",
          color: "white"
        }
      });

      navigate("/login")
      setIsLouding(false)


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

      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",

    },

    resolver: zodResolver(scheme)
  });





  return (
    <section className='my-10 p-10 mx-auto w-1/2 shadow-2xl  shadow-blue-500 dark:shadow-white/20'>
      <h1 className=' text-center text-bold text-4xl'>Register Bage</h1>

      <form onSubmit={handleSubmit(signup)}>
        {/* input name  */}
        <input type="text" placeholder="Name" className="input input-inf w-full mb-4 mt-5" id='name'{...register("name", /*{
          required: {
            value: true,
            message: "name is required"
          },
          minLength: {
            value: 3,
            message: "min  length 3"
          },
          maxLength: {
            value: 15,
            message: "max  length 15"

          }
        }*/)} />

        {errors?.name && touchedFields?.name && <p className='text-red-500 mb-2'>{errors?.name?.message}</p>}
        {/* input Email  */}
        <input type="email" placeholder="Email" className="input input-inf w-full mb-4" id='email' {...register("email",/* {
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
        {/* input re Password   */}
        <input type="password" placeholder="Repassword " className="input input-inf w-full mb-4" id="rePassword" {...register("rePassword",/* {
          required: {
            value: true,
            message: "repassword is required"
          },

          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
            message: "repass mast start uppercase"
          },
          validate: function (value) {
            if (value === getValues("password")) {
              return true
            }

            return "pass doesnt match"

          }
        }*/)} />
        {errors?.rePassword && touchedFields?.rePassword && <p className='text-red-500 mb-2'>{errors?.rePassword?.message}</p>}


        {/* input date    */}
        <input type="date" placeholder="Date" className="input input-inf w-full mb-4" id="dateOfBirth" {...register("dateOfBirth",/* {
          required: {
            value: true,
            message: "data is required"
          },
          valueAsDate: true

          ,
          validate: function (value) {
            const currentYear = new Date().getFullYear();
            const userYear = value.getFullYear();

            if (currentYear - userYear >= 18) {
              return true;

            }

            return "18 > user";
          }
        }*/)} />
        {errors?.dateOfBirth && touchedFields?.dateOfBirth && <p className='text-red-500 mb-2'>{errors?.dateOfBirth?.message}</p>}
        {/* gender */}
        <div>
          <label htmlFor="male" className='px-2'>male</label>
          <input id='male' type="radio" name="gender" className="radio radio-info" {...register("gender", /*{
            required: {
              value: true,
              message: "gender is required"
            },
            pattern: {
              value: /^(male|female)$/
            },
          }*/)} value={"male"} />
          <label htmlFor="female" className='px-2'> famale</label>
          <input id='female' type="radio" name="gender" className="radio radio-info" {...register("gender", /* {
            required: {
              value: true,
              message: "gender is required"
            },
            pattern: {
              value: /^(male|female)$/
            },
          }*/)} value={"female"} />
        </div>
        {errors?.gender && touchedFields?.gender && <p className='text-red-500 mb-2'>{errors?.gender?.message}</p>}
        <button className="btn btn-soft btn-info mt-5 w-full" type='submit'> {isLouding?<i className="fa-solid fa-spinner fa-spin text-light"></i> : "Register" }</button>


      </form>
    </section>
  )
}
