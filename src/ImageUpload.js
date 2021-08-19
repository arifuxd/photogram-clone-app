import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import {db, storage, firestore} from './firebase'
import firebase from 'firebase/app'
import './ImageUpload.css'
const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)
    const handleChange = (e) =>{
      if(e.target.files[0]){
          setImage(e.target.files[0])
          console.log(e.target.files[0])
      }
    }
    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            //Error Part
            error => {
                console.log(error)
                alert(error.message)
            },
            //complete function
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post images in db 
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imageUrl : url,
                        username : username

                    });

                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }   
    console.log(caption)
    return (
        <div className="image-upload">
            <progress className="image-loader" value={progress} max="100"/>
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)}  />
            <input type="file" onChange={handleChange} />
            <Button variant="contained" color="secondary" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
