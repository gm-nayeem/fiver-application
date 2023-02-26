import React from "react";
import { Link } from "react-router-dom";
import "./orders.scss";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";


const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // fetch all orders
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest
        .get(
          `/orders`
        )
        .then(res => {
          return res.data;
        }),
  });


  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
            <th>Contact</th>
          </tr>
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

          {
            isLoading
              ? "loading..."
              : error
                ? "something went wrong!"
                : (data.map(order => (
                  <tr>
                    <td>
                      <img
                        className="image"
                        src={order?.img}
                        alt=""
                      />
                    </td>
                    <td>{order?.title}</td>
                    <td>{order?.price}</td>
                    <td>Maria Anders</td>
                    <td>
                      <img className="message" src="./img/message.png" alt="" />
                    </td>
                  </tr>
                ))
                )
          }

        </table>
      </div>
    </div>
  );
};

export default Orders;