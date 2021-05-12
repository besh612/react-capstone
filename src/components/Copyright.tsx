import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/besh612">
        배성훈
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}
