// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import ListOfFiles from "layouts/ListOfFiles";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import Upload from "layouts/upload";
import Profile from "layouts/profile";
import Report from "layouts/Report";
import Ai from "layouts/Ai";
import SQL from "layouts/SQL";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

const routes = [
  // {
  //   type: "route",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
  //   component: <Dashboard />,
  // },
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <ListOfFiles />,
  },
  {
    type: "route",
    name: "Report",
    key: "report",
    route: "/report",
    icon: (
      <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Report />,
  },
  {
    type: "route",
    name: "Upload new CSV",
    key: "upload",
    route: "/",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-collection" />,
    component: <Upload />,
  },
  // {
  //   type: "route",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
  //   ),
  //   component: <Tables />,
  // },

  // {
  //   type: "route",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-app" />,
  //   component: <VirtualReality />,
  // },

  { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "route",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
  //   component: <Profile />,
  // },

  {
    type: "route",
    name: "Ai (Beta)",
    key: "ai",
    route: "/ai",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-app" />,
    component: <Ai />,
  },
  {
    type: "route",
    name: "Last Search (Beta)",
    key: "sql",
    route: "/sql",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-app" />,
    component: <SQL />,
  },
  // {
  //   type: "route",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
  //   ),
  //   component: <SignIn />,
  // },
  // {
  //   type: "route",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
  //   component: <SignUp />,
  // },
];

export default routes;
