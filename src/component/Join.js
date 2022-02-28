import { auth,firebaseInstance  } from './Firebase';
import { useEffect, useState } from "react"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import '../css/Join.css'
function Join() {
    const [email,setEmail]=useState('')
    const [EmailText,setEmailText]=useState(false)
    const [password,setPassword]=useState('')
    const [passwordText,setPasswordText]=useState(false)
    const [passwordCheck ,setPasswordCheck]=useState('')
    const [passwordCheckText,setPasswordCheckText]=useState(false)
    const dbService = firebaseInstance.firestore();

    const onFinish = async () => {
        if(password!==passwordCheck){
            return alert('비밀번호가 일치하지 않습니다! 다시 한번 확인해주세요!');
        }
        // else if(email==user){}
        try {
            const user = await createUserWithEmailAndPassword(auth,email,password);
            await dbService.collection('user').doc(user.user.uid).set({
                name: "user",
                createdAt: Date.now(),
                userImg: "", 
                comment:"안녕하세요.",
                email:email,
                user_uid:user.user.uid
            });
            alert("succes")
            window.location.hash="/"
            console.log(user);
        } catch (error) {
            if(error.message=='Firebase: Error (auth/email-already-in-use).'){
                alert("이미 있는 아이디입니다.")
            }
            console.log(error.message);
        }
    };
    const JoinEmail=(e)=>{
        var emailch = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if(emailch.test(e.target.value)==true){
            setEmailText(true)
            setEmail(e.target.value)
        }else{
            setEmailText('유효한 이메일 주소를 입력해주세요')
        }
    }
    const JoinPw=(e)=>{
        var pass = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-z]{8,}$/
        if(pass.test(e.target.value)==true){
            setPasswordText(true)
            setPassword(e.target.value)
        }else{
            setPasswordText('비밀번호는 숫자를 포함한 최소 8자리 이상이어야 합니다.')
        }
    }
    const JoinCheckPw=(e)=>{
        setPasswordCheck(e.target.value)
        if(e.target.value!==password){
            setPasswordCheckText('비밀번호가 일치하지 않습니다.')
        }else{
            setPasswordCheckText(true)
        }
    }
  return (
    <div className="join">
        <div className='join_wrap'>
            <p className='title'>회원가입</p>
            <div className='input'>
                <span>이메일</span>
                <input type="text" name='email' onChange={JoinEmail}></input>
                {EmailText?<p className="text">{EmailText}</p>:<></>}
                <span>비밀번호</span>
                <input type="password" name='password' onChange={JoinPw}></input>
                {passwordText?<p className="text">{passwordText}</p>:<></>}
                <span>비밀번호확인</span>
                <input type="password" name='passwordCheck' onChange={JoinCheckPw}></input>
                {passwordCheckText?<p className="text">{passwordCheckText}</p>:<></>}
                <button className='join_btn' onClick={onFinish}>가입</button>
            </div>
        </div>
    </div>
  );
}

export default Join;
