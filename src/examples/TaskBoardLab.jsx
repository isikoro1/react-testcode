import { useState } from 'react'

const initialTasks = [
  { id: 1, title: 'props を読む', done: false },
  { id: 2, title: 'useState を書く', done: true },
  { id: 3, title: 'map で描画する', done: false },
]

export function TaskBoardLab() {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'open') {
      return !task.done
    }

    if (filter === 'done') {
      return task.done
    }

    return true
  })

  function handleSubmit(event) {
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

  function handleToggle(taskId) {
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
        {['all', 'open', 'done'].map((name) => (
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
