import { useState, useEffect } from 'react'
import PaginationController from '../utils/PaginationController'

import '../assets/css/QuestionSection.css'
import AskQuestion from './AskQuestion';
import { useOutletContext } from 'react-router-dom';

export default function QuestionSection({counsellor}){
    const {auth, modal} = useOutletContext()
    const [,forceUpdate] = useState(0)
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);

    const range = PaginationController.get_range(page, size)
    const url = `/api/counsellor/${counsellor && counsellor.id}/questions`
    let [pagination_controller,] = useState(new PaginationController(url, handle_data, forceUpdate, [page, setPage], [size, setSize]))
    pagination_controller.setup(url, [page, setPage], [size, setSize])

    const [ask, setAsk] = useState(false);
    
    useEffect(() => {
        if (counsellor.id){
            console.log('counsellor: ', counsellor)
            pagination_controller.nav(1);
        }
    }, [counsellor])

    if (!counsellor.id){
        return <></>
    }

    function handle_data({json}){

        setQuestions(prevData => {
            const data = prevData.map(val => val);

            json.data.forEach(val => {
                data.push(val)
            });

            pagination_controller.update_data(data)

            return data;
        });
    }


    return (

        <div className="question-section-wrapper">
            <div className="question-section">

                { ask && <AskQuestion counsellor_id={counsellor.id} user_id={auth.data.id} askPanel={setAsk}/>}

                {
                    questions.slice(range[0], range[1]).map((question, index) => {
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
                    })
                }


            </div>

            <div className="question__nav">
                <a href="/" className="question__nav-link question__nav-previous"
                onClick={(e) => {
                    e.preventDefault()
                    pagination_controller.nav(-1)
                }}>Prev</a>
                <a href="/" className="question__nav-link question__nav-next"
                onClick={(e) => {
                    e.preventDefault()
                    pagination_controller.nav(1)
                }}>Next</a>

                
                {
                    !ask && (
                        <a href="#ask-question"
                        className='question__nav-link question__ask-question'
                        onClick={(e) => {
                            setAsk(prevData => !prevData)
                        }}
                        >
                            Ask a question
                        </a>
                    )
                }


            </div>


        </div>
    )

}
