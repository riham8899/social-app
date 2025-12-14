import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post'


const PostDetalis = () => {

  const { id } = useParams()


  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: getSinglePost,
  })

  console.log(data);
  

  if (isLoading) {
    return (<div className='h-screen flex justify-center items-center'>
      <i className='text-white fa-solid fa-spinner fa-spin fa-7x' ></i>
    </div>)
  }
  return (
    <>
      <section  className=' p-5 md:w-2/3  lg:w-1/2 my-4 mx-auto'>
        <Post post={data?.data?.post} isPostDetalis={true}/>
      </section>
    </>
  )
}

export default PostDetalis