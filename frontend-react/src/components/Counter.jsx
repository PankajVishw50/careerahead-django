import { useOutletContext } from "react-router-dom"

import '../assets/css/SessionCounter.css'

export default function Counter({value, description}) {

    return (
        <div className="session-counter-container">
            <div className="session-counter-inner-container">
                <div className="inner-h1">
                    <h1>Counter</h1>
                </div>
                <div className="inner-counter">
                    <p>
                        {value}
                    </p>
                </div>
                <div className="inner-info">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )

}