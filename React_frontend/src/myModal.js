import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };
  title = React.createRef();
  content = React.createRef();

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addTodo = async () => {
    console.log('add todo')
    console.log(this.title.current.value)
    console.log(this.content.current.value)

    // await fetch('http://127.0.0.1:8000/api/create/',{
    //   method: 'POST',
    //   body:{title: this.title.current.value, description: this.content.current.value},
    //   headers: new Headers(), // 이 부분은 따로 설정하고싶은 header가 있다면 넣으세요
    // })
    var data =  { title: this.title.current.value, description: this.content.current.value }
    //axios.post('http://127.0.0.1:8000/api/create/')
    var options = {
      method: 'POST',
      accept: 'application/json',
      headers: { 'content-type': ' application/json;charset=UTF-8' },
      data: data,
      url:'http://127.0.0.1:8000/api/create/',
    }
    axios(options)
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h3>Title</h3>
            <input ref={this.title} type="text" />
            <h3>Content</h3>
            <input ref={this.content} type="text" />
            <div>

              <Button onClick={this.addTodo} >Send</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
