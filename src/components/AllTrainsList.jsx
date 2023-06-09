import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllTrainsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/contacts?_sort=name")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const sortByAge = () => {
    axios
      .get("http://localhost:4000/contacts?_sort=age")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const resetHandle = () => {
    axios
      .get("http://localhost:4000/contacts?_sort=name")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete a contact?");
    if (confirm) {
      axios
        .delete("http://localhost:4000/contacts/" + id)
        .then(() => {
          alert("Contact has deleted!!!");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container p-3 m-2">
        <div className="row">
          <div className="col-12 border rounded bg-light d-flex">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h1>All rains List</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center py-2">
                  <button
                    onClick={sortByAge}
                    className="btn btn-secondary mx-2"
                  >
                    Sort by Age
                  </button>
                  <button
                    onClick={resetHandle}
                    className="btn btn-secondary mx-2"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <table className="table">
              <tbody>
                {data.map((contact) => {
                  return (
                    <tr>
                      <td>
                        <h4>
                          {contact.name}
                          <sup>
                            <small>{contact.age}</small>
                          </sup>
                        </h4>
                        <p className="lead">{contact.email}</p>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-info mx-2">View</button>
                        <Link
                          to={`update-contact/${contact.id}`}
                          className="btn btn-primary mx-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            handleDelete(contact.id);
                          }}
                          className="btn btn-danger mx-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTrainsList;
