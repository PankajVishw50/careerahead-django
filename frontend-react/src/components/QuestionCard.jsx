
import { useOutletContext } from 'react-router-dom'
import '../assets/css/QuestionCard.css'
import { useState } from 'react';

export default function QuestionCard({question, forceUpdate, reload}){
    const {auth, modal} = useOutletContext()

    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState(question.answer)

    async function delete_question(){
        const response = await fetch(`/api/counsellor/question/${question.pk}/delete`, {
            method: 'delete'
        });
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200 || !json.deleted){
            return modal.toast(
                json.message ?? 'Failed to delete question',
                'error'
            )
        }

        modal.toast( 
            'Successfully deleted question',
            'success'
        )
        forceUpdate(prevData => prevData + 1)
        
        if (reload){
            window.location.reload()
        }

    }

    async function save_question(){

        if (message.length < 20 || message.length > 1024){
            return modal.toast(
                'answer length should be larger than 20 chars and smaller than 1024 chars',
                'error',
            )
        }

        const response = await fetch(`/api/counsellor/question/${question.pk}/answer`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                answer: message
            })
        })
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200 || !json.updated){
            return modal.toast(
                json.messsage ?? 'failed to update the answer',
                'error'
            )
        }

        modal.toast(
            'Successfully updated answer',
            'success',
        )

        setEdit(false)
        if (reload){
            window.location.reload()
        }

    }

    return (
        <div className="question">
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
                    <img className='question__answer-counsellor-img' src={'/' + question.counsellor.user.image} alt="counsellor" />
                </div>

                <div className="question__answer-counsellor-name">
                    <span className="question__answer-counsellor-name-text">
                        {question.counsellor.user.username[0].charAt(0).toUpperCase() + question.counsellor.user.username.slice(1)}
                    </span>

                    <span className="material-symbols-outlined question__answer-reply-logo">
                        prompt_suggestion
                    </span>

                    <span className={
                        'question__answer-reply-text ' + (!question.answer_time ?
                        'question__answer-reply-text--not-replied' : '')
                    }>
                        {
                            question.answer_time ? 
                            'replied on' :
                            'not replied'
                        }&nbsp;
                    </span>
                    <b className="question__answer-reply-time">
                        {question.answer_time}
                    </b>
                </div>

                <div className="question__counsellor-answer">
                    {
                        edit ? 
                        (
                            <div className="question__controller-edit">
                                <textarea name="edit" id="" className="question__controller-edit-input"
                                defaultValue={message}
                                onChange={(e) => {
                                    setMessage(e.target.value)
                                }}
                                >
                                </textarea>
                            </div>
                        ) : (
                            <p>
                                {question.answer}
                            </p>
                        ) 
                    }
                    <p>
                    </p>
                </div>

            </div>

            <div className="question__controller">

                {/* render delete button if either it's same user or counsellor */}
                {
                    (auth.data.pk === question.user.pk ||
                    auth.data.pk === question.counsellor.pk) && 
                    (
                        <button className="question__controller__button question__controller__button-delete"
                        onClick={delete_question}>
                            Delete
                        </button>
                    )
                }

                {/* render Edit button if counsellor */}
                {
                    (auth.data.pk === question.counsellor.pk) && !edit && 
                    (
                        <button className="question__controller__button question__controller__button-edit"
                        onClick={() => {
                            setEdit(prevData => !prevData)
                        }}>
                            {question.answer_time ? 'Edit' : 'Answer'}
                        </button>
                    )
                }

                {/* Save button */}
                {
                    (auth.data.pk === question.counsellor.pk) && edit &&
                    (
                        <button className="question__controller__button question__controller__button-save"
                        onClick={save_question}>
                            Save
                        </button>
                    )
                    
                }


            </div>


        </div>

    )

}