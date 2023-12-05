import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Header from './Header'

export default function About() {
  return (
    <>
    <Header/>
    <Navbar/>
    <article style={{minHeight:'50vh'}}>
    <div>
      <h1>about
      </h1>
    </div>
    </article>
    <Footer/>
    </>
  )
}
