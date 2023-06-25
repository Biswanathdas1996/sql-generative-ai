import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

const authorsTableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      author: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          File Name
        </ArgonTypography>
      ),
      function: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          Report name
        </ArgonTypography>
      ),
      status: (
        <ArgonBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      action: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
    },
  ],
};

export default authorsTableData;
