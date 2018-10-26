import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    this.handleToggleFiltering = this.handleToggleFiltering.bind(this);

    this.state = {
      title: ''
    };
  }

  handleToggleFiltering() {
    const { isFiltering } = this.state;
    this.setState({ isFiltering: !isFiltering });
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

  renderTodos(todos, title, isFiltering) {
    const filteredTodos = isFiltering ? todos.filter((todo) => !todo.isComplete) : todos; 

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
        <h2 classname="title">Filter Completed</h2>
        <input
          type="checkbox"
          name="filter"
          checked={isFiltering}
          onChange={this.handleToggleFiltering}
        />
        <ul className="todoList">
          {filteredTodos.map(todo => (
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
    const { title, isFiltering } = this.state;
    const { todos } = this.props;

    return (
      <div className="todoContainer">
        { this.renderTodos(todos, title, isFiltering) }
      </div>
    );
  }
}

TodoComponent.defaultProps = {
  todos: [],
  fetchTodosAsync: () => {},
  addTodoAsync: () => {},
  updateTodoAsync: () => {},
  deleteTodoAsync: () => {},
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
