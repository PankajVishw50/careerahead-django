import {useOutletContext, Link} from 'react-router-dom'

import '../assets/css/CounsellorCard.css';
import get_types_string from '../utils/get_types_string';


export default function CounsellorCard({counsellor}){
    // const {auth} = useOutletContext()

    const _types = counsellor.type ? counsellor.type.map(el => el.type) : [];

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
                        {get_types_string(_types)}
                    </span>
                </div>
                <div className="couns-info-desc">
                    <p>
                    {
                        counsellor.description && counsellor.description.slice(0, 180)
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