import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import server from "../../config/credentials.json";

interface ModalProps {
  handleClose: () => void;
  open: boolean;
  id: string;
}

function Modal({ handleClose, open, id }: ModalProps): React.ReactElement {
  const [state, setState] = useState({
    strName: "",
    comment: "",
    height: 0,
    locationX: 0,
    locationY: 0,
    locationDetail: "",
  });
  const {
    strName,
    comment,
    height,
    locationX,
    locationY,
    locationDetail,
  } = state;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .post(`${server.url}structure`, {
        name: state.strName,
        comment: state.comment,
        height: state.height,
        locationX: state.locationX,
        locationY: state.locationY,
        locationDetail: state.locationDetail,
        projectId: id,
      })
      .then((response) => {
        if (response.status === 200) handleClose();
        else throw new Error("structure 저장 실패");
      })
      .catch((error) => {
        throw new Error(`structure 저장 실패: ${error}`);
      });
  };

  const onReast = () => {
    setState({
      strName: "",
      comment: "",
      height: 0,
      locationX: 0,
      locationY: 0,
      locationDetail: "",
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">{`구조물 추가 ${id}`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} direction="row">
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <TextField
                name="strName"
                label="이름"
                value={strName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="locationDetail"
                fullWidth
                label="주소"
                value={locationDetail}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <TextField
                name="height"
                label="높이(m)"
                value={height}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="locationX"
                label="x좌표"
                value={locationX}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="locationY"
                label="y좌표"
                value={locationY}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <TextField
                name="comment"
                fullWidth
                label="설명"
                value={comment}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onReast()} color="primary">
          닫기
        </Button>
        <Button color="secondary" onClick={() => handleSave()}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
