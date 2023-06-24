import React from "react";
import { get, post } from "../../helper/apiHelper";
import swal from "sweetalert";

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const handleFileUpload = async () => {
    const fileInput = document.getElementById("fileInput");
    const formdata = new FormData();
    formdata.append("file", fileInput.files[0]);
    try {
      const response = await post("/api/upload-csv", formdata);
      console.log("response======>", response);

      swal("Uploaded!", "Uploaded successfully!", "success").then((value) => {
        window.location.href = "/dashboard";
      });
    } catch (error) {
      console.log("error======>", error);
    }
  };

  return (
    <IllustrationLayout
      title="Upload CSV"
      description="Upload CSV file to perform analytics"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        {/* <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" />
        </ArgonBox> */}
        {/* <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" />
        </ArgonBox> */}
        <ArgonBox mb={2}>
          <ArgonInput type="file" id="fileInput" placeholder="Password" size="large" />
        </ArgonBox>

        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" onClick={handleFileUpload} fullWidth>
            Upload
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
