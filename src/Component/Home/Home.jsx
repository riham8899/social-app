// import React, { useEffect, useState } from 'react'
// import stylee from './Home.module.css'

// import Post from '../../Post/Post'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Post from '../Post/Post';




export const Home = () => {

  // const [allPost, setallPost] = useState(null)

  // async function getAllPosts() {

  //   try {

  //     const { data } = await axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
  //       headers: {
  //         token: localStorage.getItem("token")

  //       }
  //     })

  //     console.log(data.posts);
  //     setallPost(data.posts);


  //   } catch (error) {
  //     console.log(error)

  //   }

  // }

  // useEffect(function () {
  //   getAllPosts();
  // }, [])

  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50",{
      headers:{
        token: localStorage.getItem("token"),
      },
    });
  }

  const {data , isError , isLoading , isFetching}= useQuery({
    queryKey:["allPost"],
    queryFn:getAllPosts,
    // refetchInterval:9000,
    refetchOnMount:false,
    

    
  })

  console.log(data);

  if(isLoading){
    return(<div className='h-screen flex justify-center items-center'>
          <i className='text-white fa-solid fa-spinner fa-spin fa-7x' ></i>
        </div>)
  }
  



  return (
    <>
    
        <section className=' p-5 md:w-2/3  lg:w-1/2 my-4 mx-auto'>
          {data?.data?.posts.map(function (post ,_id) {
            return <Post post={post} key={post._id} />
          })}  </section>
      
    </>




  )
}
