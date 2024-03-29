import { useQuery } from '@tanstack/react-query';
import React from 'react'
import {userRequest} from '../../utils/request';
import './review.scss';

const Review = ({ review }) => {

    // fetch review user
    const { isLoading, error, data } = useQuery({
        queryKey: [`${review.userId}`],
        queryFn: () =>
            userRequest.get(`/users/${review.userId}`).then(res => {
                return res.data;
            }),
    });

    return (
        <div className="review">
            {
                isLoading
                    ? "loading..."
                    : error
                        ? "something went wrong!"
                        : (
                            <div className="user">
                                <img
                                    className="pp"
                                    src={data.img || '/img/noavatar.jpg'}
                                    alt=""
                                />
                                <div className="info">
                                    <span>{data.username}</span>
                                    <div className="country">
                                        <span>{data.country}</span>
                                    </div>
                                </div>
                            </div>
                        )
            }
            {
                <div className="stars">
                    {
                        Array(Math.round(review.star))
                            .fill().map((item, i) => (
                                <img key={i} src="/img/star.png" alt="" />
                            ))
                    }
                    <span>
                        {review.star}
                    </span>
                </div>
            }
            <p>
                {review.desc}            
            </p>
            <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
            </div>
        </div>
    )
}

export default Review