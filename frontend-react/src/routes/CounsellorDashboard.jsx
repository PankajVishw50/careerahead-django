import { Link, useOutletContext } from "react-router-dom";
import AccountWindow from "../components/AccountWindow";
import Counter from "../components/Counter";

import "../assets/css/UserDashboard.css"

export default function CounsellorDashboard(){
    const {auth} = useOutletContext()

    return (
        
        <div className="dashboard-container">
            <div className="dash-main-row-left">
                <div className="panel-container">
                    <AccountWindow
                    auth={auth}
                    link={'/welcome'}
                    />

                    <button className="btn-blue-1">
                        <Link to='/market'>Explore Counsellors</Link>
                    </button>
                </div>
            </div>
            
            <div className="dash-main-row-center">
                <Counter
                value={42}
                description="This This is clients counter. It shows how many clients you have served
                till using this website session count.It shows your progress as human being.
                To grow and understand yourself better explore other counsellors"
                />
            </div>

            <div className="dash-main-row-right"></div>
        </div>

        

    )

}