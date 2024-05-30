
import '../assets/css/ReviewCard.css'

export default function ReviewCard({review}){

    return (
        <div className="review-wrapper">
            <div className="review">

                <div className="review__user-logo">
                    <img src={'/' + review.user.image} alt="" />
                </div>

                <div className="review__user-info">
                    <div className="review__user-name">
                        {review.user.username[0].charAt(0).toUpperCase() + review.user.username.slice(1)}
                    </div>
                    <div className="review__stars">
                        {
                            Array.from({length: 5}).map((value, index) => {

                                return (
                                    <span key={index} className={'material-symbols-outlined review__star ' + 
                                        (index < review.rating ? 
                                        'review__star--active' : 
                                        '')
                                    }>
                                        star
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="review__controllers"></div>

                <div className="review__section">
                    <div className="review__comment">
                        {review.comment}
                    </div>
                    <div className="review__timing">
                        {review.posting_time}
                    </div>

                </div>



            </div>
        </div>
    )


}