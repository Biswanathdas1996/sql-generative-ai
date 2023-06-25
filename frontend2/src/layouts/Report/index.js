import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { BASE_URL } from "../../config";
import { useLocation } from "react-router-dom";
import SelectFile from "../../components/SelectFile/index";

const ReportViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fileParam = searchParams.get("file");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!fileParam ? (
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Card style={{ zIndex: 10, position: "relative", borderRadius: 12 }}>
                <SelectFile />
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Card style={{ zIndex: 10, position: "relative", borderRadius: 12 }}>
                <iframe
                  src={`${BASE_URL}/api/return-html-report?file=${fileParam}`}
                  title="HTML Report"
                  style={{ width: "100%", height: "1400vh", border: "none" }}
                ></iframe>
              </Card>
            </Grid>
          </Grid>
        )}
      </ArgonBox>
    </DashboardLayout>
  );
};

export default ReportViewer;
