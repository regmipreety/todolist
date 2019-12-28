import React from "react";
import "./App.css";
import Searchbox from "./components/Searchbox";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TO DO LIST App",
      act: 0,
      index: "",
      datas: [],
      searchKey: "",
      id: 1
    };
  }

  handleInput = e => {
    e.preventDefault();
    this.setState({
      searchKey: e.target.value
    });
  };

  fSubmit = e => {
    // TO Submit Form
    e.preventDefault();
    let datas = this.state.datas;
    let id = this.state.id;
    let name = this.name.value;
    let status = this.status.value;

    if (this.state.act === 0) {
      let data = {
        name,
        status,
        id
      };
      datas.push(data);
      //push new data
    } else {
      const datas = this.state.datas.filter(
        item => item.id === this.state.index
      );

      datas[0].name = name;
      datas[0].status = status;
      datas[0].id = id;
      //set data for update
    }

    this.setState({
      datas: datas,
      act: 0,
      id:
        Math.max.apply(
          null,
          datas.map(item => item.id)
        ) + 1
      //set the value of id max+1
    });
    this.refs.myForm.reset();
  };
  taskRemove(id) {
    const items = this.state.datas.filter(item => item.id !== id);
    this.setState({ datas: items });
  } //function to remove item

  taskEdit = index => {
    const datas = this.state.datas.filter(item => item.id === index);
    this.name.value = datas[0].name;
    this.status.value = datas[0].status;

    this.setState({
      act: 1,
      index: index
    });
  };
  //function to set value in the form
  render() {
    let filteredtasks = this.state.datas.filter(data => {
      return data.name
        .toLowerCase()
        .includes(this.state.searchKey.toLowerCase());
    });
    return (
      <div className="App">
        <h2>{this.state.title}</h2>

        <div>
          <Searchbox handleInput={this.handleInput} />
        </div>
        <Grid container direction="row" justify="center" alignItems="center">
          <form ref="myForm" onSubmit={e => this.fSubmit(e)}>
            <TextField
              type="text"
              inputRef={el => (this.name = el)}
              required
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
            ></TextField>

            <TextField
              type="text"
              inputRef={el => (this.status = el)}
              id="outlined-basic"
              label="Task Description"
              variant="outlined"
              multiline={true}
              rows={2}
              rowsMax={4}
              required
            ></TextField>
            <br />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <pre>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredtasks.map((data, index) => (
                <TableRow key={index + 1}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.status}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.taskRemove(data.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.taskEdit(data.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </pre>
      </div>
    );
  }
}

export default App;
