import '../css/Mypage.css'
import axios from 'axios';
import { firestore,auth,firebaseInstance ,storageRef } from './Firebase';
import { useEffect, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"
function Mypage(props) {
    const [update,setUpdate]=useState(true)
    const [userName,setUserName]=useState(props.Logindata.name)
    const [imgFiles,setImgFiles]=useState('')
    const [userComment,setUserComment]=useState(props.Logindata.comment)
    const auth = getAuth();
    const img_box=document.querySelector('.main_img')
    const reader =new FileReader()
    const [imgUrl,setImgUrl]=useState('')
    const storage = firebaseInstance.storage();
    var storageRef = storage.ref();
    const use=firestore.collection("user")
    
    useEffect( async()=>{
        await  auth.onAuthStateChanged((user) => {
          if (user) {
            try {
                let url = '';
                if('image/'+user.uid+"_main_img.jpg"==null){
                    console.log("tjfaks")
                }
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
    })

    useEffect(()=>{
        preview()
        return()=>preview()
    })
    const UpImg=async()=>{
        console.log(imgUrl)
        if(imgFiles[0]==undefined){
           return
        }else{
            console.log("no")
            var dd = storageRef.child('image/' + props.Logindata.user_uid+"_main_img.jpg");
            console.log(dd)
            console.log(imgFiles[0])
            var aa = dd.put(imgFiles[0])
            
        }
            
    }
    const Uupd=()=>{
        setUpdate(!update)
    }
    const upd=async(imgUrl)=>{
        setUpdate(!update)
        if(userName){
            await use.doc(props.Logindata.user_uid).update({
                name:userName,
            })
            console.log(userName)
        }
         if(userComment){
            await use.doc(props.Logindata.user_uid).update({
                comment:userComment,
            })
        }
        UpImg()
        window.location.reload();
        props.upd(imgUrl)
    }

    const updateImage=(e)=>{
        const imgFiles=e.target.files
        setImgFiles(imgFiles)
        }
  
    const preview=()=>{
        const reader =new FileReader()
        if(!imgFiles) return false;
        reader.readAsDataURL(imgFiles [0]);
        reader.addEventListener("load", function () {
            (img_box.src=reader.result)
        }, false);
 
        }
        const deletImg=()=>{
            
            var desertRef = storageRef.child('image/' + props.Logindata.user_uid+"_main_img.jpg");
            console.log(desertRef)
            // Delete the file
            desertRef.delete().then(function() {
                console.log("succes")
                img_box.src=''

            }).catch(function(error) {
            console.log(error)
            });
        }
        const DeletUser=()=>{
            const us=auth.currentUser
            console.log(us)
              auth.onAuthStateChanged((user) => {
                if(window.confirm("정말 탈퇴하시겠습니까?")){
                    us.delete().then(() => {
                        console.log("succes")
                        props.DeletUser()
                         window.location.hash="/"
                      }).catch((error) => {
                        console.log(error)
                      });
                }
            });

                
                
        }
    if(update===true){
        return (
            <div className="mypage">
                <div className="mypage_wrap">
                    <div className="left">
                    <div className='img_wrap'><img src={imgUrl} className="main_img"></img></div>
                        <p className="name">{props.Logindata.name}</p>
                    </div>
                    <div className="right">
                        <p>이메일</p><span className="email">{props.Logindata.email}</span><br/>
                        <p>한마디</p><span className="desc">{props.Logindata.comment}</span>
                        <button onClick={Uupd} className="up">수정</button>
                    </div>
                </div>
            </div>
          );
    }else{
        return (
            <div className="mypage update">
                <div className="mypage_wrap">
                    <div className="left">
                        <div className='img_wrap'><img src={imgUrl} className="main_img"></img><span className="add"><label for="img"></label></span></div>
                        <input id="img" className="upimg" accept="image/*" onChange={updateImage} type="file"></input>
                        <div className="button_wrap">
                            <button onClick={deletImg}>삭제</button>
                        </div>
                        <input defaultValue={props.Logindata.name} onChange={e=>setUserName(e.target.value)}></input>
                    </div>
                    <div className="right">
                        <p>이메일</p><span className="email">{props.Logindata.email}</span><br/>
                        <p>한마디</p>
                        <input onChange={e=>setUserComment(e.target.value)} defaultValue={props.Logindata.comment}></input>
                        <button onClick={DeletUser}  className="up delete"><a>회원탈퇴</a></button>
                        <button onClick={upd}  className="up"><a>정보 수정</a></button>
                    </div>
                </div>
            </div>
          );
    }
 
}

export default Mypage;
