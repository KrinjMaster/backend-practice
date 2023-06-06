'use client'
import Link from 'next/link'
import { DELETEPOST } from '@/api/deletePost'
import { DOWNVOTE } from '@/api/downVote'
import { UPVOTE } from '@/api/upVote'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { IProps } from '@/interface/IProps'
import Image from 'next/image'

const PostBody = (props: IProps) => {
    const likeCount = props.post.rating
    const date = new Date(props.post.date)
    const [optimistickLike, addOptimistickLike] = useOptimistic(
        {likeCount},
        (state, newLikeCount: number) => ({
            ...state,
            likeCount: newLikeCount,
        })
    )

    const dateSincePost = (date: number) => {
        const dateSince = (new Date().getTime() - date) / 1000
        if (dateSince / 31536000 >= 1) {
            return Math.floor(dateSince / 31536000) === 1 ? `${Math.floor(dateSince / 31536000)} year ago` : `${Math.floor(dateSince / 31536000)} years ago`
        }
        else if (dateSince / 2592000 >= 1) {
            return Math.floor(dateSince / 2592000) === 1 ? `${Math.floor(dateSince / 2592000)} month ago` : `${Math.floor(dateSince / 2592000)} months ago`
        }
        else if (dateSince / 86400 >= 1) {
            return Math.floor(dateSince / 86400) === 1 ? `${Math.floor(dateSince / 86400)} day ago` : `${Math.floor(dateSince / 86400)} days ago`
        }
        else if (dateSince / 3600 >= 1) {
            return Math.floor(dateSince / 3600) == 1 ? `${Math.floor(dateSince / 3600)} hour ago` : `${Math.floor(dateSince / 3600)} hours ago`
        } 
        else if (dateSince / 60 >= 1) {
            return Math.floor(dateSince / 60) === 1 ? `${Math.floor(dateSince / 60)} minute ago` : `${Math.floor(dateSince / 60)} minutes ago`
        }
        else {
            return dateSince == 1 ? `${Math.floor(dateSince)} second ago` : `${Math.floor(dateSince)} seconds ago`
        }
    }

    return (
        <div className='w-full h-fit bg-zinc-800 rounded-lg p-2 gap-2 flex flex-col shadow-sm shadow-gray-500'>
            <div className='flex gap-3 text-2xl align-middle'>
                <div className='flex gap-2'>
                    <a href={`users/${props.post.user}`} className='mt-auto mb-auto'>
                        <Image src={props.profileImage} alt='userImage' width={30} height={30} className='w-12 h-12 rounded-lg'/>
                    </a>
                    <div className='mt-auto mb-auto'>
                        <div className='flex'>
                            <Link href={`/users/${props.post.user}`} className='font-bold'>{props.post.user}</Link>
                            <div className='flex group'>
                                <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className='scale-75 w-8 h-8 my-auto stroke-gray-400 p-1'>
                                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"/>
                                </svg>
                                <h1 className='font-bold text-zinc-400 text-sm invisible group-hover:visible my-auto'>{`${date.getDate() > 10 ? date.getDate() : '0'+date.getDate()}.${date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes() }`}</h1>
                            </div>
                        </div>
                        <h1 className='text-gray-400 font-bold text-sm'>{dateSincePost(props.post.date)}</h1>
                    </div>
                </div>
                {props.isCurrentUser &&
                <button className='ml-auto px-2' onClick={() => DELETEPOST(props.post)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16" className='fill-white hover:fill-indigo-500 transition-all duration-150 ease-in-out'> 
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                    </svg>
                </button>}
            </div>
            <h2 className='w-full break-words font-bold'>{props.post.body}</h2>
            <div className='flex justify-end gap-1'>
                <div className='bg-zinc-800 rounded-lg px-2 gap-1 flex'>
                    <button onClick={() => {
                        addOptimistickLike(optimistickLike.likeCount+1)
                        UPVOTE(props.post, props.index)
                    }} className='text-indigo-300 font-bold bg-indigo-600 w-7 rounded-lg'>↑</button>
                    <h1 className='text-center font-bold px-2'>{optimistickLike.likeCount}</h1>
                    <button onClick={() => {
                        addOptimistickLike(optimistickLike.likeCount-1)
                        DOWNVOTE(props.post, props.index)
                    }} className='text-white font-bold w-7 bg-gray-400 rounded-lg'>↓</button>
                </div>
            </div>
        </div>
    )
 }

export default PostBody