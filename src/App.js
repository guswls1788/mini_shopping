import './App.css';
import { BrowserRouter, HashRouter,Routes,Route } from 'react-router-dom';
import GlobalStyle from './component/GlobalStyle';
import Home from './component/Home'
import Login from './component/Login'
import Join from './component/Join'
import { useEffect, useState } from "react"
import Mypage from './component/Mypage';
import { auth, firebaseInstance } from './component/Firebase';
// import LoginCheck from "./component/Logincheck"
import useLocalStorage from "./useLocalStorage";

function App(props,history) {
  const [init, setInit] = useState(false);
  const [login,setLogin]=useState(() => JSON.parse(window.localStorage.getItem("login")))
  const [submenu,setSubmenu]=useState(false)
  const [userEmail,setUserEmail]=useState('')
  const [userPass,setUserPass]=useState('')
  const [Logindata,setLogindata]=useState('')
  // const history = useHistory();
  const GotoLogin=()=>{
    window.location.hash="#/login"
  }
  const GotoMypage=()=>{
    window.location.hash="#/mypage"
  }

  const Logout=()=>{
    if(window.confirm("정말 로그아웃하시겠습니까?")){
      auth.signOut();
      setLogin(!login)
      window.location.hash="/"
    }
  }
  const submenuOpen=()=>{
    setSubmenu(!submenu)
  }   
  const Loginok=()=>{
    const [on,setOn]=useLocalStorage("on",false)

  }
  const LoginCheck=(data)=>{
    setLogindata(data.operationType)
    setUserEmail(data.user.email)
      setLogin(!login)
    console.log(login)
    if(data.operationType==='signIn'){
    firebaseInstance.onAuthStateChanged=(user)=> {
      if (user) {
        alert("dd")
      }
    }
      // setLogin(!login)
    }
  }
  useEffect(() => {
    window.localStorage.setItem("login", JSON.stringify(login));
  console.log(login)
}, [login]);
useEffect(()=>{
  const user = auth.currentUser;
  console.log(user)
if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
} else {
  // No user is signed in.
}

})


  
  return (
    <div className="app">
      <GlobalStyle/>
      <div className='header'>
        <div className='header_wrap'>
          <div className='logo'><a href='/'></a></div>
          <div className='user'>
            <ul>
              {/* <li><LoginCheck/></li> */}
              <li className='cart'>장바구니</li>
              {login?
               <li onClick={GotoLogin} className='logintext'>로그인</li>:
               <li className='user_img'><a onClick={submenuOpen}></a>
               {submenu?
                 <ul className='sub'>
                   <li className='logintext'><a onClick={GotoMypage}>마이페이지</a></li>
                   <li className='logintext'>고객센터</li>
                   <li onClick={Logout} className='logintext'>로그아웃</li>
                 </ul>:<></>}
               </li>}
            </ul>
          </div>
        </div>
      </div>
      <HashRouter>
        <Routes>
          <Route exact path="/"  element={<Home/>} />
          <Route path="/login"  element={<Login LoginCheck={LoginCheck} />} />
          <Route path="/mypage"  element={<Mypage LoginCheck={LoginCheck} userEmail={userEmail} userPass={userPass}/>} />
          <Route path="/join"  element={<Join/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
