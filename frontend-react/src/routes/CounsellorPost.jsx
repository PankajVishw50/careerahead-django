import { useParams, useSearchParams } from "react-router-dom";
import CounsellorProfileView from "../components/CounsellorProfileView";
import { useEffect, useState } from "react";

import '../assets/css/counsellor-profile.css'
import '../assets/css/post.css'
import About from "../components/About";
import Reviews from "../components/Reviews";
import Appoint from "../components/Appoint";
import QuestionSection from "../components/QuestionSection";

export default function CounsellorPost(){
    let {counsellorId} = useParams();
    const [counsellor, setCounsellor] = useState({})
    const [view, setView] = useState('Reviews')


    useEffect(() => {
        (async() => {
            const response = await fetch('/api/counsellor/' + counsellorId)
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

    function select_badge({currentTarget}){
        setView(currentTarget.getAttribute('name'))
    }

    return (
        <div className="profile-container">
            {
                counsellor && 
                <CounsellorProfileView
                counsellor={counsellor}/>

            }


            <div className="right-wrapper">

                <div className="views-wrapper">

                    <div className="views">


                        {
                            ['About', 'Q&A', 'Reviews', 'Appoint'].map((value, index) => {
                                return (
                                    <div className={
                                        'views__badge ' + (value === view ? 
                                        'views__badge--selected' :
                                        '')
                                    }
                                    key={index}
                                    onClick={select_badge}
                                    name={value}>
                                        <span className="views__badge-name">
                                            {value}
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>

                <div className="info-wrap">

                    {
                        [
                            ['About', <About counsellor={counsellor}/>], 
                            ['Q&A', <QuestionSection counsellor={counsellor}/>],
                            ['Reviews', <Reviews counsellor={counsellor}/>], 
                            ['Appoint', <Appoint counsellor={counsellor}/>]
                        ]
                        .find(el => el[0] === view)[1]
                    }

                </div>



            </div>


        </div>
    )

}