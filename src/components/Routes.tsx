import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Group";

const Routes = [
  {
    id: 0,
    path: "/",
    sidebarName: "Home",
    icon: HomeIcon,
  },
  {
    id: 1,
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: SubjectIcon,
  },
  {
    id: 2,
    path: "/login",
    sidebarName: "Login",
    icon: Person,
  },
];

export default Routes;
