import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function ConfirmDialog(props) {
  const customButtonStyle = {
    color: "#2f2f2f",
    "&.MuiButton-text": {
      color: "#c3a07e",
    },
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={customButtonStyle} onClick={props.onClose}>
          Hủy
        </Button>
        <Button sx={customButtonStyle} onClick={props.onConfirm} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
