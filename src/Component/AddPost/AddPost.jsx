import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';


const AddPost = () => {

    const QueryClient = useQueryClient()

    const [viewImg, setviewImg] = useState(null)

    const [Img, setImg] = useState("")



    const postBody = useRef("");
    const PostImg = useRef("");

    function catchPost() {
        const formData = new FormData();

        if (postBody.current.value != "") {
            formData.append("body", postBody.current.value);


        };
        if (Img != "") {
            formData.append("image", Img)

            // console.log(formData, "if");

        }

        // console.log(formData);

        console.log(postBody.current.value);
        // console.log(PostImg.current.files[0]);
        return axios.post("https://linked-posts.routemisr.com/posts", formData, {
            headers: {
                token: localStorage.getItem("token"),
            }
        })

    }

    function handelImg() {
        const srcImg = URL.createObjectURL(PostImg.current.files[0]);
        console.log(srcImg);

        // console.log(PostImg.current.files[0]);
        setImg(PostImg.current.files[0]);

        setviewImg(srcImg);
    }

    function btnClose() {

        setImg("");
        setviewImg(null);

        PostImg.current = "";
    }

    const { isPending, mutate } = useMutation({
        mutationFn: catchPost,
        onSuccess: (data) => {
            postBody.current.value = "";

            setviewImg(null);
            document.getElementById('my_modal_3').close()
            QueryClient.invalidateQueries({
                queryKey: ["userPost"],
            })
            // )عشان  اول اما اكريت بوست ف البروفيل بتاعي  يظهر ع طول مش لازم اخرج واطلع او اعمل ريفرش 


            toast.success(data.data.message);
            console.log(data);

        },
        onError: (error) => {
            console.log(error);

        },
    })
    return (
        <>{/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn bg-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Post</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Post!</h3>
                    <textarea ref={postBody} placeholder="Typing" className="textarea textarea-primary w-full mt-3 h-25"></textarea>
                    {viewImg ? (<div className='py-3 '>
                        <i className="fa-solid fa-xmark cursor-pointer ms-auto block! mb-2" onClick={btnClose} ></i>
                        <img src={viewImg} className='w-full ' />
                    </div>) : (<div className="flex items-center justify-center w-full py-3">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-gray-800 border-primary border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                                <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" ref={PostImg} onChange={handelImg} />
                        </label>
                    </div>)}
                    <button className='btn btn-primary mt-4' onClick={mutate}>  {isPending ? <i className="fa-solid fa-spinner fa-spin text-light"></i> : "Add post"}  </button>

                </div>
            </dialog>
        </>
    )
}

export default AddPost
