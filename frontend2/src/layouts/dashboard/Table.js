import React from "react";
import DynamicTable from "./components/table/DynamicTable";

import PropTypes from "prop-types";
const CsvData = ({ data }) => {
  return (
    <center>
      <div style={{ width: "100%" }}>{data ? <DynamicTable data={data} /> : "Please wait..."}</div>
    </center>
  );
};

CsvData.propTypes = {
  data: PropTypes.any.isRequired, // Update the prop type according to your needs
};

export default CsvData;
