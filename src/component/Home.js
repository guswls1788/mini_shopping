import { useState } from "react"
import '../css/Home.css'
function Home() {
    const [item,setItem]=useState([
        {url:"",price:"19,000",title:"dd"},
        {url:"",price:"19,000",title:"dd"},
        {url:"",price:"19,000",title:"dd"},
        {url:"",price:"19,000",title:"dd"},
        
      ]);
      const item_list=item.map(
          (data)=>(<div className="item_box"><div className="img"><img src={data.url}/>
          <p className="title">{data.title}</p><p className="price">{data.price}</p></div></div>)
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
