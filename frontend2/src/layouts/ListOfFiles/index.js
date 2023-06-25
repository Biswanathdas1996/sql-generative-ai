import React from "react";
import Card from "@mui/material/Card";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { get, post } from "../../helper/apiHelper";
import Table from "./Table";
import Grid from "@mui/material/Grid";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";

function Tables() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get("/api/get-list-of-files");
      console.log("response------->", response);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6} lg={3}>
              <DetailedStatisticsCard
                title="Total Files"
                count={data?.length}
                icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
                percentage={{ color: "success", count: "", text: "" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DetailedStatisticsCard
                title="Total Report"
                count={data?.length}
                icon={{ color: "error", component: <i className="ni ni-world" /> }}
                percentage={{ color: "success", count: "", text: "" }}
              />
            </Grid>
            {/* 
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="new clients"
              count="+3,462"
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="sales"
              count="$103,430"
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid> */}
          </Grid>

          {data && <Table data={data} />}
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
