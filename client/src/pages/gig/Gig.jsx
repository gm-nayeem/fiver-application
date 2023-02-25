import React from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

function Gig() {
  // gig id
  const { id } = useParams();

  // fetch single gig
  const { isLoading, error, data } = useQuery({
    queryKey: [`${id}`],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then(res => {
        return res.data;
      }),
  });

  // fetch gig user
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: [`${data?.userId || "user"}`],
    queryFn: () =>
      newRequest.get(`/users/${data.userId}`).then(res => {
        return res.data;
      }),
  });

  return (
    <div className="gig">
      {
        isLoading
          ? "loading..."
          : error
            ? "something went wrong!"
            : (
              <div className="container">
                <div className="left">
                  <span className="breadcrumbs">{"Liverr > Graphics & Design >"}</span>
                  <h1>{data.title}</h1>
                  {
                    isLoadingUser
                      ? "loading"
                      : errorUser
                        ? "something went wrong!"
                        : (
                          <div className="user">
                            <img
                              className="pp"
                              src={dataUser.img}
                              alt=""
                            />
                            <span>{dataUser.username}</span>
                            {
                              !isNaN(data.totalStars / data.starNumber) &&
                              <div className="stars">
                                {
                                  Array(Math.round(data.totalStars / data.starNumber))
                                    .fill().map((item, i) => (
                                      <img key={i} src="/img/star.png" alt="" />
                                    ))
                                }
                                <span>
                                  {Math.round(data.totalStars / data.starNumber)}
                                </span>
                              </div>
                            }
                          </div>
                        )
                  }
                  <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                    {
                      data.images.map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          alt=""
                        />
                      ))
                    }
                  </Slider>
                  <h2>About This Gig</h2>
                  <p>
                    {data.desc}
                  </p>
                  {
                    isLoadingUser
                      ? "loading"
                      : errorUser
                        ? "something went wrong!"
                        : (
                          <div className="seller">
                            <h2>About The Seller</h2>
                            <div className="user">
                              <img
                                src={dataUser.img}
                                alt=""
                              />
                              <div className="info">
                                <span>{dataUser.username}</span>
                                {
                                  !isNaN(data.totalStars / data.starNumber) &&
                                  <div className="stars">
                                    {
                                      Array(Math.round(data.totalStars / data.starNumber))
                                        .fill().map((item, i) => (
                                          <img key={i} src="/img/star.png" alt="" />
                                        ))
                                    }
                                    <span>
                                      {Math.round(data.totalStars / data.starNumber)}
                                    </span>
                                  </div>
                                }
                                <button>Contact Me</button>
                              </div>
                            </div>
                            <div className="box">
                              <div className="items">
                                <div className="item">
                                  <span className="title">From</span>
                                  <span className="desc">{dataUser.country}</span>
                                </div>
                                <div className="item">
                                  <span className="title">Member since</span>
                                  <span className="desc">Aug 2022</span>
                                </div>
                                <div className="item">
                                  <span className="title">Avg. response time</span>
                                  <span className="desc">4 hours</span>
                                </div>
                                <div className="item">
                                  <span className="title">Last delivery</span>
                                  <span className="desc">1 day</span>
                                </div>
                                <div className="item">
                                  <span className="title">Languages</span>
                                  <span className="desc">English</span>
                                </div>
                              </div>
                              <hr />
                              <p>
                                {dataUser.desc}
                              </p>
                            </div>
                          </div>
                        )
                  }
                  <div className="reviews">
                    <h2>Reviews</h2>
                    <div className="item">
                      <div className="user">
                        <img
                          className="pp"
                          src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <div className="info">
                          <span>Garner David</span>
                          <div className="country">
                            <img
                              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                              alt=""
                            />
                            <span>United States</span>
                          </div>
                        </div>
                      </div>
                      {
                        !isNaN(data.totalStars / data.starNumber) &&
                        <div className="stars">
                          {
                            Array(Math.round(data.totalStars / data.starNumber))
                              .fill().map((item, i) => (
                                <img key={i} src="/img/star.png" alt="" />
                              ))
                          }
                          <span>
                            {Math.round(data.totalStars / data.starNumber)}
                          </span>
                        </div>
                      }
                      <p>
                        I just want to say that art_with_ai was the first, and after
                        this, the only artist Ill be using on Fiverr. Communication was
                        amazing, each and every day he sent me images that I was free to
                        request changes to. They listened, understood, and delivered
                        above and beyond my expectations. I absolutely recommend this
                        gig, and know already that Ill be using it again very very soon
                      </p>
                      <div className="helpful">
                        <span>Helpful?</span>
                        <img src="/img/like.png" alt="" />
                        <span>Yes</span>
                        <img src="/img/dislike.png" alt="" />
                        <span>No</span>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                <div className="right">
                  <div className="price">
                    <h3>{data.shortTitle}</h3>
                    <h2>$ {data.price}</h2>
                  </div>
                  <p>
                    {data.shortDesc}
                  </p>
                  <div className="details">
                    <div className="item">
                      <img src="/img/clock.png" alt="" />
                      <span>{data.deliveryTime} Days Delivery</span>
                    </div>
                    <div className="item">
                      <img src="/img/recycle.png" alt="" />
                      <span>{data.revisionNumber} Revisions</span>
                    </div>
                  </div>
                  <div className="features">
                    {
                      data.features.map((feature, i) => (
                        <div className="item" key={i}>
                          <img src="/img/greencheck.png" alt="" />
                          <span>{feature}</span>
                        </div>
                      ))
                    }
                  </div>
                  <button>Continue</button>
                </div>
              </div>
            )
      }
    </div>
  );
}

export default Gig;