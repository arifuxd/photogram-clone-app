import React, {useEffect, useState} from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
import { db } from './firebase';
const Post = ({post, postId}) => {
  const {username, imageUrl, caption} = post;
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
  useEffect(()=>{
    let unsubscribe;

    if(postId){
        unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot(snapshot =>{
            setComments(snapshot.docs.map(doc=> doc.data()))
        })
    }

    return () => {
        unsubscribe();
    }
  }, [postId])

  console.log(comments)

    return (
        <div className="post">
            <div className="post-header">
            <Avatar
                className="post-avatar"
                alt={username}
                src="/static/images/avatar/1.jpg"
            />
           <h3>{username}</h3> 
            </div>
           
           <img className="post-image" src={imageUrl} alt="" />
         
                <p className="post-text"><strong>{username}</strong>  {caption}</p>
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            <p>{comments.username}</p>
        </div>
    )
}

export default Post
