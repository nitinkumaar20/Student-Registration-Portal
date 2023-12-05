import React from 'react'
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";

export default function BatchMain() {
  return (
    <>

    <div className='d-flex justify-content-center h-100 w-100' style={{alignItems:"center"}}>
        {/* <Link to="./showbatches" style={{borderRadius:'5rem' , padding:'6rem',width:'18rem',fontSize:'1rem',border:'none',boxShadow:' rgba(149, 157, 165, 0.4) 0px 8px 24px', backgroundColor:'#00ccff',textDecoration:'none',color:'white'}} >SHOW BATCH</Link> */}


        <Link to="./showbatches" style={{borderRadius:'5rem' , padding:'6rem',width:'19rem',fontSize:'1rem',border:'none',boxShadow:' rgba(149, 157, 165, 0.4) 0px 8px 24px', backgroundColor:'var(--primary)',textDecoration:'none',color:'white'}} className='mx-4'>SHOW BATCH</Link>

        <Link to="./addbatch" style={{borderRadius:'5rem' , padding:'6rem',width:'18rem',fontSize:'1rem',border:'none',boxShadow:' rgba(149, 157, 165, 0.4) 0px 8px 24px', backgroundColor:'var(--primary)',textDecoration:'none',color:'white'}} className='mx-4'>ADD BATCH</Link>

    </div>
    </>
  )
}

