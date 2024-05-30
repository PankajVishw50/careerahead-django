
export default function QuestionCard({question}){

    return (
        <div className="question" key={index}>
        <div className="question__user-logo">
            <img src={'/' + question.user.image} alt="" className="question__user-img" />
        </div>

        <div className="question__user-info">
            <div className="question__user-header">
                <h1 className="question__header-text">
                    {question.question}
                </h1>
            </div>

            <div className="question__user-name">
                <span className="question__user-name-text">
                    {question.user.username[0].charAt(0).toUpperCase() + question.user.username.slice(1)}
                </span>
            </div>


        </div>

        <div className="question__answer-section">
            <div className="question__answer-counsellor-logo">
                <img className='question__answer-counsellor-img' src={'/' + counsellor.image} alt="counsellor" />
            </div>

            <div className="question__answer-counsellor-name">
                <span className="question__answer-counsellor-name-text">
                    {counsellor.username[0].charAt(0).toUpperCase() + counsellor.username.slice(1)}
                </span>

                <span className="material-symbols-outlined question__answer-reply-logo">
                    prompt_suggestion
                </span>
                <span className='question__answer-reply-text'>
                    replied on&nbsp;
                </span>
                <b className="question__answer-reply-time">
                    {question.answer_time}
                </b>
            </div>

            <div className="question__counsellor-answer">
                <p>
                    {question.answer}
                </p>
            </div>

        </div>
    </div>

    )

}