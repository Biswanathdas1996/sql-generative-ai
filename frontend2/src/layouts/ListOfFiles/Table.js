import React from "react";
import Card from "@mui/material/Card";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import Table from "examples/Tables/Table";
import { BASE_URL } from "../../config";
import ArgonBadge from "components/ArgonBadge";
import EmbadedModal from "./EmbadedModal";

// eslint-disable-next-line react/prop-types
function Tables({ data = [] }) {
  const [open, setOpen] = React.useState(false);
  const [checkedFile, setCheckedFile] = React.useState(null);

  const handleOpen = (file) => {
    setOpen(true);
    setCheckedFile(file);
  };
  const handleClose = () => {
    setOpen(false);
    setCheckedFile(null);
  };

  const authorsTableData = {
    columns: [
      { name: "Serial", align: "left" },
      { name: "File", align: "left" },
      //   { name: "Report", align: "left" },
      { name: "status", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: data?.map((val, i) => {
      return {
        Serial: (
          <center>
            <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
              {i + 1}
            </ArgonTypography>
          </center>
        ),
        File: (
          <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
            <a
              href={`${BASE_URL}/api/return-csv-file?file=${val?.File}`}
              download
              style={{ color: "#ad1b02" }}
            >
              {val?.File}
            </a>
          </ArgonTypography>
        ),
        // Report: (
        //   <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
        //     {val?.Report}
        //   </ArgonTypography>
        // ),
        status: (
          <ArgonBadge
            variant="gradient"
            badgeContent="generated"
            color="success"
            size="xs"
            container
          />
        ),
        action: (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <ArgonButton
              color="info"
              size="small"
              style={{ margin: 10 }}
              onClick={() => (window.location.href = `#/report?file=${val?.Report}`)}
            >
              View Report
            </ArgonButton>
            <br />
            <ArgonButton
              color="secondary"
              size="small"
              style={{ margin: 10 }}
              onClick={() => handleOpen(val?.Report)}
            >
              Embed Report
            </ArgonButton>
          </div>
        ),
      };
    }),
  };

  return (
    <>
      <EmbadedModal
        open={open}
        handleClose={handleClose}
        fileParam={"redd"}
        checkedFile={checkedFile}
      />
      <Card>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <ArgonTypography variant="h6">List of files</ArgonTypography>
        </ArgonBox>
        <ArgonBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          {data && <Table columns={authorsTableData.columns} rows={authorsTableData.rows} />}
        </ArgonBox>
      </Card>
    </>
  );
}

export default Tables;
