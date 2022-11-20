import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { UseFirebaseValue } from "../Firebase";

const Dialog = () => {
  const [{ dialog }, setDialog] = UseFirebaseValue({
    open: "",
    message: "",
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDialog({
        type: "setDialog",
        open: "",
        message: "",
      });
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [dialog]);

  return (
    <React.Fragment>
      <Modal open={!!dialog?.open}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={dialog?.open || undefined}
        >
          <Typography
            id="variant-modal-title"
            component="h3"
            level="inherit"
            fontSize="2em"
            mb="0.25em"
          >
            {dialog?.message}
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default Dialog;
