'use client'


import {useEffect, useState} from "react";

const ReviewsList = ({id}:{id:number}) => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/loadReviews/${id}`,).
        then(res => res.json()).
        then(data => setReviews(data.results || [])).
            catch(err => console.error(err)).finally(() => setLoading(false));
    }, []);
    if (loading) return <p>Loading...</p>;
    return (
        <div className="mt-10 bg-bg/40 p-5 rounded-lg border border-second/30">
            <h2 className="text-xl font-bold mb-4">User Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                reviews.slice(0,5).map((review) => (
                    <div key={review.id} className="mb-4 border-b border-primer pb-2">
                        <p className="font-semibold">{review.author}</p>
                        <p> Rating:<strong className="text-primer"> {review?.author_details?.rating || "- "} / 10</strong></p>
                        <p>{review.content}</p>
                    </div>
                ))
            )}
        </div>
    )
}
export default ReviewsList
