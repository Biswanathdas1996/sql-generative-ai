import React from "react";
import DynamicTable from "../components/DynamicTable";
import Button from "@mui/material/Button";
import { get, post } from "../helper/apiHelper";

const CsvData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get("/api/get-past-qa");
      console.log("response------->", response);
      const reversedData = [...response].reverse();
      setData(reversedData);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <center>
      <div style={{ width: "90%" }}>
        <Button
          onClick={() => (window.location.href = "/#/edit-sql")}
          style={{ float: "right", backgroundColor: "#283747" }}
          variant="contained"
        >
          Edit
        </Button>
        <h1 style={{ float: "left" }}>Previous search Data</h1>
        {data && data?.length > 0 ? (
          <DynamicTable data={data} />
        ) : data?.length === 0 ? (
          "No data found"
        ) : (
          "Please wait..."
        )}
      </div>
    </center>
  );
};

export default CsvData;
