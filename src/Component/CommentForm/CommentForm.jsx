import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CommentForm = ({ id }) => {
    // const [isLouding, setIsLouding] = useState(false)

    // async function AddComent() {
    //     setIsLouding(true)
    //     const values = {
    //         content: Coment,
    //         post: id,
    //     };
    //     console.log(values);

    //     try {
    //         const { data } = await axios.post("https://linked-posts.routemisr.com/comments", values, {
    //             headers: {
    //                 token: localStorage.getItem("token")
    //             }
    //         })
    //         setIsLouding(false)

    //         console.log(data);
    //         toast.success(data.message)

    //     } catch (error) {
    //         setIsLouding(false)
    //         toast.error(error.response.data.error)
    //         console.log(error);
    //     }

    const [Coment, setComent] = useState("");

    const queryClient = useQueryClient()
    function AddComent() {

        const values = {
            content: Coment,
            post: id,
        };
        return axios.post("https://linked-posts.routemisr.com/comments", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        })


    }

    const { isPending, mutate } = useMutation({
        mutationFn: AddComent,
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries({
                queryKey: ["post", id]
            });

            //   عشان يرجع الكومنتات تظهر ويعمل ريفتش لداته
            setComent("")

            // عشان يرجع فاضي بعد ما نكتب
        },
        onError: (error) => {
            toast.error(error.response.data.error)
        }

    })






    return (
        <div className="join my-2 w-full ">
            <div className='w-full'>
                <label className="input  join-item w-full rounded-2xl" >

                    <input type="text" placeholder="your comment" required className='w-full' value={Coment} onChange={(e) => setComent(e.target.value)} />
                </label>

            </div>
            <button onClick={mutate} className="btn btn-primary join-item ms-2 rounded-2xl">
                {isPending ? <i className="fa-solid fa-spinner fa-spin text-light"></i> : <i className="fa-solid fa-angles-right"></i>}</button>
        </div>
    )
};



export default CommentForm