import React from "react";
import { Link } from "react-router-dom";
import "./orders.scss";
import { userRequest } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";


const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // fetch all orders
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      userRequest
        .get(
          `/orders`
        )
        .then(res => {
          return res.data;
        }),
  });


  return (
    <div className="orders">
      {
        isLoading
          ? "loading..."
          : error
            ? "something went wrong!"
            : (
              <div className="container">
                <div className="title">
                  <h1>Orders</h1>
                </div>
                <table>
                  <tr>
                    <th style={{width: "160px"}}>Image</th>
                    <th style={{width: "200px"}}>Title</th>
                    <th style={{width: "120px"}}>Price</th>
                    <th style={{width: "300px"}}>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                    <th style={{width: "120px"}}>Contact</th>
                  </tr>
                  {
                    data.map(order => (
                      <tr key={order._id}>
                        <td>
                          <img
                            className="image"
                            src={order.img}
                            alt=""
                          />
                        </td>
                        <td>{order?.title}</td>
                        <td>{order?.price}</td>
                        <td>
                          {
                            currentUser.isSeller 
                            ?  order.buyerId
                            : order.sellerId
                          }
                        </td>
                        <td>
                          <img className="message" src="./img/message.png" alt="" />
                        </td>
                      </tr>
                    ))
                  }
                </table>
              </div>
            )
      }
    </div>
  );
};

export default Orders;



{/* <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>title</td>
            <td>50</td>
            <td>Maria Anders</td>
            <td>
              <img className="message" src="./img/message.png" alt="" />
            </td>
          </tr> */}