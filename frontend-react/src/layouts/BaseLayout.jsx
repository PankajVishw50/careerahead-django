import React from 'react'
import Header from '../components/Header'
import { Outlet, useOutletContext } from 'react-router-dom'
import Footer from '../components/Footer'

function BaseLayout() {
    console.log("In the BAse layout")
    const {auth, modal} = useOutletContext() 



    return (
        <div className="container">

            <Header/>

            <Outlet
            context={{
                auth,
                modal,
            }}
            />

            <Footer/>
            
        </div>
    )
}

export default BaseLayout