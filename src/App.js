import './App.css';
import { BrowserRouter, HashRouter,Routes,Route } from 'react-router-dom';
import GlobalStyle from './component/GlobalStyle';
import Home from './component/Home'
import Login from './component/Login'
import Join from './component/Join'
import { useEffect, useState } from "react"
import Mypage from './component/Mypage';
import jquery from 'jquery';
import $ from 'jquery';
import { firestore ,auth, firebaseInstance } from './component/Firebase';
// import LoginCheck from "./component/Logincheck"
import useLocalStorage from "./useLocalStorage";

function App(props,history) {
  const [login,setLogin]=useState(false)
  const [init,setInit]=useState(false)
  const [userEmail,setUserEmail]=useState('')
  const [userPass,setUserPass]=useState('')
  const [Logindata,setLogindata]=useState('')
  const [imgFiles,setImgFiles]=useState('')
  const [imgUrl,setImgUrl]=useState('')
  const storage = firebaseInstance.storage();

  useEffect(()=>{
    $(document).ready(function(){
      $(".user_img").click(function(){
        $(".sub").toggleClass("show")
      })
    })
  },[])
  useEffect( async()=>{
    await  auth.onAuthStateChanged((user) => {
      if (user) {
        upd()
      setLogin(false)
        const use=  firestore.collection("user")
        use.doc(user.uid).get().then((doc)=>{
        setLogindata(doc.data())
      })
    } else {
      setLogin(true)
      // User is signed out
      // ...
    }
  });
},[])
  // useEffect(()=>{
  //   const bucket = firestore.collection("user"); 
  //   // console.log(firestore)
  //   // console.log(bucket)
  //   bucket.doc("user_user").get().then((doc) => {
  //     // console.log(doc.data());
  //     // console.log(doc.data().name);
  //     // console.log(doc.id);
  //     //게시판으로 쓸거임 db임
  // });
  //  })
  
  // useEffect(() => {
  //   window.localStorage.setItem("login", JSON.stringify(login));
  //   console.log(login   )
  // }, [login]);
  
  // const history = useHistory();
  const GotoLogin=()=>{
    window.location.hash="#/login"
  }
  const GotoMypage=()=>{
    window.location.hash="#/mypage"
  }
  const GoMain=()=>{
    window.location.hash="/"

  }

  const Logout=()=>{
    if(window.confirm("정말 로그아웃하시겠습니까?")){
      auth.signOut();
      setLogin(!login)
      window.location.hash="/"
    }
  }


  const LoginCheck=(data)=>{
      setLogin(!login)

  }
  const DeletUser=()=>{
    setLogin(!login)
  }
  const upd=async(imgUrl)=>{
    await  auth.onAuthStateChanged((user) => {
      if (user) {
        try {
            let url = '';
            storage.ref().child('image/'+user.uid+"_main_img.jpg").getDownloadURL().then((url)=>{
                setImgUrl(url)
            })
              return url;
            } catch (e) {
              console.log(e);
            }
    } else {
    }
  });
  }
  
  return (
    <div className="app">
      <GlobalStyle/>
      <div className='header'>
        <div className='header_wrap'>
          <div className='logo' onClick={GoMain}></div>
          <div className='user'>
            <ul>
              {/* <li><LoginCheck/></li> */}
              <li className='cart'>장바구니</li>
              {login?
               <li onClick={GotoLogin} className='logintext'>로그인</li>:
               <li className='user_img'><a><img src={imgUrl}></img></a>
                 <ul className='sub'>
                   <li className='logintext'><a onClick={GotoMypage}>마이페이지</a></li>
                   <li className='logintext'>고객센터</li>
                   <li onClick={Logout} className='logintext'>로그아웃</li>
                 </ul>
               </li>}
            </ul>
          </div>
        </div>
      </div>
      <HashRouter>
        <Routes>
          <Route exact path="/"  element={<Home/>} />
          <Route path="/login"  element={<Login LoginCheck={LoginCheck} />} />
          <Route path="/mypage"  element={<Mypage upd={upd} DeletUser={DeletUser} LoginCheck={LoginCheck} Logindata={Logindata} userEmail={userEmail} userPass={userPass}/>} />
          <Route path="/join"  element={<Join/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
