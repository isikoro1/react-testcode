import { useState } from 'react'
import type { ExampleComponent } from './exampleTypes'

type Task = {
  id: number
  title: string
  done: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'props を読む', done: false },
  { id: 2, title: 'useState を書く', done: true },
  { id: 3, title: 'map で描画する', done: false },
]

const TaskBoardLab: ExampleComponent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [title, setTitle] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all')

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'open') {
      return !task.done
    }

    if (filter === 'done') {
      return task.done
    }

    return true
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextTitle = title.trim()

    if (!nextTitle) {
      return
    }

    setTasks((current) => [
      {
        id: current.length + 1,
        title: nextTitle,
        done: false,
      },
      ...current,
    ])
    setTitle('')
  }

  function handleToggle(taskId: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <section className="demo-card">
      <div className="demo-copy">
        <h3>タスクボード</h3>
        <p>
          配列 state を扱う練習用です。追加、切り替え、絞り込みの 3 パターンを 1 つに
          まとめています。
        </p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="次に試したい React のメモ"
        />
        <button type="submit">add</button>
      </form>

      <div className="filter-row">
        {(['all', 'open', 'done'] as const).map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? 'is-active' : ''}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggle(task.id)}
              />
              <span className={task.done ? 'is-done' : ''}>{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

TaskBoardLab.exampleMeta = {
  id: 'tasks',
  title: 'Sample 3: Task Board Lab',
  description: '配列 state の追加・切り替え・絞り込みを練習するサンプル。',
  tags: ['list rendering', 'filter', 'form submit'],
  order: 3,
}

export default TaskBoardLab
