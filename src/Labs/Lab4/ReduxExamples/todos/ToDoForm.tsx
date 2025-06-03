import { ListGroup, Button, FormControl } from "react-bootstrap";

export default function TodoForm({
  todo,
  setTodo,
  addTodo,
  updateTodo,
}: {
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroup.Item>
      <Button onClick={() => addTodo(todo)} id="wd-add-todo-click">
        Add
      </Button>
      <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click">
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
    </ListGroup.Item>
  );
}
