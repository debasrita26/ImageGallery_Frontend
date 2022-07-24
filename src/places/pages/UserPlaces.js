import React, { useEffect, useState } from "react";
import axios from "axios";

import cookie from "js-cookie";
import Card from "../../shared/components/UIElements/Card";
import './UserPlaces.css';

const UserPlaces = () => {
  const [userDataState, setUserDataState] = useState({
    userData: "",
    error: "",
  });

  const token = cookie.get("token");
  //  console.log('TOKEN',token);

  const { userData } = userDataState;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.put(
        `http://localhost:5010/api/images/list`,
        {
          token,
        }
      );
      setUserDataState({
        ...userDataState,
        userData: response.data,
        error: "",
      });
      console.log("DATA", response.data);
      return response.data;
    };
    try {
      fetchData();
    } catch (error) {
      if (error.response.status === 401) {
        return { user: "no user" };
      }
    }
  }, []);

  return (
    // <Card>
    <div className="parent">
      <div className="card">
        <div className="col-md-6 offset-md-3 pb-0">
          <h1 className="text-center font-weight-bold font-italic display-3">
            Uploaded Images
          </h1>
        </div>
        <div>
          {userData ? (
            userData.map((c, i) => {
              return (
                // <Card
                //   img={c.image.url}
                //   name={c.name}
                //   uploadDate={c.createdAt}
                //   slug={c.slug}
                // />
                <div className="pb-5 text-center">
                <img src={c.image.url}  />
                </div>
              );
            })
          ) : (
            <h2>No images</h2>
          )}
        </div>
        {/* </Card> */}
      </div>
    </div>
  );
};

export default UserPlaces;
