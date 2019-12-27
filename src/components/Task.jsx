import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export default function Task(props) {
  return (
    <TableBody>
      <TableRow key={props.index + 1}>
        <TableCell className="Setwidth" component="th" scope="row">
          {props.index + 1}
        </TableCell>
        <TableCell className="Setwidth">{props.name}</TableCell>
        <TableCell className="Setwidth">{props.status}</TableCell>
        <TableCell className="Setwidth">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.taskRemove(props.index)}
          >
            Remove
          </Button>
        </TableCell>
        <TableCell className="Setwidth">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.taskEdit(props.index)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
