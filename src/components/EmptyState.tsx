import styles from './EmptyState.module.scss';
import clipboard from '../assets/clipboard.svg';

export function EmptyState() {
  return (
    <div className={styles.taskEmptyState}>
      <img src={clipboard} alt="" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
