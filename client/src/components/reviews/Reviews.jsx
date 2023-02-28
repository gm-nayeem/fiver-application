import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { publicRequest, userRequest } from '../../utils/request';
import Review from '../review/Review'
import './reviews.scss'

const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient();

    // fetch gig review
    const { isLoading, error, data } = useQuery({
        queryKey: [`reviews`],
        queryFn: () =>
            publicRequest.get(`/reviews/${gigId}`).then(res => {
                return res.data;
            }),
    });

    // send post req 
    const mutation = useMutation({
        mutationFn: (review) => {
            return userRequest.post('/reviews', review)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"])
        }
    });

    // submit form
    const formSubmit = (e) => {
        e.preventDefault();

        // form value
        const desc = e.target[0].value;
        const star = e.target[1].value;

        // call mutation and pass data
        mutation.mutate({gigId, star, desc});

    }

    console.log(data);

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {
                isLoading
                    ? "loading..."
                    : error
                        ? "something went wrong!"
                        : (
                            data.map(review => (
                                <Review review={review} key={review._id} />
                            ))
                        )
            }

            <div className="add">
                <h1>Add a review</h1>
                <form onSubmit={formSubmit} className="addForm">
                    <input type="text" placeholder='write your opinion' />
                    <select name="" id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button type='submit'>Send</button>
                </form>
            </div>

            <hr />

        </div>
    )
}

export default Reviews;