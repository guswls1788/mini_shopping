import { firestore,auth,firebaseInstance ,storageRef } from './Firebase';
import { useState,useEffect } from "react"
import { getAuth, updateProfile } from "firebase/auth";
import '../css/Home.css'
import jquery, { hasData } from 'jquery';
import $ from 'jquery';
import img_1 from '../images/shoes-4973977_1920.jpg'
import img_2 from '../images/pink-4973985_1920.jpg'
import img_3 from '../images/white-4973980_1920.jpg'
import img_4 from '../images/shoes-4973976_1920.jpg'
function Home() {
    const [item,setItem]=useState([
        {id:1,url:img_1,price:18000,title:"bule_shoes"},
        {id:2,url:img_2,price:26600,title:"pink_shoes"},
        {id:3,url:img_3,price:15200,title:"white_shoes"},
        {id:4,url:img_4,price:17100,title:"pink_shoes"},
        
      ]);
      const dbService = firebaseInstance.firestore();
      const auth = getAuth();
      const [shopData,setShopData]=useState()
      const [shop,setShop]=useState([])
      const use=firestore.collection("user")
      useEffect(()=>{
        $(document).ready(function(){
          $(".cart").click(function(){
            $(this).toggleClass("add")
          })
          $(".home .home_wrap .item_box").hover(function(){
            $(this).css("box-shadow","5px 5px 10px 10px #eee")
          },function(){
            $(".home .home_wrap .item_box").css("box-shadow","")
          })
        })
      })
      
      useEffect(async()=>{
        await auth.onAuthStateChanged((user)=>{
          if(user){
            CartBtn()
              use.doc(user.uid).update({
                userImg:shop,
              })
          }
      })
      })
      useEffect(async()=>{
        // setShop(shopData)
        await auth.onAuthStateChanged((user)=>{
          if(user){
            use.doc(user.uid).get().then((doc)=>{
              for(var a=0;a<item.length;a++){
                document.getElementsByClassName("cart_btn")[a].style.backgroundPosition="left"
              }
              for(var i=0;i<doc.data().userImg.length;i++){
                  document.getElementsByClassName("cart_btn")[doc.data().userImg[i].id-1].style.backgroundPosition="right"
                }
                // setShop(doc.data().userImg)
                // setShopData(doc.data())
              })
          }
        })
      })
     useEffect(async()=>{
       await auth.onAuthStateChanged((user)=>{
        if(user){
          use.doc(user.uid).get().then((doc)=>{
            // setShop(doc.data().userImg)
            })
        }
      })
    })
    useEffect(()=>{
      console.log(shopData)
     })
      const CartBtn=async(data)=>{
        await auth.onAuthStateChanged((user)=>{
          if(user){
            const addShop= shop.concat({"id":data.id,"url":data.url,"price":data.price,"title":data.title})
            setShop(addShop)
            for(var i=0;i<=shop.length;i++){
              if(shop[i].id===data.id){
                const filterShop=shop.filter((data)=>(data.id!=shop[i].id))
                setShop(filterShop)
              }
            }
           }
           console.log(shop)
         })
      
      }
      const item_list=item.map(
          (data)=>(<div className="item_box"><div className="img"><img src={data.url}/></div>
          <p className="title">{data.title}</p><p className="price">{data.price}</p>
          <button onClick={()=>CartBtn(data)} id={"cart"+data.id}  className="cart_btn"></button></div>)
      )
  return (
    <div className="home">
      <div className="home_wrap">
         {item_list}
      </div>
    </div>
  );
}

export default Home;
