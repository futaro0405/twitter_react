import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
export const AlertMessage = (props) => {
  const { open, setOpen, severity, message } = props;
  const handleClose = (e, reason) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

