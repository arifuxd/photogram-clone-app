import React from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
const Post = () => {
    return (
        <div className="post">
            <div className="post-header">
            <Avatar
                className="post-avatar"
                alt='Jannat'
                src="/static/images/avatar/1.jpg"
            />
           <h3>username</h3> 
            </div>
           
           <img className="post-image" src="https://cdn.hoorrey.com/eyJidWNrZXQiOiJjb20uaG9vcnJleS5hc3NldHMiLCJrZXkiOiJhc2lhL2JhbmdsYWRlc2gvZGhha2EvMzNlYjkyYjYtZDVmNC00ODBjLTg0NTQtMzQ3ZjQzOTZmNTIzL2tzZWNnbHJ4LTFldGk4LTVkcnZzLVJHbHNhWEJmUzNWdFlYST0uanBnIn0=" alt="" />
         
                <p className="post-text"><strong>Ariful</strong>  Wow How Nice day are with three live session</p>
         
        </div>
    )
}

export default Post
