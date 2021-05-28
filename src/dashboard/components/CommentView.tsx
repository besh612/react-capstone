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
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  comment: string;
}

function CommentView({
  comment,
  handleInput,
}: CommentProps): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <Title>상태</Title>
      <TextField
        name="comment"
        variant="outlined"
        className={classes.commentField}
        value={comment}
        multiline
        onChange={handleInput}
        rows={6}
      />
    </>
  );
}

export default React.memo(CommentView);
