import { firestore,auth,firebaseInstance ,storageRef } from './Firebase';
import { useEffect, useState } from "react"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import '../css/Cart.css'
function Cart() {
    
    const use=firestore.collection("user")
    const [posts, setPosts] = useState([]);
    const [cart_list,setCart_list]=useState([])
    const [checkItems,setCheckItems]=useState([])
    const [check,setCheck]=useState(false)
    const [price,setPrice]=useState([])
    const [Saleprice,setSalePrice]=useState()
    const [firstprice,setFirstPrice]=useState()
    const [totalprice,setTotalPrice]=useState()
    const [count,setCount]=useState(1)
    useEffect(async()=>{
        await auth.onAuthStateChanged((user)=>{
          if(user){
            use.doc(user.uid).get().then((doc)=>{
                setCart_list(doc.data().userImg)
              })
          }
        })
      },[])
     useEffect(()=>{
        const sum = price.reduce((acc, cur, i) => {
            return acc + cur;
        }, 0);
        setFirstPrice(sum)
        if(sum>=50000){
            setSalePrice(firstprice/10)
        }else{
            setSalePrice(0)
        }
        setTotalPrice(firstprice-Saleprice)
     })
      const handleSingleCheck = (checked, id) => {
        if (checked) {
          setCheckItems([...checkItems, id])
          setPrice(price.concat(id.price))
          console.log("true")
        } else {
            console.log("false")
            setPrice(price.filter(data=>data!==id.price));
            setCheckItems(checkItems.filter((el) => el !== id));
        }
      };
      
      const handleAllCheck = (checked) => {
        if (checked) {
        //   const idArray = [];
        //   // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
        //   // 전체 체크 박스 체크
        //   cart_list.forEach((el) => idArray.push(el.id));
        //   setPosts(idArray);
          setCheckItems(cart_list)
          for(var i=0;i<cart_list.length;i++){
                // setPrice(price.concat(cart_list[i].price))
                console.log(cart_list[i].price)
            }
            console.log(price)
        }
        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
            setPrice([])
        }
      };
      const cart_result=cart_list.map(
        (data)=>(<div className='cart_box'>
                  <input onClick={(e)=>handleSingleCheck(e.target.checked,data) }
                  checked={checkItems.includes(data) ? true : false}
                  type='checkbox'/>
                  <div className='cart_img'> 
                      <img src={data.url}></img>
                  </div>
                  <span className='title'>{data.title}</span>
                  <div className='count'>
                    {/* <button className='minus'>-</button>
                    {count}
                    <button onClick={(e)=>plusCount(e)} className='plus'>+</button> */}
                  </div>
                  <span className='price'>{data.price}</span>
              </div>)
    )
  return (
    <div className="cart">
      <div className='cart_wrap'>
          <div className='cart_top'>
              <input type='checkbox' id="allcheck"
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={
                cart_list.length === checkItems.length? true : false
              }
              />
              {cart_result}
          </div>
          <div className='cart_bottom'>
            <p className='notice'>50,000이상 구매시 10% 할인</p>
            <div className='cart_bottom_wrap'>
                <span className='price'>상품가격<p className='price_number'>{firstprice}</p></span><br/>
                <span className='cupon_price'>쿠폰가격<p className='price_number'>{Saleprice}</p></span><br/>
                <span className='total_price'>최종가격<p className='price_number'>{totalprice}</p></span>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Cart;
