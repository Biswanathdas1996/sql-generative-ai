import React, { useState } from "react";
import { get, post } from "../helper/apiHelper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <Box>
      <form onSubmit={handleSubmit}>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{
              float: "right",
              marginRight: "3rem",
              backgroundColor: "#283747",
            }}
          >
            Update
          </Button>
        </div>
        <br />
        <div>
          {updatedData &&
            updatedData?.map((item, index) => (
              <div
                key={index}
                style={{
                  marginTop: 25,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label style={{ display: "grid" }}>
                  <TextField
                    type="text"
                    label="Input prompt"
                    value={item.input}
                    onChange={(e) =>
                      handleInputChange(index, "input", e.target.value)
                    }
                    style={{
                      padding: 8,
                      width: "40rem",
                    }}
                  />
                </label>
                <br />
                <label style={{ display: "grid" }}>
                  <TextField
                    label="Output query"
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
        </div>
        <br />
        <br />
      </form>
    </Box>
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
    <>
      <dev>
        <h1 style={{ marginLeft: "3rem" }}>Update Data</h1>
      </dev>
      <br />
      {data && <UpdateDataForm data={data} />}
    </>
  );
};

export default App;
