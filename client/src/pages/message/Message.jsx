import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./message.scss";
import { userRequest } from "../../utils/request";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCurrentUser } from '../../utils/getCurrentUser';

const Message = () => {
  const location = useLocation();
  const receiverId = location.state?.receiverId;

  const { id } = useParams();
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  // find receiver using receiver id
  const {
    isLoading: isLoadingReceivedUser, error: errorReceivedUser,
    data: receivedUser
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      userRequest.get(`/users/${receiverId}`).then((res) => {
        return res.data;
      }),
  });

  // fetch messages using conversation id
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      userRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  // send new msg
  const mutation = useMutation({
    mutationFn: (message) => {
      return userRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  // submit new msg
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;

    const newMessage = {
      conversationId: id,
      userId: currentUser?._id,
      desc: text
    }
    mutation.mutate(newMessage);
  }


  return (
    <div className="message">
      <div className="container">
        {
          isLoadingReceivedUser ? "loading..."
            : errorReceivedUser ? "something went wrong!"
              : (
                <span className="breadcrumbs">
                  <Link to="/messages" className="link">Messages</Link> {` > ${receivedUser?.username} >`}
                </span>
              )
        }
        {
          isLoading ? "loading..."
            : error ? "something went wrong!"
              : (
                <div className="messages">
                  {
                    data.map(msg => (
                      <div
                        className={
                          msg.userId === currentUser._id ? "item owner"
                            : "item"
                        }
                        key={msg._id}
                      >
                        <img
                          src={
                            msg.userId === currentUser._id ? (
                              currentUser?.img
                            ) : (
                              receivedUser?.img
                            )
                          }
                          alt="profile"
                        />
                        <p>
                          {msg.desc}
                        </p>
                      </div>
                    ))
                  }
                </div>
              )
        }
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;