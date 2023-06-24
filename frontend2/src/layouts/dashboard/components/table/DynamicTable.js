import React, { useState } from "react";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import { TablePagination } from "@mui/material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

const DynamicTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  const filteredData = data.filter((row) => {
    const values = Object.values(row).join(" ").toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  // Calculate the current page's rows
  const rows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <ArgonBox mb={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Data Table</ArgonTypography>
            <ArgonInput
              placeholder="Search"
              size="large"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
              className="search-field"
            />
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
            <Table columns={Object.keys(data[0]).map((header) => ({ name: header }))} rows={rows} />
          </ArgonBox>

          <ArgonBox p={3}>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </ArgonBox>
        </Card>
      </ArgonBox>
    </div>
  );
};

DynamicTable.propTypes = {
  data: PropTypes.any.isRequired, // Update the prop type according to your needs
};

export default DynamicTable;
