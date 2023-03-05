import { useQuery } from '@apollo/client';
import { async } from '@firebase/util';
import React, {createContext, useContext, useEffect, useState} from 'react'

export const PostContext = createContext();

PostContext.displayName = "AuthContext";
import { GET_POST } from '../graphql/getPost';
import { GET_POST_BY_ADDRESS } from "../graphql/getPostByAddress";
import { useCancellableQuery } from '../hooks/useCancellabeQuery';
import { AuthContext } from './auth';


export const PostContextProvider = ({children}) => {
    const [postParam, setPostParam] = useState({});
    const {primaryProfile, address} = useContext(AuthContext)
    const [post, setPost] = useState([])
    console.log(postParam);

    useEffect(() => {
    let query;
    let postObj = {};
    const fetch = async () => {
        try {
            query = useCancellableQuery({
                query: GET_POST_BY_ADDRESS,
                variables: {
                    address: address,
                }
            });
            const res = await query;
            const data = res?.data?.address?.wallet?.primaryProfile?.posts?.edges;
            console.log(data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }));
            setPost(data)
            // postObj = res?.data?.content;
            // setPost(prev => [...prev, postObj].sort((a, b) => {
            //   return new Date(b.createdAt) - new Date(a.createdAt)
            // }))
        } catch (e) {
            console.log(e);
        }
}

fetch();

      
    }, [primaryProfile])
  
    
    return (
        <PostContext.Provider value={{postParam, setPostParam, post,setPost}}>
{children}
        </PostContext.Provider>
    )
}

