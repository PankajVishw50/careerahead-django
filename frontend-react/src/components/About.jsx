
import '../assets/css/About.css'

export default function About({counsellor}) {
    return (

        <div className="about">

            <div className="about__section">
                <div className="about__header">
                    <div className="about__logo">
                        <span className="material-symbols-outlined">
                            article
                        </span>
                    </div>
                    <h1 className="about__header-text">
                        Introduction
                    </h1>
                </div>

                <div className="about__paragraph">
                    <p className="about__paragraph-text">
                        {counsellor.introduction_section}
                    </p>
                </div>

            </div>

            <div className="about__section">
                <div className="about__header">
                    <div className="about__logo">
                        <span className="material-symbols-outlined">
                            school
                        </span>
                    </div>

                    <h1 className="about__header-text">
                        Qualification
                    </h1>
                </div>

                <div className="about__paragraph">
                    <p className="about__paragraph-text">
                        {counsellor.qualification_section}
                    </p>
                </div>

            </div>

            <div className="about__section">
                <div className="about__header">
                    <div className="about__logo">
                        <span className="material-symbols-outlined">
                            settings_applications
                        </span>
                    </div>

                    <h1 className="about__header-text">
                        Specialization
                    </h1>
                </div>

                <div className="about__paragraph">
                    <p className="about__paragraph-text">
                        {counsellor.specialization_section}
                    </p>
                </div>

            </div>

            <div className="about__section">
                <div className="about__header">
                    <div className="about__logo">
                        <span className="material-symbols-outlined">
                            payments
                        </span>
                    </div>

                    <h1 className="about__header-text">
                        Charges
                    </h1>
                </div>

                <div className="about__paragraph">
                    <p className="about__paragraph-text">
                        {counsellor.rates_section}
                    </p>
                </div>

            </div>




        </div>

    )   
}