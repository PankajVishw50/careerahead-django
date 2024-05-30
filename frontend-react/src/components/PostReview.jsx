import { useState } from "react"

import '../assets/css/PostReview.css'
import { useNavigate, useOutletContext } from "react-router-dom";

export default function PostReview({counsellor_id, setPostReviewPanel, forceUpdate}){

    const {modal} = useOutletContext()
    const navigate = useNavigate()

    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('')

    async function post_review(){

        if (rating < 1){
            return modal.toast(
                'Select rating first',
                'error'
            )
        }else if (message.length < 20 || message.length > 1024){
            return modal.toast(
                'Message should be larger than 20 chars and smaller than 1024 chars',
                'error',
            )
        }

        const response = await fetch(`/api/counsellor/${counsellor_id}/review`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                rating: rating,
                comment: message
            })
        })
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200 && !json.created){
            return modal.toast(
                json.message ?? 'Failed to post review',
                'error',
            )
        }

        modal.toast(
            'Successfully posted review. Thanks for taking your time',
            'success',
        )
        setPostReviewPanel(false)
        navigate()

    }

    return (
        <div className="post-review" id="post-review">

            <div className="post-review__input-area post-review__star-area">
                <h4 className="post-review__label post-review__star-label">
                    Rating
                </h4>

                <div className="post-review__value post-review__stars">
                    {
                        Array(5).fill(0).map((value, index) => {
                            return (
                                <span 
                                className={
                                    'material-symbols-outlined post-review__star ' + 
                                    (
                                        index < rating ? 
                                        'post-review__star--selected' : 
                                        ''
                                    )
                                }
                                value={index+1}
                                onClick={(e) => {
                                    console.log('clicked');
                                    setRating(e.currentTarget.getAttribute('value') * 1)
                                }}>
                                    star
                                </span>
                            )
                        })
                    }
                </div>
            </div>

            <div className="post-review__input-area post-review__comment-area">
                    <h4 className="post-review__label post-review__comment-label">
                        Comment
                    </h4>

                    <textarea name="comment"
                    maxLength={1024}
                    rows={10}
                    placeholder="type atleast 20 chars"
                    defaultValue={message}
                    onChange={e => {
                        setMessage(e.currentTarget.value)
                    }}
                    >

                    </textarea>
            </div>

            <div className="post-review__controller">
                <button className="post-review__button post-review__cancel"
                    onClick={() => {
                        setPostReviewPanel(false)
                    }}>
                        Cancel
                    </button>

                    <button className="post-review__button post-review__post"
                    onClick={post_review}
                    >
                        Post
                    </button>

            </div>

        </div>
    )

}