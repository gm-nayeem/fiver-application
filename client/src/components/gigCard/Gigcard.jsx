import React from "react";
import "./gigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userRequest } from "../../utils/request";

const GigCard = ({ gig }) => {

  // fetch gig user
  const { isLoading, error, data } = useQuery({
    queryKey: [`${gig?.userId}`],
    queryFn: () =>
      userRequest.get(`/users/${gig?.userId}`).then(res => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${gig?._id}`} state={{ userId: gig.userId }} className="link">
      <div className="gigCard">
        <img src={gig.cover} alt="" />
        <div className="info">
          {
            isLoading
              ? "loading..."
              : error
                ? "something went wrong!"
                : (
                  <div className="user">
                    <img src={data.img || "/img/noavatar.jpg"} alt="" />
                    <span>{data.username}</span>
                  </div>
                )
          }
          <p>{gig.desc}</p>
          {
            !isNaN(gig.totalStars / gig.starNumber) &&
            <div className="star">
              {
                Array(Math.round(gig.totalStars / gig.starNumber))
                  .fill().map((item, i) => (
                    <img key={i} src="/img/star.png" alt="" />
                  ))
              }
              <span>
                {Math.round(gig.totalStars / gig.starNumber)}
              </span>
            </div>
          }
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {gig.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;