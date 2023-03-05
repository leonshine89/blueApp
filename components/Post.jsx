import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatAltIcon, ShareIcon, ThumbUpIcon, EmojiHappyIcon, CameraIcon, PhotographIcon,ChartBarIcon } from "@heroicons/react/outline";
import Image from 'next/image';
import { AuthContext } from '../context/auth';
import CyberConnect, { Env } from '@cyberlab/cyberconnect-v2';
import { useCancellableQuery } from '../hooks/useCancellabeQuery';
import { GET_COMMENT } from '../graphql';

const Post = ({name, message, email, timestamp, image, postImage, id}) => {
    const {profileImage, provider, profileHandle} = useContext(AuthContext)
    const [comment, setComment] = useState("")
    const [commentParam, setCommentParam] = useState({})
    const commentRef = useRef("")

   useEffect(() => {
     commentRef.current.focus()
   }, [])

   const cyberconnect = new CyberConnect({ 
     namespace: 'blueApp',
  env: Env.STAGING,
  provider: provider,
  signingMessageEntity: 'blueApp'
})
   const onSubmit = async (e) => {
    e.preventDefault();
    const content = {
        title: "",
        body: comment,
        author: profileHandle
    }
   const handleComment = cyberconnect.createComment(id, content)
//    console.log(handleComment);
const cpComment = handleComment.then((data) => setCommentParam(data));
setComment("");
try {
    let query
    console.log(commentParam);
    const id = cpComment.contentID;
    console.log(id);
    query = useCancellableQuery({
        query: GET_COMMENT,
        variables: {
            id: id,
        }
    });
    const res = await query;
    console.log(res);
   } catch (e) {
    console.log(e.message);
   }
   }

   
   
   console.log(id);
    
  return (
    <div className='flex flex-col'>
        <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
            <div className='flex items-center space-x-2'>
                <img src={image} width={40} height={40} className="rounded-full"
                 alt="" />
                 <div>
                    <p className='font-medium'>{name}</p>
                    {timestamp && <p className='text-xs text-gray-400'>{new Date(timestamp).toDateString()}</p>}
                    {/* <p className='text-xs text-gray-400'>{timestamp}</p> */}
                 </div>
            </div>
            <p className='pt-4'>{message}</p>
        </div>
        {postImage && (
            <div className='relative h-56 md:96 bg-white'>
                <Image src={postImage} className='object-cover' fill={true} />
            </div>
        )}

        {/* footer of the post  */}

        <div className='flex justify-between items-center border-b bg-white shadow-md text-gray-400 border-t'>
            <div className='inputIcon rounded-none'>
                <ThumbUpIcon className='h-4' />
                <p className='text-xs sm:text-base'>Like</p>
            </div>

            <div className='inputIcon rounded-none'>
                <ChatAltIcon className='h-4' />
                <p className='text-xs sm:text-base'>Comment</p>
            </div>

            <div className='inputIcon rounded-none '>
                <ShareIcon className='h-4' />
                <p className='text-xs sm:text-base'>Share</p>
            </div>

            <div></div>
        </div>

        <div className='h-fit w-full bg-white rounded-br-2xl rounded-bl-2xl overflow-hidden p-5 '>
            <div></div>
            <div className='flex items-center h-10'>
                <Image src={profileImage} className='object-cover rounded-full mr-2 ' width={30} height={30} />
                   <form action="" onSubmit={(e) => onSubmit(e)} className='bg-gray-200 flex items-center w-full rounded-full pr-4'>
                     <input type="text" className='inputForm bg-gray-200 p-3 h-full flex-grow rounded-full' placeholder='Write a comment...' ref={commentRef} value={comment} onChange={(e) => setComment(e.target.value)} />
                    
                    <EmojiHappyIcon className='commentIcon' />
                    {/* <ChatAltIcon className='commentIcon' /> */}
                    <CameraIcon className='commentIcon' />
                    <PhotographIcon className='commentIcon' />
                    <ChartBarIcon className='commentIcon' />

                    <button className='hidden'>submit</button>
                   </form>
             
            </div>
        </div>
    </div>
  )
}

export default Post