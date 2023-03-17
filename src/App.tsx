import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import reactLogo from './assets/react.svg';
import todoLogo from './assets/logo.svg';

import plus from './assets/plus.svg';
import viteLogo from '/vite.svg';

import './App.scss';
import { EmptyState } from './components/EmptyState';
import { ItemTodo } from './components/ItemTodo';

export interface Todo {
  id: number;
  description: string;
  checked: boolean;
}

function App() {
  const [listTodo, setListTodo] = useState<Todo[]>([]);

  const [newTodoText, setTodoText] = useState('');

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setTodoText(event.target.value);
  }

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault();

    setListTodo([
      ...listTodo,
      {
        id: listTodo.length + 1,
        checked: false,
        description: newTodoText,
      },
    ]);

    setTodoText('');
  }

  function checkTodo(todo: Todo) {
    const newList = [...listTodo];
    const itemTodo = newList.find((item) => item.id == todo.id);

    if (itemTodo) itemTodo.checked = !itemTodo.checked;

    setListTodo(newList);
  }

  function deleteTodo(todo: Todo) {
    const newList = listTodo.filter((item) => item.id != todo.id);
    setListTodo(newList);
  }

  function getLabelTasksFinished(): string {
    let label = '0';

    const listTodoChecked = listTodo.filter((item) => item.checked);
    if (listTodoChecked.length > 0)
      label = `${listTodoChecked.length} de ${listTodo.length}`;

    return label;
  }

  let labelTasksFinished = getLabelTasksFinished();

  return (
    <div className="App">
      <div className="header">
        <img src={todoLogo} alt="" />
      </div>

      <main>
        <div className="content">
          <form onSubmit={handleCrateNewComment}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={newTodoText}
              onChange={handleNewTodoChange}
              onInvalid={handleNewTodoInvalid}
              required
            />
            <button>
              Criar
              <img src={plus} alt="" />
            </button>
          </form>

          <section>
            <div className="info-list">
              <div className="tasks-info">
                <span className="tasks-create">Tarefas Criadas</span>
                <span className="task-counter">{listTodo.length}</span>
              </div>

              <div className="tasks-info">
                <span className="tasks-finish">Concluídas</span>
                <span className="task-counter">{labelTasksFinished}</span>
              </div>
            </div>

            {listTodo.length == 0 ? (
              <EmptyState />
            ) : (
              <div className="task-list">
                {listTodo.map((item) => (
                  <ItemTodo
                    key={item.id}
                    item={item}
                    onCheckTodo={checkTodo}
                    onDeleteTodo={deleteTodo}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
