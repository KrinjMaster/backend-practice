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

    const dateSince = (date: number) => {
        const dateSince = (new Date().getTime() - date) / 1000
        if (dateSince / 31536000 > 1) {
            return `${Math.floor(dateSince / 31536000)} years ago`
        }
        if (dateSince / 2592000 > 1) {
            return `${Math.floor(dateSince / 2592000)} months ago`
        }
        if (dateSince / 86400 > 1) {
            return `${Math.floor(dateSince / 86400)} days ago`
        }
        if (dateSince / 3600 > 1) {
            return `${Math.floor(dateSince / 3600)} hours ago`
        } 
        if (dateSince / 60 > 1) {
            return `${Math.floor(dateSince / 60)} minutes ago`
        }
        else {
            return `${Math.floor(dateSince / 60)} seconds ago`
        }
    }

    dateSince(props.post.date)
    return (
        <div className='w-full h-fit bg-zinc-800 rounded-lg p-2 gap-2 flex flex-col'>
            <div className='flex gap-3 text-2xl align-middle'>
                <div className='flex gap-2'>
                    <a href={`users/${props.post.user}`} className='mt-auto mb-auto'>
                        <Image src={props.profileImage} alt='userImage' width={30} height={30} className='w-12 h-12 rounded-lg'/>
                    </a>
                    <div className='mt-auto mb-auto'>
                        <Link href={`/users/${props.post.user}`} className='font-bold'>{props.post.user}</Link>
                        <h1 className='font-bold text-zinc-400 text-sm'>{`${date.getDate() > 10 ? date.getDate() : '0'+date.getDate()}.${date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes() }`}</h1>
                        <h1>{dateSince(props.post.date)}</h1>
                    </div>
                </div>
                {props.isCurrentUser &&
                <button className='ml-auto px-2' onClick={() => DELETEPOST(props.post)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16" className='fill-red-600'> 
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
                    }} className='text-green-300 font-bold bg-green-600 w-7 rounded-lg'>↑</button>
                    <h1 className='text-center font-bold px-2'>{optimistickLike.likeCount}</h1>
                    <button onClick={() => {
                        addOptimistickLike(optimistickLike.likeCount-1)
                        DOWNVOTE(props.post, props.index)
                    }} className='text-red-300 font-bold w-7 bg-red-600 rounded-lg'>↓</button>
                </div>
            </div>
        </div>
    )
 }

export default PostBody