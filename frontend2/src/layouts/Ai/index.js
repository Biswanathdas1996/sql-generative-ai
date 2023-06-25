import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { BASE_URL } from "../../config";
import { useLocation } from "react-router-dom";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { get, post } from "../../helper/apiHelper";
import SelectFile from "../../components/SelectFile/index";
import ArgonTypography from "components/ArgonTypography";
import Icon from "@mui/material/Icon";
import ArgonAlert from "components/ArgonAlert";

const ReportViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fileParam = searchParams.get("file");

  const [loading, setLoading] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [searchData, setSearchData] = useState(null);
  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchData(null);
    setLoading(true);
    try {
      const response = await post("/api/generate", {
        nlp_text: searchTerm,
        file_name: fileParam,
      });
      setSearchData(response);
      if (response && response !== []) {
        console.log("response=========>", response);
      }
    } catch (error) {
      console.log(error);
      alert("Somthing went wrong, please check Last search...");
    }
    setLoading(false);
    // Perform search logic here
    console.log("Search term:", searchTerm);
    // Reset the search term
    // setSearchTerm("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          {!fileParam ? (
            <Grid item xs={12} md={12} lg={12}>
              <Card style={{ zIndex: 10, position: "relative", borderRadius: 12, padding: "3rem" }}>
                <ArgonBox component="form" role="form">
                  <ArgonBox mb={2}>
                    <SelectFile open="File" />
                  </ArgonBox>
                </ArgonBox>
              </Card>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={12} lg={12}>
                <Card
                  style={{ zIndex: 10, position: "relative", borderRadius: 12, padding: "3rem" }}
                >
                  <ArgonTypography variant="text" color="text" fontWeight="regular">
                    Dive deep into <b>{fileParam}</b>
                  </ArgonTypography>
                  <br />
                  <ArgonBox component="form" role="form">
                    <ArgonBox mb={2}>
                      <ArgonInput
                        type="text"
                        id="fileInput"
                        placeholder="Question"
                        size="large"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                    </ArgonBox>

                    <ArgonBox mt={4} mb={1}>
                      <ArgonButton color="info" size="large" onClick={handleSearch}>
                        Ask a Question
                      </ArgonButton>
                    </ArgonBox>
                  </ArgonBox>
                </Card>
              </Grid>

              {!loading ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <Card
                      style={{
                        zIndex: 10,
                        position: "relative",
                        borderRadius: 12,
                        padding: "3rem",
                      }}
                    >
                      {searchData && (
                        <iframe
                          src={`${BASE_URL}/api/return-temp-html-report`}
                          title="HTML Report"
                          style={{ width: "100%", height: "710vh", border: "none" }}
                        ></iframe>
                      )}
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Card
                      style={{
                        zIndex: 10,
                        position: "relative",
                        borderRadius: 12,
                        padding: "3rem",
                      }}
                    >
                      <pre>
                        <code>{searchData && JSON.stringify(searchData, null, 2)}</code>
                      </pre>
                    </Card>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={12} lg={12}>
                  <Card
                    style={{
                      zIndex: 10,
                      position: "relative",
                      borderRadius: 12,
                      padding: "3rem",
                    }}
                  >
                    <center>
                      <div className="loader" />
                      <ArgonAlert
                        color="warning"
                        size="small"
                        style={{ marginTop: "2rem", width: 400 }}
                      >
                        {" "}
                        <Icon fontSize="medium">account_tree_sharp_icon</Icon>&nbsp;please wait,
                        Grnerating report ...
                      </ArgonAlert>
                    </center>
                  </Card>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default ReportViewer;
