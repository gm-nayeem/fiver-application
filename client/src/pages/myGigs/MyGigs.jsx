import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../../utils/request";
import "./myGigs.scss";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  // get users gigs
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      publicRequest.get(`/gigs?userId=${currentUser?._id}`).then((res) => {
        return res.data;
      }),
  });

  // delete gig
  const mutation = useMutation({
    mutationFn: (id) => {
      return userRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {
        isLoading ? "loading..."
          : error ? "something went wrong!"
            : (
              <div className="container">
                <div className="title">
                  <h1>Gigs</h1>
                  {currentUser.isSeller && (
                    <Link to="/add">
                      <button>Add New Gig</button>
                    </Link>
                  )}
                </div>
                <table>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Action</th>
                  </tr>
                  {
                    data.map(gig => (
                      <tr key={gig._id}>
                        <td>
                          <img
                            className="image"
                            src={gig.cover}
                            alt=""
                          />
                        </td>
                        <td>{gig.title}</td>
                        <td>{gig.price}</td>
                        <td>{gig.totalStars}</td>
                        <td>
                          <img className="delete" src="./img/delete.png" alt=""
                            onClick={() => handleDelete(gig._id)}
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
}

export default MyGigs;