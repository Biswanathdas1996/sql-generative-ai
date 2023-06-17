import React from "react";
import DynamicTable from "../components/DynamicTable";
import { get, post } from "../helper/apiHelper";

const CsvData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get("/api/csv-data");
      console.log("response------->", response);
      setData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <center>
      <div style={{ width: "90%" }}>
        <h1>CSV Data</h1>
        {data ? <DynamicTable data={data} /> : "Please wait..."}
      </div>
    </center>
  );
};

export default CsvData;
