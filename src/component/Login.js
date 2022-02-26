import {signInWithEmailAndPassword} from 'firebase/auth'
import {GoogleAuthProvider} from 'firebase/auth'
import React, { useState } from 'react';
import { auth,firebaseInstance  } from './Firebase';
import '../css/Login.css'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);	// 새로운 유저인지 확인(초기값: true)
  const [EmailText,setEmailText]=useState(false)
  const [passwordCheck ,setPasswordCheck]=useState('')
  const [passwordText,setPasswordText]=useState(false)
  
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name==='email') {
      setEmail(value)
      var emailch = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if(emailch.test(event.target.value)==true){
            setEmailText(true)
            setEmail(event.target.value)
        }else{
            setEmailText('유효한 이메일 주소를 입력해주세요')
          }
    } else if (name=== "password") {
      setPassword(value);
      var pass = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-z]{8,}$/
      if(pass.test(event.target.value)==true){
          setPasswordText(true)
          setPassword(event.target.value)
      }else{
          setPasswordText('비밀번호는 숫자를 포함한 최소 8자리 이상이어야 합니다.')
      }
    }
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
        // data = await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
        data = await signInWithEmailAndPassword(auth,email, password);
      console.log(data);
      props.LoginCheck(data)
      window.location.hash="/"
    } catch(error) {
      if(error.message=='Firebase: Error (auth/wrong-password).'){
        alert('비밀번호가 잘못되었습니다.')
      }else if(error.message=='Firebase: Error (auth/user-not-found).'){
        alert('없는 아이디입니다.')
      }
      console.log(error.message)
    }
  }
const GoJoin=()=>{
  window.location.hash="/join"

}

  
  const onGoogleClick = async () => {
   const provider = new firebaseInstance.auth().GoogleAuthProvider(); // provider를 설정
  await firebaseInstance.auth().signInWithPopup(provider); // 
  }
  return (
    <div className='login'>
      <div className='login_wrap'>
        <p className='title'>로그인</p>
        <div className='input'>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            {EmailText?<p className="text">{EmailText}</p>:<></>}
            <input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
            {passwordText?<p className="text">{passwordText}</p>:<></>}
          <button className='login_btn' onClick={onSubmit}>로그인</button>
          <button className='join_btn' onClick={GoJoin}>회원가입 &gt;</button>
          {/* <button name="google" onClick={onGoogleClick}>구글 계정으로 로그인</button> */}
        </div>
      </div>
    </div>
  )
}

export default Login;