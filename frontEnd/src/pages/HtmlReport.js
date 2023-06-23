// import React, { useEffect, useState } from "react";

// const ReportViewer = () => {
//   const [reportHTML, setReportHTML] = useState("");

//   useEffect(() => {
//     fetchReportHTML();
//   }, []);

//   const fetchReportHTML = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/return-html-report"
//       );
//       const html = await response.text();
//       setReportHTML(html);
//     } catch (error) {
//       console.error("Error fetching report HTML:", error);
//     }
//   };

//   return <div dangerouslySetInnerHTML={{ __html: reportHTML }}></div>;
// };

// export default ReportViewer;

import React from "react";

const ReportViewer = () => {
  return (
    <div>
      <iframe
        src="http://127.0.0.1:5000/api/return-html-report"
        title="HTML Report"
        style={{ width: "100%", height: "80vh", border: "none" }}
      ></iframe>
    </div>
  );
};

export default ReportViewer;
