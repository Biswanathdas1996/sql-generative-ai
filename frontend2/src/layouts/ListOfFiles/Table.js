import React from "react";
import Card from "@mui/material/Card";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import Table from "examples/Tables/Table";

import ArgonBadge from "components/ArgonBadge";

// eslint-disable-next-line react/prop-types
function Tables({ data = [] }) {
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
            {val?.File}
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
          <ArgonButton
            color="info"
            size="small"
            onClick={() => (window.location.href = `#/report?file=${val?.Report}`)}
            fullWidth
          >
            View Report
          </ArgonButton>
        ),
      };
    }),
  };

  return (
    <>
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
