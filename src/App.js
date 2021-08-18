import './App.css';
import Post from './Post';
import {useState, useEffect} from 'react'
import {db, auth} from './firebase'
import { Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const data = [
    {username : 'Ariful Islam', caption : 'Hey There How are you ? I am fine thank you', imageUrl : "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/237121121_2503388826458678_7595458266636453704_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=xCa9lL1VIFoAX8Hs8GU&_nc_oc=AQlmjpVjac43pq-k5MpxJf_HFC4d2Lv5r4XWD6YBTskYWVJ7qkhlJUzv2x_Wf3l0SN0&_nc_ht=scontent.fdac27-1.fna&oh=5012660702b63d3fdd3995701be1e64c&oe=61203C89"},
    {username : 'Jannatul Ferdous', caption : 'ad a digital product with which price you want to collect from the client.', imageUrl : "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/239257164_2502287723235455_1096771132588220923_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=CCuKaXvsL7EAX8WkQqi&tn=5_cmZhm1mftGguTV&_nc_ht=scontent.fdac27-1.fna&oh=d41696c191b7cc888118b4eaf853ba98&oe=61208326"},
    {username : 'Lily Akter', caption : 'make a pricing table on the service page', imageUrl : "https://scontent.fdac27-1.fna.fbcdn.net/v/l/t39.30808-6/235314262_2499592210171673_908811481012855091_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=Z0hllkJktMEAX_5O4FW&tn=5_cmZhm1mftGguTV&_nc_ht=scontent.fdac27-1.fna&oh=2b949b9fe2cded13fd9078ca922df20e&oe=61216267"},
    {username : 'Akash Islam', caption : 'use code of that digital product on buy now button of the pricing table enjoy it.u', imageUrl : "https://scontent.fdac27-1.fna.fbcdn.net/v/t39.30808-6/173510277_2497743370356557_1973809361898020891_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=SueackMrQzgAX_47aBD&_nc_ht=scontent.fdac27-1.fna&oh=8f091a5749d82e3fc28ea2a9303efba0&oe=612074A8"}
  ]
 
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  //Modal States
  const [open, setOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => (
        {
        id : doc.id, 
        post : doc.data()
        }
      )))
    })
  }, [])

  useEffect(()=>{
  const unsubscribe =  auth.onAuthStateChanged(authUser => {
      if(authUser){
        console.log(authUser)
        setUser(authUser)

        if(authUser.displayName){
          console.log('It has a name')
      }else{

      return authUser.updateProfile({
          displayName : username
        })
      }

      }else{
        setUser(null)
      }

     
    })

    return () =>{
      unsubscribe()
    }
  }, [user, username])

  const signUp = (e) => {
    e.preventDefault()
    console.log('sign Up')
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))

    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message))
    setSignInOpen(false)
  }

  return (
    <div className="App">

     {
        user?.displayName ?  <ImageUpload username={user.displayName}/>
        : <h3>Sorry you need to login to upload</h3>
      } 
      <Modal
        className="sign-up-modal"
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
      <center>
      <form className="app-signup">
      <h2 className="app-header">Photogram</h2>
      <h2 className="">Sign Up</h2>
     
      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        />

        <Input
        placeholder="email"
        type="text"
        value={email} 
        onChange={e => setEmail(e.target.value)}
        />

        <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
     </form>
      </center>
    </div>
      </Modal>

      <Modal
        className="sign-in-modal"
        open={signInOpen}
        onClose={()=> setSignInOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
      <center>
      <form className="app-signup">
      <h2 className="app-header">Photogram</h2>
      <h2>Sign In</h2>
     
    
        <Input
        placeholder="email"
        type="text"
        value={email} 
        onChange={e => setEmail(e.target.value)}
        />

        <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn}>Sign In</Button>
     </form>
      </center>
    </div>
      </Modal>

      <div className="app-header">
        <h2>Photogram</h2>
      </div>
    {user 
    ?   <Button onClick={()=> auth.signOut()}>Log Out</Button> 
      : ( 
        <div className="app-login-container">
        <Button onClick={()=> setOpen(true)}>Sign up</Button>
        <Button onClick={()=> setSignInOpen(true)}>Sign In</Button>
        </div>
        )
      
      }
      
      {
       posts.map(post => <Post key={post.id} post={post.post}/>) 
      }

    </div>
  );
}

export default App;

