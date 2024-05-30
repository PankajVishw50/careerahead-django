import { Link, useLocation, useOutletContext } from "react-router-dom";

export default function EmailVerificationPage(){
    const {auth, modal} = useOutletContext()
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
                <a href="/" className="email-verification__nav-link"
                onClick={async (e) => {
                    e.preventDefault();

                    const response = await fetch('/auth/email/send')
                    let json = {}

                    try{
                        json = await response.json()
                    }catch{}

                    if (response.status !== 200 || !json || !json.created){
                        return modal.toast(
                            'Failed to resend mail. Try again',
                            'error'
                        )   
                    }

                    return modal.toast(
                        'Successfully sended mail. Check your inbox and click on provided link to verify your email',
                        'success',
                    )   
                }}>
                    Resend Email
                </a>
            </ul>

        </div>

    )

}