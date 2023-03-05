import { collection, Firestore, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PostContext } from '../context/post';
import { db } from '../firebase';
import { GET_POST } from '../graphql/getPost';
import { useCancellableQuery } from '../hooks/useCancellabeQuery';
import Post from './Post';
import { AuthContext } from "../context/auth";
import { GET_POST_BY_ADDRESS } from '../graphql/getPostByAddress';

const Posts = () => {
    const q = query(collection(db, 'posts'));
    const {postParam, post, setPost} = useContext(PostContext);
   const {profileHandle, profileImage} = useContext(AuthContext)

   

    useEffect(() => {
 if(!postParam) return;
    let query;
    let postObj = {};
    console.log(postParam.contentID);    
    const fetch = async () => {
        try {
            const id = postParam?.contentID;
            query = useCancellableQuery({
                query: GET_POST,
                variables: {
                    id: id,
                }
            });
            const res = await query;
            console.log(res);
            postObj = res?.data?.content;
            setPost(prev => [...prev, postObj].sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            }))
            // console.log(postObj);s
        } catch (e) {
            console.log(e);
        }
}

fetch();

      
    }, [postParam])

            console.log(post.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            }));

  return (
    <div>{post.map(post => {
      return  <Post 
        key={post.contentID || post.node.contentID}
        name={profileHandle}
        message={post.title || post.node.title}
        email={post.email}
        timestamp={post.createdAt || post.node.createdAt}
        image={profileImage}
        postImage={post.postImage}
        id={post.contentID || post.node.contentID}
        />
    })}</div>
  )
}

export default Posts