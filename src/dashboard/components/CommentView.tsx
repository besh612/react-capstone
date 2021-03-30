import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function CommentView() {
  const classes = useStyles();
  return (
    <>
      <Title>상태</Title>
      <Typography>{message}</Typography>
    </>
  );
}

export default CommentView;
