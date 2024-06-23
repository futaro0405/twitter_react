import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert'
import { useRecoilState } from "recoil";
import { flashState } from "../../lib/state/state";

const Alert = forwardRef(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
export const AlertMessage = () => {
  const [flash, setFlash] = useRecoilState(flashState)
  const handleClose = (e, reason) => {
    if (reason === "clickaway") return
    setFlash({...flash, isOpen: false})
  }

  return (
    <Snackbar
      open={flash.isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={flash.severity}
      >
        {flash.message}
      </Alert>
    </Snackbar>
  )
}

