'use client'
import Link from 'next/link'
import { DELETEPOST } from '@/api/deletePost'
import { DOWNVOTE } from '@/api/downVote'
import { UPVOTE } from '@/api/upVote'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { IProps } from '@/interface/IProps'

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
    return (
        <div className='w-full h-fit bg-zinc-800 rounded-lg p-2 gap-2 flex flex-col'>
            <div className='flex gap-3 text-2xl align-middle'>
                <div className='flex gap-2'>
                    <Link href={`/users/${props.post.user}`} className='font-bold'>{props.post.user}</Link>
                    <h1 className='font-bold text-zinc-400 text-sm m-auto'>{`${date.getDate() > 10 ? date.getDate() : '0'+date.getDate()}.${date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes() }`}</h1>
                </div>
                {props.isLoggedIn &&
                <button className='ml-auto  px-2' onClick={() => DELETEPOST(props.post)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 16 16" > 
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="white"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="white"/> 
                    </svg>
                </button>}
            </div>
            <h2 className='w-full break-words'>{props.post.body}</h2>
            <div className='flex justify-end gap-1'>
                <div className='bg-zinc-800 rounded-lg px-2 gap-1 flex'>
                    <button onClick={() => {
                        addOptimistickLike(optimistickLike.likeCount+1)
                        UPVOTE(props.post, props.index)
                    }}>↑</button>
                    <h1>{optimistickLike.likeCount}</h1>
                    <button onClick={() => {
                        addOptimistickLike(optimistickLike.likeCount-1)
                        DOWNVOTE(props.post, props.index)
                    }}>↓</button>
                </div>
            </div>
        </div>
    )
 }

export default PostBody