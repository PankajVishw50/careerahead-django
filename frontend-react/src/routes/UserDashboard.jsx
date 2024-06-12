import { Link, useOutletContext } from "react-router-dom";
import AccountWindow from "../components/AccountWindow";
import CounsellorCard from "../components/CounsellorCard";
import Counter from "../components/Counter";

import "../assets/css/UserDashboard.css"

export default function UserDashboardPage(){
    const {auth} = useOutletContext()

    return (

        <div className="dashboard-container">
            <div className="dash-main-row-left">
                <div className="panel-container">
                    <AccountWindow
                    auth={auth}
                    link={'/welcome'}
                    hide_button={true}
                    />

                    <button className="btn-blue-1">
                        <Link to='/market'>Explore Counsellors</Link>
                    </button>
                </div>
            </div>
            
            <div className="dash-main-row-center">
                <Counter
                value={0}
                description="This is session count.It shows your progress as human being.
                To grow and understand yourself better explore other counsellors"
                />
            </div>

            <div className="dash-main-row-right"></div>
        </div>

        

    )

}