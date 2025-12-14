import React from 'react'

const UserInfo = ({ userName, UserImg, CreateAt }) => {
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
                <div>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
    )
}

export default UserInfo