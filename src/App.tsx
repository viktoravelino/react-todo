import { FormEvent, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './App.module.css';
import { Clipboard } from './assets/images';

import { CreateButton } from './components/CreateButton';
import { Header } from './components/Header';
import { Info } from './components/Info';
import { Input } from './components/Input';
import { Task } from './components/Task';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './models/Todo';

function App() {
  const [tasks, setTasks] = useLocalStorage<Todo[]>('tasks', []);
  const [todoDescriptionField, setTodoDescriptionField] = useState('');

  const isListEmpty = tasks.length === 0;

  const totalOfTasks = useMemo(() => tasks.length.toString(), [tasks]);
  const totalOfTasksDone = useMemo(
    () =>
      tasks.reduce((total, task) => {
        if (task.isDone) {
          return total + 1;
        }
        return total;
      }, 0),
    [tasks]
  );

  function addNewTodo(e: FormEvent) {
    e.preventDefault();

    if (!todoDescriptionField) return;
    console.log(todoDescriptionField);

    const newTodo: Todo = {
      id: uuid(),
      desc: todoDescriptionField,
      isDone: false,
    };

    setTasks((prev) => [...prev, newTodo]);
    setTodoDescriptionField('');
  }

  function toggleTaskDone(taskId: string) {
    setTasks((prev) => {
      const tasksCopy = prev.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }

        return task;
      });

      return tasksCopy;
    });
  }

  function removeTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div>
          <form className={styles.addNewTaskContainer} onSubmit={addNewTodo}>
            <Input
              placeholder="Add new task"
              value={todoDescriptionField}
              onChange={(e) => setTodoDescriptionField(e.target.value)}
            />
            <CreateButton text="Add" type="submit" />
          </form>
        </div>

        <div className="tasks">
          <div className={styles.tasksInfo}>
            <Info text="Number of Tasks" number={totalOfTasks} color="blue" />
            <Info
              text="Done"
              number={`${totalOfTasksDone} of ${totalOfTasks}`}
              color="purple"
            />
          </div>

          {isListEmpty ? (
            <div className={styles.noTasks}>
              <img src={Clipboard} />
              <strong>You don't have any tasks</strong>
              <span>Add new tasks and organized your todos</span>
            </div>
          ) : (
            <div className={styles.tasksContainer}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleTask={toggleTaskDone}
                  onRemoveTask={removeTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
