import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Group";

const Routes = [
  {
    path: "/",
    sidebarName: "Home",
    icon: HomeIcon,
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: SubjectIcon,
  },
  {
    path: "/login",
    sidebarName: "Login",
    icon: Person,
  },
];

export default Routes;
