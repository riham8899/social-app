import React, { useState } from 'react'
import UserInfo from '../UserInfo/UserInfo'
import { Link } from 'react-router-dom'

import CommentForm from './../CommentForm/CommentForm';
import Postheader from './../PostHeader/Postheader';

const Post = ({ post, isPostDetalis }) => {

    // function openUpdateModel(data){
    //     setUpDateData(data);
    //     setIsModalOpen(true);
    // };

    return (
        <>
            <div className=" p-5 my-4 rounded-2xl bg-slate-700">
                {/* header */}
                <Postheader userName={post?.user?.name} UserImg={post?.user?.photo} CreateAt={post?.createdAt} UserPostId={post?.user?._id} PostId={post?.id} body={post.body} postImg={post?.image} />

                {/* body */}
                <div>
                    <div className='my-4'>
                        <p className='mb-4'>{post?.body}</p>

                        <img className=' w-full' src={post?.image} alt='' />
                    </div>

                </div>

                {/* {comment} */}

                {post?.comments.length > 0 && !isPostDetalis ? (
                    <div className='comment p-5 rounded-sm bg-slate-600 border-2 border-slate-200/20'>
                        <Link to={`/postdetalis/${post.id}`} className=' text-center text-blue-600 block'>view all comments</Link>
                        <UserInfo userName={post?.comments[0]?.commentCreator?.name}
                            UserImg={post?.comments[0]?.commentCreator?.photo.includes("undefined") ? "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" : post?.comments[0]?.commentCreator?.photo}
                            CreateAt={post?.comments[0]?.createdAt} />

                        <p className='mt-4'>{post?.comments[0]?.content}</p>

                    </div>) : (<>
                        {post?.comments &&
                            <>

                                {post?.comments.map(function (post, idx) {
                                    return <div key={idx} className='comment p-2 my-2 rounded-sm bg-slate-600 border-2 border-slate-200/20'>

                                        <UserInfo userName={post.commentCreator?.name}
                                            UserImg={post.commentCreator?.photo.includes("undefined") ? "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" : post.commentCreator?.photo}
                                            CreateAt={post.createdAt} />

                                        <p className='mt-4'>{post.content}</p>

                                    </div>;
                                })}
                            </>

                        }

                    </>
                )}
                <CommentForm id={post.id} />
            </div>

        </>
    );
};

export default Post