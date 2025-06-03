import { ListGroup, Button } from "react-bootstrap";

export default function TodoItem({
  todo,
  deleteTodo,
  setTodo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroup.Item key={todo.id}>
      <Button onClick={() => deleteTodo(todo.id)} id="wd-delete-todo-click">
        Delete
      </Button>
      <Button onClick={() => setTodo(todo)} id="wd-set-todo-click">
        Edit
      </Button>
      {todo.title}
    </ListGroup.Item>
  );
}
