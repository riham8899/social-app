import React from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from '../Post/Post';



const Profile = () => {

  const { user: loggedUserId } = jwtDecode(localStorage.getItem("token"))
  // console.log(decoded);

  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${loggedUserId}/posts`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
  }
  const { data, isLoading } = useQuery({
    queryKey: ["userPost"],
    queryFn: getUserPosts,

  });

  if (isLoading) {
    return (<div className='h-screen flex justify-center items-center'>
      <i className='text-white fa-solid fa-spinner fa-spin fa-7x' ></i>
    </div>)
  }

  return (
    <>

      <section className=' p-5 md:w-2/3  lg:w-1/2 my-4 mx-auto'>
        {data?.data?.posts?.slice().sort((a,b)=>new Date (b.createdAt)- new Date(a.createdAt)).map(function (post, _id) {
          return <Post post={post} key={post._id} />
        })}  </section>

    </>

  )
}

export default Profile