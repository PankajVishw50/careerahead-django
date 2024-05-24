import {useOutletContext, Link} from 'react-router-dom'

import '../assets/css/CounsellorCard.css';


export default function CounsellorCard({counsellor}){
    // const {auth} = useOutletContext()

    return (
        <div className="couns-card-container">

            <div className="couns-image-col">
                <img src={
                    counsellor.image ?? 'counsellor_default.jpg'
                } alt="" />
            </div>

            <div className="couns-info-col">
                <div className="couns-info-name">
                    <span>
                        {counsellor.username}
                    </span>
                </div>
                <div className="couns-info-type">
                    <span>
                    </span>
                </div>
                <div className="couns-info-desc">
                    <p>
                    {
                        counsellor.description.slice(0, 180)
                    }
                     <span>.....MORE</span>
                    </p> 
                </div>
            </div>
            <div className="couns-btn-col">
                <Link to={'/counsellor/' + counsellor.id}>
                    <button className="btn1">Find Out</button>
                </Link>
            </div>
            <div className="couns-review-col">
                <div className="couns-review-fee">
                    <span className="icon material-symbols-outlined">payments</span>
                    <span className="text">
                    {
                        counsellor.fee
                    }
                    </span>
                </div>
                <div className="couns-review-clients">
                    <span>
                    More than {
                        counsellor.total_clients
                    } + clients
                    </span>
                </div>
            </div>
        </div>
    )

}