
import { useEffect, useState } from 'react';
import {useOutletContext} from 'react-router-dom'
import '../assets/css/AskQuestion.css';

export default function AskQuestion({counsellor_id, askPanel}) {
    const {modal} = useOutletContext()

    const [data, setData] = useState({
        question: '',
    })

    async function post_question(){

        if (data.question.length < 10){
            return modal.toast(
                'Type question first. min length should be 10 chars',
                'error',
            )
        }

        const response = await fetch(`/api/counsellor/${counsellor_id}/ask`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200 || !json.created){
            return modal.toast(
                json.message ?? 'Failed to post question',
                'error'
            )
        } 

        
        modal.toast(
            'You will be notified once counsellor reply to your question',
            'success',
        )

        askPanel(false)
        return;


    }

    function handle_change(e){
        e.preventDefault();

        const {currentTarget} = e;
        setData(prevData => {
            return {
                ...prevData,
                [currentTarget.name]: currentTarget.value,
            }
        });


    }
    
    return (
        <div className="ask-question" id='ask-question'>

            <div className="ask-question__input-area">

                <textarea name="question" className="ask-question__input"
                rows={3}
                maxLength={200} placeholder='try to end with an question mark (?) '
                defaultValue={data.question}
                onChange={handle_change}
                ></textarea>

            </div>

            <div className="ask-question__controller-area">

                <button className="ask-question__button ask-question__cancel"
                onClick={() => {
                    askPanel(false)
                }}>
                    Cancel
                </button>

                <button className="ask-question__button ask-question__ask"
                onClick={post_question}>
                    Ask
                </button>
                
            </div>

        </div>
    )


}