import { useEffect, useRef, useState } from "react"
import PaginationController from "../utils/PaginationController"
import ReviewCard from "./ReviewCard"

import '../assets/css/Reviews.css';
import PostReview from "./PostReview";

export default function Reviews({counsellor}) {

    
    
    const [,forceUpdate] = useState(0)
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const range = PaginationController.get_range(page, size)
    const url = `/api/counsellor/${counsellor && counsellor.id}/reviews`
    let [pagination_controller,] = useState(new PaginationController(url, handle_data, forceUpdate, [page, setPage], [size, setSize]))

    pagination_controller.setup(url, [page, setPage], [size, setSize])

    const [postReviewPanel, setPostReviewPanel] = useState(false) 
    
    useEffect(() => {
        if (counsellor.id){
            pagination_controller.nav(1);
        }
    }, [counsellor])

    if (!counsellor.id){
        return <></>
    }

    function handle_data({json}){

        setReviews(prevData => {
            const data = prevData.map(val => val);

            json.data.forEach(val => {
                data.push(val)
            });

            console.log('data is: ', data)
            pagination_controller.update_data(data)

            return data;
        });
    }


    return (

        <div className="reviews">

            {
                postReviewPanel && <PostReview counsellor_id={counsellor.id} setPostReviewPanel={setPostReviewPanel} forceUpdate={forceUpdate}/>
            }

            <div className="review__cards">

                {
                    reviews.slice(range[0], range[1]).map((review, index) => {

                        return (
                            <ReviewCard key={index} review={review}/>
                        )
                    })
        
                }
            </div>

            <div className="review__nav">
                <a href="/" className="review__nav-link review__nav-previous"
                onClick={(e) => {
                    e.preventDefault()
                    pagination_controller.nav(-1)
                }}>Prev</a>
                <a href="/" className="review__nav-link review__nav-next"
                onClick={(e) => {
                    e.preventDefault()
                    pagination_controller.nav(1)
                }}>Next</a>

                {
                    !postReviewPanel && (
                        <a href="#post-review" className="review__nav-link review__nav-review"
                        onClick={() => {
                            setPostReviewPanel(true)
                        }}>
                            Post review
                        </a>
                    )
                }

            </div>

        </div>



    )
}