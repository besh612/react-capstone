import React from "react";
import Typography from "@material-ui/core/Typography";

interface TitleProps {
  children: string;
}

export default function Title({ children }: TitleProps): React.ReactElement {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}
