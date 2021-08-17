import React from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
const Post = ({post}) => {
  const {username, imageUrl, caption} = post;
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
         
        </div>
    )
}

export default Post
