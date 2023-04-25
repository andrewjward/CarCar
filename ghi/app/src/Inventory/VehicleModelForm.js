import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

export default function VehicleModelForm() {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const manufacturers = useFetch(
    "http://localhost:8100/api/manufacturers/",
    "manufacturers"
  );
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePictureUrlChange = (event) => {
    setPictureUrl(event.target.value);
  };

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      picture_url: pictureUrl,
      manufacturer_id: manufacturer,
    };

    const url = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newVehicleModel = await response.json();
      setName("");
      setPictureUrl("");
      setManufacturer("");
      navigate("/inventory/models");
    } else {
      throw new Error("Response not ok");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4 rounded-3">
            <h1 className="text-center mb-3">Add a Vehicle Model</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  maxLength="100"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={pictureUrl}
                  onChange={handlePictureUrlChange}
                  placeholder="Picture URL"
                  required
                  type="url"
                  name="picture_url"
                  maxLength="200"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={manufacturer}
                  onChange={handleManufacturerChange}
                  required
                  name="manufacturer"
                  id="manufacturer"
                  className="form-select"
                >
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map((manufacturer) => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="d-grid col-md-6 mx-auto">
                <button className="btn btn-outline-primary">Add Model</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
