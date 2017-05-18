import xhrReq from '../utils/xhr';

const fetchTodos = (id) => {
  return xhrReq({
    path: `/todo/${id}`,
  });
};
const addTodo = (data) => {
  return xhrReq({
    path: `/todo`,
    method: 'POST',
    body: data,
  });
};
const updateTodo = (data) => {
  return xhrReq({

  });
};
const completeTodo = () => {
  return xhrReq({

  });
};

const TodoService = {
  fetchTodos,
  addTodo,
  updateTodo,
  completeTodo,
};

export default TodoService;
