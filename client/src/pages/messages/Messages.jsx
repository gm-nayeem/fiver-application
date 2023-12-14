import React from "react";
import { Link } from "react-router-dom";
import "./messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userRequest } from "../../utils/request";
import moment from "moment";
import { getCurrentUser } from "../../utils/getCurrentUser";

const Messages = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // fetch all conversations
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      userRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  // update conversations
  const mutation = useMutation({
    mutationFn: (id) => {
      return userRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // handle mark as read button
  const handleRead = (id) => {
    mutation.mutate(id);
  };


  return (
    <div className="messages">
      {
        isLoading
          ? "loading..."
          : error
            ? "something went wrong!"
            : (
              <div className="container">
                <div className="title">
                  <h1>Messages</h1>
                </div>
                <table>
                  <tr>
                    <th>{currentUser.isSeller ? "Buyer Id" : "Seller Id"}</th>
                    <th>Last Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                  {
                    data.map(con => (
                      <tr
                        className={
                          (
                            (currentUser.isSeller && !con.readBySeller)
                            ||
                            (!currentUser.isSeller && !con.readByBuyer)
                          ) && "active"
                        }
                        key={con.id}
                      >
                        <td>
                          {currentUser.isSeller ? con.buyerId : con.sellerId}
                        </td>
                        <td>
                          <Link
                            to={`/message/${con.id}`}
                            state={{ receiverId: currentUser.isSeller ? con.buyerId : con.sellerId }}
                            className="link"
                          >
                            {con?.lastMessage?.substring(0, 100)} ...
                          </Link>
                        </td>
                        <td>{moment(con.updatedAt).fromNow()}</td>
                        {
                          (
                            (currentUser.isSeller && !con.readBySeller)
                            ||
                            (!currentUser.isSeller && !con.readByBuyer)
                          )
                          && (
                            <td>
                              <button onClick={() => handleRead(con.id)}>Mark as Read</button>
                            </td>
                          )
                        }
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

export default Messages;

