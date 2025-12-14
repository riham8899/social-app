import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import  {jwtDecode} from 'jwt-decode'
import React, {  useRef, useState } from 'react'
import toast from 'react-hot-toast'


const Postheader = ({ userName, UserImg, CreateAt, UserPostId, PostId, body, postImg }) => {
    const { user: loggedUserId } = jwtDecode(localStorage.getItem("token"));
    const QueryClient = useQueryClient();
    const detailsRef = useRef(null);

    function DeletePost() {
        return axios.delete(`https://linked-posts.routemisr.com/posts/${PostId}`, {
            headers: {
                token: localStorage.getItem("token")
            },
        });
    };
    const { mutate: deletePost, isPending } = useMutation({
        mutationFn: DeletePost,
        onSuccess: (data) => {
            toast.success(data.data.message);
            QueryClient.invalidateQueries({
                queryKey: ["userPost"]
            });
            console.log(data);
        },
        onError: (e) => {
            console.log(e);

        }
    })
    const [upDateData, setUpDateData] = useState(body);
    const [editImg, setEditImg] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);



    function UpdatePost() {
        // setEditImg(postImg);
        const formData = new FormData();
        if (upDateData && upDateData.trim() !== "") {
            formData.append("body", upDateData);
        }

        //  formData.append("image", editImg);

        if (editImg && editImg instanceof File) {
            formData.append("image", editImg);
        }



        return axios.put(`https://linked-posts.routemisr.com/posts/${PostId}`, formData, {
            headers: {
                token: localStorage.getItem("token")
                // Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });


    };
    const { mutate: updateALLPost, isPending: editing } = useMutation({
        mutationFn: UpdatePost,
        onSuccess: (data) => {
            toast.success(data.data.message);
            QueryClient.invalidateQueries({
                queryKey: ["userPost"]
            });
            setIsModalOpen(false);
        },
        onError: (e) => {
            console.log(e);
            toast.error("Failed to update post");

        }
    })

    function handelImg(e) {
        const file = e.target.files[0]
        if (file) {
            setEditImg(file)
        }

    };

    function closeBtnImg() {
        setEditImg(null)

    }
    return (
        <div className="header">
            <div className='flex justify-between'>

                <div className=' flex flex-row gap-2'>
                    <div className="avatar  rounded-full">
                        <div className="w-12 rounded-full">
                            <img className=" rounded-full" src={UserImg} />
                        </div>
                    </div>

                    <div><h4>{userName} </h4>
                        <p>{CreateAt}</p></div>
                </div>

                {UserPostId == loggedUserId && <div>
                    <details ref={detailsRef} className="dropdown dropdown-left">
                        <summary className="btn m-1  bg-slate-700 border-0"> <i className="fa-solid fa-ellipsis"></i></summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><button onClick={deletePost}>  {isPending ? <i className="fa-solid fa-spinner fa-spin text-light"></i> : "Delete"}</button></li>
                            <li><button onClick={() =>{setEditImg(postImg); setIsModalOpen(true)}}>Update</button></li>
                        </ul>
                    </details>

                </div>}

            </div>

            {isModalOpen && <dialog id="my_modal_3" open className="modal">
                <div className="modal-box">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsModalOpen(false)}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update Post</h3>
                    <textarea value={upDateData} placeholder="Typing" className="textarea textarea-primary w-full mt-3 h-25" onChange={(e) => setUpDateData(e.target.value)}></textarea>
                    {editImg ? (<div className='py-3'>
                        <i className="fa-solid fa-xmark cursor-pointer ms-auto block! mb-2" onClick={closeBtnImg}></i>
                        <img src={editImg instanceof File ? URL.createObjectURL(editImg) : postImg} className='w-full' />
                    </div>) : (<div class="flex items-center justify-center w-full py-3">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-gray-800 border-primary border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                                <p className="mb-2 text-sm"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handelImg} />
                        </label>
                    </div>)}
                    <button className='btn btn-primary mt-4' onClick={(e) => { e.preventDefault(); updateALLPost();  detailsRef.current.open=false;}} >  {editing ? <i className="fa-solid fa-spinner fa-spin text-light"></i> : "edate post"}</button>

                </div>
            </dialog>}
        </div>
    )
}

export default Postheader