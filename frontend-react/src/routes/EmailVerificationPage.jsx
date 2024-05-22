import { Link, useLocation, useOutletContext } from "react-router-dom";

export default function EmailVerificationPage(){
    const {auth} = useOutletContext()
    const query = new URLSearchParams(useLocation().search)


    return (
        
        <div className="email-verification">

            <h3 className="email-verification__header">
                {
                    auth && auth.data && auth.data.email_meta && auth.data.email_meta.verified ? (
                        <span className="email-verification__header-text">
                            Your email is verifed: 
                        </span>
                    )
                    :
                    (
                        <span className="email-verification__header-text">
                            Email not verified: 
                        </span>
                    )
                } 
                <b className="email-verification__header-value">{auth && auth.data ? auth.data.email: null}</b>
            </h3>
            
            <p className="email-verification__meta">
                {query.get('msg')}
            </p>

            <ul className="email-verification__navs">
                {
                    (auth && auth.data) && (!auth.data.email_meta || (
                        (!auth.data.email_meta.verified) && 
                        ((new Date(auth.data.email_meta.expiry_date)) > (new Date()))
                    )) ? 
                    <Link className="email-verification__nav-link" to='/welcome'>Resend Email</Link>
                    :
                    null
                }
            </ul>

        </div>

    )

}