import { useState, useEffect } from 'react'
import PaginationController from '../utils/PaginationController'

import '../assets/css/QuestionSection.css'
import AskQuestion from './AskQuestion';
import { useOutletContext } from 'react-router-dom';
import QuestionCard from './QuestionCard';

export default function QuestionSection({counsellor}){
    const {auth, modal} = useOutletContext()
    const [,forceUpdate] = useState(0)
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);

    const range = PaginationController.get_range(page, size)
    const url = `/api/counsellor/${counsellor && counsellor.id}/questions`
    let [pagination_controller, setPaginationController] = useState(new PaginationController(url, handle_data, forceUpdate, [page, setPage], [size, setSize]))
    pagination_controller.setup(url, [page, setPage], [size, setSize])

    const [ask, setAsk] = useState(false);

    useEffect(() => {
        reset_question()
    }, [forceUpdate])
    
    useEffect(() => {
        if (counsellor.id){
            console.log('counsellor: ', counsellor)
            pagination_controller.nav(1);
        }
    }, [counsellor, pagination_controller])

    if (!counsellor.id){
        return <></>
    }

    function reset_question(){
        setQuestions([]);
        setPaginationController(
            new PaginationController(url, handle_data, forceUpdate, [page, setPage], [size, setSize])
        );
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
                        return <QuestionCard question={question} forceUpdate={forceUpdate} reload={true}/>
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
