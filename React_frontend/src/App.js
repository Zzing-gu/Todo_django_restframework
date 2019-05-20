import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import BottomBar from './bottomBar'
import TopBar from './topBar'
import MyModal from './myModal'

const styles = theme => ({
  root: {
    // display:'flex',
    flexGrow: 1,
    // justifyContent: 'center',
  },
  paper: {
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300,
    // height: 150
  },

});

class App extends Component {
  state = {
    todos: []
  };

  modal = React.createRef();

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  openModal = () => {
    console.log('modla')
    console.log(this.modal.current)
    this.modal.current.handleOpen();
  }

  render() {
    return (

      <React.Fragment>
        <TopBar modal={this.openModal} />
        <Grid className={this.props.classes.root} container direction='row' alignItems="center"
          justify="center"
          style={{height:'100vh'}}
          >

          {this.state.todos.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={3} justify="center">
              <Grid container justify='center'>

              <Paper className={this.props.classes.paper}>

                <div >
                  <h1 >{item.title}</h1>
                  <span >{item.description}</span>
                </div>
              </Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <BottomBar modal={this.openModal} />
        <MyModal innerRef={this.modal}/>
      </React.Fragment>

    );
  }
}

export default withStyles(styles)(App);