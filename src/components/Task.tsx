import { CheckCircle, Circle, Trash } from 'phosphor-react';
import { Todo } from '../models/Todo';
import styles from './Task.module.css';

interface TaskProps {
  task: Todo;
  onToggleTask?: (taskId: string) => void;
  onRemoveTask?: (taskId: string) => void;
}

export function Task({ task, onToggleTask, onRemoveTask }: TaskProps) {
  return (
    <div className={`${styles.task} ${task.isDone ? styles.taskDone : ''}`}>
      <Checkbox checked={task.isDone} onClick={() => onToggleTask!(task.id)} />
      <span className={task.isDone ? styles.textDone : ''}>{task.desc}</span>
      <Trash
        size={20}
        className={styles.trashIcon}
        onClick={() => onRemoveTask!(task.id)}
      />
    </div>
  );
}

interface CheckboxProps {
  checked: boolean;
  onClick: () => void;
}

function Checkbox({ checked, onClick }: CheckboxProps) {
  return checked ? (
    <CheckCircle
      size={24}
      className={styles.checkedCheckBox}
      weight="fill"
      onClick={onClick}
    />
  ) : (
    <Circle size={24} className={styles.checkBox} onClick={onClick} />
  );
}
