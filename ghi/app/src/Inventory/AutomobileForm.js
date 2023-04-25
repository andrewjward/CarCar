import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";

export default function AddAutoForm() {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [modelId, setModelId] = useState("");
  const models = useFetch("http://localhost:8100/api/models/", "models");
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  };

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleModelIdChange = (event) => {
    const value = event.target.value;
    setModelId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = modelId;

    const autoUrl = "http://localhost:8100/api/automobiles/";

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      setColor("");
      setYear("");
      setVin("");
      setModelId("");
      navigate("/inventory/automobiles");
    } else {
      throw new Error(
        "Response not ok. Make sure you are not giving an existing VIN!"
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-center">Add an Automobile</h1>
            <form onSubmit={handleSubmit} id="add-auto-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleColorChange}
                  value={color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  maxLength="50"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleYearChange}
                  value={year}
                  placeholder="Year"
                  required
                  type="number"
                  name="year"
                  min="1"
                  max="32767"
                  id="year"
                  className="form-control"
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleVinChange}
                  value={vin}
                  placeholder="VIN"
                  required
                  type="text"
                  maxLength="17"
                  name="vin"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleModelIdChange}
                  value={modelId}
                  required
                  name="model_id"
                  id="model_id"
                  className="form-select"
                >
                  <option value="">Choose a make and model</option>
                  {models.map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.manufacturer.name} {model.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="d-grid col-md-6 mx-auto">
                <button className="btn btn-outline-primary">
                  Add Automobile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
