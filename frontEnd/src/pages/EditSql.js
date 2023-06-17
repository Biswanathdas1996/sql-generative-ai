import React, { useState } from "react";
import { get, post } from "../helper/apiHelper";

const UpdateDataForm = ({ data }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleInputChange = (index, field, value) => {
    setUpdatedData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedData);
    try {
      const response = await post("/api/update-csv-data", updatedData);
      console.log("response======>", response);
      swal("Updated!", "Uploaded successfully!", "success");
    } catch (error) {
      console.log("error======>", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {updatedData &&
        updatedData?.map((item, index) => (
          <div key={index} style={{ marginTop: 25, display: "flex" }}>
            <label style={{ display: "grid" }}>
              Input:
              <input
                type="text"
                value={item.input}
                onChange={(e) =>
                  handleInputChange(index, "input", e.target.value)
                }
                style={{
                  padding: 8,
                  width: "30rem",
                }}
              />
            </label>
            <br />
            <label style={{ display: "grid" }}>
              Output:
              <input
                type="text"
                value={item.output}
                onChange={(e) =>
                  handleInputChange(index, "output", e.target.value)
                }
                style={{
                  padding: 8,
                  width: "40rem",
                }}
              />
            </label>
          </div>
        ))}
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

const App = () => {
  const [data, setData] = React.useState(null);
  const handleUpdateData = (updatedData) => {
    console.log(updatedData); // You can perform further actions with the updated data
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get("/api/get-past-qa");

      const reversedData = [...response].reverse();
      setData(reversedData);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("data------->", data);
  return (
    <center>
      <h1>Update Data</h1>
      {data && <UpdateDataForm data={data} onUpdateData={handleUpdateData} />}
    </center>
  );
};

export default App;
