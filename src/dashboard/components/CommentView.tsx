import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Title from "./Title";

const useStyles = makeStyles({
  commentField: {
    height: "100%",
    border: 0,
  },
});

interface CommentProps {
  comment: {
    state: string;
  };
}

function CommentView({ comment }: CommentProps): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <Title>상태</Title>
      <TextField
        variant="outlined"
        className={classes.commentField}
        defaultValue={comment}
        multiline
        rows={8}
      />
    </>
  );
}

export default CommentView;
