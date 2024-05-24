import { useParams, useSearchParams } from "react-router-dom";
import CounsellorProfileView from "../components/CounsellorProfileView";
import { useEffect, useState } from "react";

import '../assets/css/counsellor-profile.css'
import '../assets/css/post.css'

export default function CounsellorPost(){
    let {counsellorId} = useParams();

    const [counsellor, setCounsellor] = useState({})

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/counsellor/counsellor/' + counsellorId)
            let json = {}

            try{
                json = await response.json()
            }catch{}

            if (response.status !== 200){
                return alert('something went wrong')
            }

            setCounsellor(json.data)

        })()
    }, [])

    return (
        <div className="profile-container">
            {
                counsellor && 
                <CounsellorProfileView
                counsellor={counsellor}/>

            }

            <div className="post-container">
                <div className="post-headers">
                    <h3>Post</h3>
                </div>
                <hr />
                <div className="post-description">
                    <p>
                        {counsellor && counsellor.description}
                    </p>
                </div>
                <div className="price">
                    <span className="material-symbols-outlined vector" style={{flex: 'none', width: 'auto'}}>paid</span>
                    <p>
                        {counsellor ? counsellor.fee : ''}
                    </p>
                    <span className="placeholder">
                    (This amount will be charged from your account)
                    </span>
                </div>
                <div className="action-links">
                    <button className="btn1 book-btn">Book Session</button>
                </div>
            </div>
        </div>
    )

}