import React, { useState } from "react";
import { get, post } from "../../helper/apiHelper";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ArgonInput from "components/ArgonInput";
// eslint-disable-next-line react/prop-types
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
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card style={{ zIndex: 10, position: "relative", borderRadius: 12, padding: "2rem" }}>
              <ArgonBox component="form" role="form">
                <form>
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        float: "right",
                        marginRight: "3rem",
                        backgroundColor: "#283747",
                        color: "white",
                      }}
                      onClick={(e) => handleSubmit(e)}
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
                          <ArgonInput
                            type="text"
                            placeholder="Input prompt"
                            value={item.input}
                            onChange={(e) => handleInputChange(index, "input", e.target.value)}
                            style={{
                              padding: 8,
                              width: "40rem",
                            }}
                            size="large"
                          />

                          <ArgonInput
                            placeholder="Output query"
                            type="text"
                            value={item.output}
                            onChange={(e) => handleInputChange(index, "output", e.target.value)}
                            style={{
                              padding: 8,
                              width: "40rem",
                            }}
                            size="large"
                          />
                        </div>
                      ))}
                  </div>
                  <br />
                  <br />
                </form>
              </ArgonBox>
            </Card>
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
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
  return <>{data && <UpdateDataForm data={data} />}</>;
};

export default App;
