import React from "react";
import "./App.css";
import Datalist from "./components/Datalist";
import Searchbox from "./components/Searchbox";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TO DO LIST",
      act: 0,
      index: "",
      datas: [],
      searchKey: "",
      opened: false
    };
  }

  handleInput = e => {
    this.setState({
      searchKey: e.target.value
    });
  };

  // componentDidMount() {
  //   this.name.focus();
  // }

  fSubmit = e => {
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.name.value;
    let status = this.status.value;

    if (this.state.act === 0) {
      let data = {
        name,
        status
      };
      datas.push(data); //push new data
    } else {
      let index = this.state.index; //set index of data to update
      datas[index].name = name;
      datas[index].status = status;
    }

    this.setState({
      datas: datas,
      act: 0
    });
    this.refs.myForm.reset();
    this.setState({
      opened: false
    });
    //this.refs.name.focus();
  };
  taskRemove = index => {
    let datas = this.state.datas;
    datas.splice(index, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();

    // this.refs.name.focus();
  };

  taskEdit = index => {
    let datas = this.state.datas[index];
    this.name.value = datas.name;
    this.status.value = datas.status;

    this.setState({
      act: 1,
      index: index,
      opened: true
    });
  };

  render() {
    let filteredtasks = this.state.datas.filter(data => {
      return data.name
        .toLowerCase()
        .includes(this.state.searchKey.toLowerCase());
    });

    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <Searchbox handleInput={this.handleInput} />
        {this.state.opened ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <form
              className={useStyles.form}
              ref="myForm"
              onSubmit={e => this.fSubmit(e)}
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Task Name"
                  variant="outlined"
                  className="Aligncenter"
                  type="text"
                  inputRef={el => (this.name = el)}
                  required
                  placeholder="Task Name"
                ></TextField>
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Task Description"
                  variant="outlined"
                  className="Aligncenter"
                  type="text"
                  required
                  inputRef={el => (this.status = el)}
                  multiline={true}
                  rows={2}
                  rowsMax={4}
                ></TextField>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Task
                </Button>
              </div>
            </form>
          </Grid>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              this.setState({ opened: true });
            }}
          >
            Create Task
          </Button>
        )}
        <Container fixed>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="Setwidth">Id</TableCell>
                <TableCell className="Setwidth">Task</TableCell>
                <TableCell className="Setwidth">Status</TableCell>
                <TableCell className="Setwidth">Delete</TableCell>
                <TableCell className="Setwidth">Edit</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Datalist filteredtasks={filteredtasks} />
        </Container>
      </div>
    );
  }
}

export default App;
