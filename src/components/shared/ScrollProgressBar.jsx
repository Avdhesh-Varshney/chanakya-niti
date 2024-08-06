import React, { useEffect,useState } from 'react'
const ScrollProgressBar = () => {
  const [scrollWidth,setScrollWidth]=useState(0)
  useEffect(()=>{
    const fillScrollLine=()=>{
      const windowHeight=window.innerHeight;
      const fullHeight=document.body.clientHeight;
      const scrolled=window.scrollY;
      const percentScrolled=(scrolled/(fullHeight-windowHeight))*100;
      setScrollWidth(percentScrolled);
    }
    window.addEventListener('scroll',fillScrollLine);
    return ()=>window.removeEventListener('scroll',fillScrollLine);
  },[]);
  return (
    <div className={`scroll-progress-bar ${scrollWidth>0 ?'visible':''}` 
    } style={{width:`${scrollWidth}%`}}>

    </div>
  )
}

export default ScrollProgressBar
