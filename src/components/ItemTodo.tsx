import styles from './ItemTodo.module.scss';
import checkIcon from './../assets/check-icon.svg';
import trashIcon from './../assets/trash-icon.svg';
import { Todo } from '../App';

export interface ItemTodoProps {
  item: Todo;
  onCheckTodo?: (todo: Todo) => void;
  onDeleteTodo?: (todo: Todo) => void;
}

// styles.dataChecked

export function ItemTodo({ item, onCheckTodo, onDeleteTodo }: ItemTodoProps) {
  let classNameMain = [
    styles.itemTodo,
    item.checked ? styles.dataChecked : null,
  ].join(' ');

  function handleCheckTodo() {
    if (onCheckTodo) onCheckTodo(item);
  }

  function handleDeleteTodo(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (onDeleteTodo) onDeleteTodo(item);
  }

  return (
    <div className={classNameMain} onClick={handleCheckTodo}>
      <div className={styles.information}>
        <div className={styles.check}>
          <div className={styles.checkMark}>
            <img src={checkIcon} alt="Icone de check" />
          </div>
        </div>
        <div className={styles.detail}>{item.description}</div>
      </div>
      <button onClick={handleDeleteTodo}>
        <img src={trashIcon} alt="Icone de Lixo" />
      </button>
    </div>
  );
}
