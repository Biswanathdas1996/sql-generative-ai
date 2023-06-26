import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../../config";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line react/prop-types
export default function BasicModal({ open, handleClose, checkedFile }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Embed report
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontSize: 12 }}>
            By embedding report on your site, you are agreeing to all Terms of Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{
                background: "#80808066",
                padding: 16,
                borderRadius: 12,
              }}
            >
              <pre style={{ fontSize: 14, overflow: "auto" }}>
                <code style={{ wordWrap: "break-word" }}>
                  {`<iframe
    src={${BASE_URL}/api/return-html-report?file=${checkedFile}}
    title="HTML Report for ${checkedFile}"
    style={{ width: "100%", height: "100vh", border: "none" }}>
</iframe>`}
                </code>
              </pre>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
