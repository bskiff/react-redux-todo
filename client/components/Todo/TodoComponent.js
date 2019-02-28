import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TodoComponent.scss';

import {
  TodoItemComponent,
} from '../../components';

import {
  fetchTodosAsync,
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
} from '../../actions/todo';

export class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
    this.handleToggleCompletedVisible = this.handleToggleCompletedVisible.bind(this);

    this.state = {
      title: '',
      completedVisible: false
    };
  }

  componentDidMount() {
    this.props.fetchTodosAsync();
  }

  handleTodoChange(event) {
    const { value } = event.target;
    this.setState({ title: value });
  }

  handleAddTodo(event) {
    if (event.charCode === 13) {
      const { title } = this.state;

      const payload = {
        title,
        isComplete: false,
      };

      this.props.addTodoAsync(payload);
      this.setState({ title: '' });
    }
  }

  handleToggleCompletedVisible() {
    this.setState({ completedVisible: !this.state.completedVisible });
  }

  shouldShowTodo(showCompleted, isCompleted) {
    return showCompleted || !isCompleted;
  }

  renderTodos(todos, title) {
    return (
      <div>
        <h1 className="title">React Redux Todo</h1>
        <input
          type="text"
          className="addTodo"
          onChange={this.handleTodoChange}
          onKeyPress={this.handleAddTodo}
          value={title}
          placeholder="Create A Todo"
        />
        <h3 className="visibleToggleTitle">Show completed todos:</h3>
        <input
          type="checkbox"
          className="toggleCompleteVisible"
          onChange={this.handleToggleCompletedVisible}
          value={this.state.completedVisible}
        />
        <ul className="todoList">
          {todos
            .filter(todo => {
              console.log('this.state.completedVisible', this.state.completedVisible);
              console.log('todo.isComplete', todo.isComplete);
              console.log('this.state.completedVisible || todo.isComplete', this.state.completedVisible || todo.isComplete);
              return this.shouldShowTodo(this.state.completedVisible, todo.isComplete);
            })
            .map(todo => (
              <TodoItemComponent
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isComplete={todo.isComplete}
                created={todo.createdAt}
                update={this.props.updateTodoAsync}
                delete={this.props.deleteTodoAsync}
              />
            ))
          }
        </ul>
      </div>
    );
  }

  render() {
    const { title } = this.state;
    const { todos } = this.props;

    return (
      <div className="todoContainer">
        {this.renderTodos(todos, title)}
      </div>
    );
  }
}

TodoComponent.defaultProps = {
  todos: [],
  fetchTodosAsync: () => {
  },
  addTodoAsync: () => {
  },
  updateTodoAsync: () => {
  },
  deleteTodoAsync: () => {
  },
};

TodoComponent.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodosAsync: PropTypes.func.isRequired,
  addTodoAsync: PropTypes.func.isRequired,
  updateTodoAsync: PropTypes.func.isRequired,
  deleteTodoAsync: PropTypes.func.isRequired,
};

export const mapStateToProps = state => (
  {
    todos: state.todo.todos,
  }
);

export default connect(mapStateToProps, {
  fetchTodosAsync,
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
})(TodoComponent);
