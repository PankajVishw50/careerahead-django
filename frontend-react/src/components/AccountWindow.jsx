import { Link } from "react-router-dom";

import '../assets/css/AccountWindow.css'

export default function AccountWindow({auth, link, hide_button}){

    return (

        <div className="account-window-container">
            <div className="acc-window-image">
                <img
                    src={'/' + auth.data.image ?? 'user_default.png'}
                    alt="user"
                />
            </div>

            <div className="acc-window-info">
                <div className="acc-window-info-header">
                    <h3>
                        {auth.data.username}
                    </h3>
                </div>
                <div className="acc-window-info-attr">
                    <p className="gender box">
                        {auth.data.gender ? auth.data.gender[0] : "?"}
                    </p>
                    <p className="age box">
                        {auth.data.age ?? '?'}
                    </p>
                </div>
            </div>
            <div className="acc-window-design">
            <div className="first" />
            <div className="second" />
                <div className="third" />
            </div>
            <div className="acc-window-button">
                {
                    !hide_button && (
                        <Link className="btn-green-edit" to={link} role="button" style={{
                            color: 'black',
                        }}>PROFILE</Link>

                    )
                }
            </div>
        </div>

    )

}