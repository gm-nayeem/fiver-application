import React from "react";
import { useNavigate } from "react-router-dom";
import "./orders.scss";
import { userRequest } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";


const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  // fetch orders
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

  // handle contact
  const handleOrder = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    const receiverId = currentUser?.isSeller ? buyerId : sellerId;

    try {
      // find conversation id
      const res = await userRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`, {
        state: {receiverId: receiverId}
      })
    } catch(err) {
      if(err.response.status ===404) {
        // create conversation if not exists
        const res = await userRequest.post(`/conversations`, {
          to: receiverId
        });
        navigate(`/message/${res.data.id}`, {
          state: {receiverId: receiverId}
        })
      }
    }
  }


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
                          <img className="message" 
                            src="./img/message.png" alt="" 
                            onClick={() => handleOrder(order)}
                          />
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
