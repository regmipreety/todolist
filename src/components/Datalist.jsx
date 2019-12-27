import React from "react";
import Task from "./Task";

export default function Datalist(props) {
  let datas = props.filteredtasks.map((data, index) => {
    return (
      <Task key={index} index={index} name={data.name} status={data.status} />
    );
  });

  return <div>{datas}</div>;
}
