import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./message.scss";
import { userRequest } from "../../utils/request";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Message = () => {
  const location = useLocation();
  const receiverId = location.state?.receiverId;
  
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  // find receiver using converstaion id
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      userRequest.get(`/users/${receiverId}`).then((res) => {
        return res.data;
      }),
  });

  // fetch messages using converstaion id
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
          isLoadingUser ? "loading..."
            : errorUser ? "something went wrong!"
              : (
                <span className="breadcrumbs">
                  <Link to="/messages" className="link">Messages</Link> {` > ${dataUser?.username} >`}
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
                          src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
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