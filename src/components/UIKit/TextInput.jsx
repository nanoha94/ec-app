import React from "react";
import { TextField } from "@material-ui/core";

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline ?? false}
      minRows={props.rows ?? 0}
      required={props.required ?? false}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
