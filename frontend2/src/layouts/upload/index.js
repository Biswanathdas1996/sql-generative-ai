import React from "react";
import { get, post } from "../../helper/apiHelper";
import swal from "sweetalert";

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import ArgonAlert from "components/ArgonAlert";
import UploadIMG from "../../assets/images/upload.gif";
// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Image

const bgImage = UploadIMG;

function Illustration() {
  const [loading, setLoading] = React.useState(false);

  const [uploadCsv, setUploadCsv] = React.useState(false);
  const [generateReport, setGenerateReport] = React.useState(false);

  const handleFileUpload = async () => {
    setLoading(true);
    const fileInput = document.getElementById("fileInput");
    const formdata = new FormData();
    formdata.append("file", fileInput.files[0]);
    try {
      const response = await post("/api/upload-csv", formdata);
      console.log("response======>", response);
      if (response?.satus === "success") {
        setUploadCsv(true);
        generateNewReport(response?.file);
      }
    } catch (error) {
      console.log("error======>", error);
      setLoading(false);
    }
  };

  const generateNewReport = async (file_name) => {
    setGenerateReport(true);
    try {
      const response = await post("/api/generate-html-report", { file_name: file_name });
      console.log("response======>", response);

      if (response?.satus === "success") {
        setLoading(false);
        swal("Generated!", "Report generated successfully!", "success").then((value) => {
          window.location.href = "#/dashboard";
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("error======>", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={2} lg={2}>
              {" "}
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Card
                style={{ zIndex: 10, position: "relative", borderRadius: 12, padding: "2.5rem" }}
              >
                <div>
                  <ArgonTypography variant="text" color="text" fontWeight="regular">
                    Upload <b>CSV</b>
                  </ArgonTypography>
                  <br />
                  <ArgonTypography
                    variant="link"
                    color="text"
                    fontWeight="regular"
                    style={{ fontSize: 12 }}
                  >
                    Upload CSV file to perform analytics
                  </ArgonTypography>
                  <br />

                  {!loading ? (
                    <ArgonBox component="form" role="form">
                      <ArgonBox mb={2}>
                        <ArgonInput
                          type="file"
                          id="fileInput"
                          placeholder="Password"
                          size="large"
                        />
                      </ArgonBox>

                      <ArgonBox mt={4} mb={1}>
                        <ArgonButton color="info" size="large" onClick={handleFileUpload} fullWidth>
                          Upload
                        </ArgonButton>
                        <center>
                          <img src={UploadIMG} alt="test" style={{ height: 350 }} />
                        </center>
                      </ArgonBox>
                    </ArgonBox>
                  ) : (
                    <center>
                      <div className="loader"></div>
                      <b style={{ fontSize: 14 }}>Please do not hit back/re-fresh the page</b>
                      {uploadCsv && (
                        <ArgonAlert color="success" style={{ marginTop: "1.5rem" }}>
                          {" "}
                          <Icon fontSize="medium">check_circle</Icon>&nbsp;File uploaded!
                        </ArgonAlert>
                      )}
                      {generateReport && (
                        <ArgonAlert color="warning" style={{ marginTop: "1.5rem" }}>
                          {" "}
                          <Icon fontSize="medium">account_tree_sharp_icon</Icon>&nbsp;Grnerating
                          report ...
                        </ArgonAlert>
                      )}
                      {/* <ArgonAlert color="success" style={{ marginTop: "1.5rem" }}>
              {" "}
              <Icon fontSize="medium">check_circle</Icon>&nbsp;Report generated!
            </ArgonAlert> */}
                    </center>
                  )}
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
              {" "}
            </Grid>
          </Grid>
        </ArgonBox>
      </DashboardLayout>
    </>
  );
}

export default Illustration;
