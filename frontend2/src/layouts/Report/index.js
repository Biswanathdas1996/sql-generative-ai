import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
const ReportViewer = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card style={{ zIndex: 10, position: "relative", borderRadius: 12 }}>
              <iframe
                src="http://127.0.0.1:5000/api/return-html-report"
                title="HTML Report"
                style={{ width: "100%", height: "82vh", border: "none" }}
              ></iframe>
            </Card>
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default ReportViewer;
