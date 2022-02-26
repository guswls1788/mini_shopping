import '../css/Mypage.css'
import axios from 'axios';
import { auth,firebaseInstance  } from './Firebase';
import { useEffect, useState } from "react"
import {createUserWithEmailAndPassword} from 'firebase/auth'

function Mypage(props) {

    useEffect(()=>{
        preview()
        document.querySelector('.main_img').style.backgroundImage=`url('${imgFiles}')`
        const LoginCheck=(data)=>{
            console.log(data.user.email)
        }
        return()=>preview()
    })
    const [update,setUpdate]=useState(true)
    const [userName,setUserName]=useState('user')
    const [useDesc,setUserDesc]=useState('안녕하세요')
    const [imgFiles,setImgFiles]=useState('')
    const upd=()=>{
        setUpdate(!update)
        const formdata=new FormData()
        formdata.append('uploadImage',imgFiles[0])
        const config={
            Headers:{
                'content-type':'multipart/form-data'
            }
        }
        // axios.post(`api`,formdata,config)
    }

    const updateImage=(e)=>{
        const imgFiles=e.target.files
        setImgFiles(imgFiles)
        }
  
    const preview=()=>{
        if(!imgFiles) return false;
        const img_box=document.querySelector('.main_img')
        const reader =new FileReader()
        console.log(reader.readAsDataURL(imgFiles[0]))
        console.log(reader.result)
        reader.addEventListener("load", function () {
            (img_box.style.backgroundImage=`url(${reader.result})`)
          }, false);
        }
        const deletImg=()=>{
            (document.querySelector('.main_img').style.backgroundImage=`url('')`)
        }
    if(update===true){
        return (
            <div className="mypage">
                <div className="mypage_wrap">
                    <div className="left">
                        <div className="main_img"></div>
                        <p className="name">{userName}</p>
                    </div>
                    <div className="right">
                        <p>이메일</p><span className="email">{props.userEmail}</span><br/>
                        <p>한마디</p><span className="desc">{useDesc}</span>
                        <button onClick={upd} className="up">수정</button>
                    </div>
                </div>
            </div>
          );
    }else{
        return (
            <div className="mypage update">
                <div className="mypage_wrap">
                    <div className="left">
                        <div className="main_img"><span className="add"><label for="img"></label></span></div>
                        <input id="img" className="upimg" accept="image/*" onChange={updateImage} type="file"></input>
                        <div className="button_wrap">
                            <button onClick={deletImg}>삭제</button>
                        </div>
                        <input defaultValue={userName} onChange={e=>setUserName(e.target.value)}></input>
                    </div>
                    <div className="right">
                        <p>이메일</p><span className="email">{props.userEmail}</span><br/>
                        <p>한마디</p>
                        <textarea onChange={e=>setUserDesc(e.target.value)} defaultValue={useDesc}></textarea>
                        <button onClick={upd}  className="up">정보 수정</button>
                    </div>
                </div>
            </div>
          );
    }
 
}

export default Mypage;
