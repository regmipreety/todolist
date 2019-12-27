import React from "react";
import { TextField } from "@material-ui/core";

export default function Searchbox(props) {
  return (
    <div className="Rightside">
      <TextField
        type="text"
        onChange={props.handleInput}
        placeholder="Search Key.."
      ></TextField>
    </div>
  );
}
