import '../assets/css/Welcome.css';

function Welcome() {
    
    return (

        <>
            <div className="home">
                <div className="info">
                    <h1>
                        Do you know you need <span>help</span>?
                    </h1>
                    <p>
                        It will be surprising but most people who needs help don't even know it.
                        sometimes, we may not be able to see a way out or don't know how to
                        effectively deal with our problems. This is where a counselor can be of
                        great help. seeking the help of a counselor can be a valuable step
                        towards understanding oneself better.A counselor can provide the support
                        and guidance you need to move forward in life.
                    </p>
                    <div className="take-to-form-container">
                        {/* <button>
                        {" "}
                        <span className="text">Find out with our Form </span>{" "}
                        <span className="material-symbols-outlined arrow">trending_flat</span>{" "}
                        </button> */}
                    </div>
                </div>
                <div className="vector">
                    <div></div>
                </div>
            </div>
            
            <div className="about">
                <div className="heading">What do we offer ? </div>
                <div className="offers">
                    <div>
                        <h3>Specialised Counsellors</h3>
                        <p>
                            {" "}
                            We offer wide variety of counselors available to help individuals with
                            their specific needs and concerns.Now you don't have to worry about
                            the limited experts, You can choose from hundreds of different
                            counsellor according to your needs.
                        </p>
                        <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                        <h3>Trusted Professionals</h3>
                        <p>
                            {" "}
                            Gone the headache of finding the counsellor on which you can trust.
                            because we handpicked some of the best and well experienced
                            counsellors from industry.We have also 5-star rating system to ensure
                            the counsellor you are selecting is trustable
                        </p>
                        <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                        <h3>Customer Satisfaction</h3>
                        <p>
                            {" "}
                            In case you don't have full satisfaction after session with our high
                            experienced counsellors we guarantee you full refund or you can demand
                            for extra session.You can also rate our counsellor based on your
                            experience
                        </p>
                        <span className="material-symbols-outlined">sentiment_satisfied</span>
                    </div>
                    <div>
                        <h3>Help with selection</h3>
                        <p>
                            {" "}
                            If you don't know which type of counsellor you need, we will help you
                            in finding the best counsellor you just have to chat with our customer
                            service agent, and he will guide you to the path. You can chat 24x7
                            with our customer service agent, so you don't have to worry about
                            anything.
                        </p>
                        <span className="material-symbols-outlined">support</span>
                    </div>
                </div>
            </div>
        </>        
    )
}
export default Welcome