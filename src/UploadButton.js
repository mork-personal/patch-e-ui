import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UploadButton = (props) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log("got a file :)");
    console.log(fileUploaded);
    console.log(fileUploaded.name);
    if (
      !fileUploaded.name.endsWith(".syx") &&
      !fileUploaded.name.endsWith(".106")
    ) {
      alert("pls upload a .syx (SysEx) or .106 (library) file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      console.log(buf2hex(e.target.result));
    };
    reader.readAsArrayBuffer(fileUploaded);
  };

  function buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Smash this mf (⌐■_■)
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        accept=".syx,.106"
      />
    </>
  );
};

export default UploadButton;
