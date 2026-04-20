import { useState } from 'react'
import './App.css'
import { CounterLab } from './examples/CounterLab.jsx'
import { PaletteLab } from './examples/PaletteLab.jsx'
import { TaskBoardLab } from './examples/TaskBoardLab.jsx'

const samples = [
  {
    id: 'counter',
    title: 'Sample 1: Counter Lab',
    description: 'useState とイベント処理を最短で反復できるサンプル。',
    path: 'src/examples/CounterLab.jsx',
    tags: ['useState', 'onClick', 'props'],
    component: CounterLab,
  },
  {
    id: 'palette',
    title: 'Sample 2: Palette Lab',
    description: 'フォーム入力と派生 UI を 1 画面で確認できるサンプル。',
    path: 'src/examples/PaletteLab.jsx',
    tags: ['controlled input', 'range', 'derived state'],
    component: PaletteLab,
  },
  {
    id: 'tasks',
    title: 'Sample 3: Task Board Lab',
    description: '配列 state の追加・切り替え・絞り込みを練習するサンプル。',
    path: 'src/examples/TaskBoardLab.jsx',
    tags: ['list rendering', 'filter', 'form submit'],
    component: TaskBoardLab,
  },
]

function App() {
  const [activeId, setActiveId] = useState(samples[0].id)
  const activeSample =
    samples.find((sample) => sample.id === activeId) ?? samples[0]
  const ActiveComponent = activeSample.component

  return (
    <main className="shell">
      <section className="hero-panel">
        <p className="eyebrow">React practice repo</p>
        <h1>書いて覚えるための React テストコード置き場</h1>
        <p className="hero-copy">
          Vite + React の最小構成に、すぐ触れるサンプルを 3 本だけ置いてあります。
          `src/examples` をベースに書き換えて、壊して、戻して、反復する前提です。
        </p>
        <div className="command-strip">
          <code>npm run dev</code>
          <code>npm run build</code>
          <code>git push -u origin main</code>
        </div>
      </section>

      <section className="workspace">
        <aside className="sample-list">
          <div className="section-heading">
            <p className="section-label">Samples</p>
            <h2>触り始める場所</h2>
          </div>

          <div className="sample-buttons">
            {samples.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className={`sample-button ${
                  sample.id === activeId ? 'is-active' : ''
                }`}
                onClick={() => setActiveId(sample.id)}
              >
                <span>{sample.title}</span>
                <small>{sample.description}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="lab-panel">
          <header className="lab-header">
            <div>
              <p className="section-label">Current file</p>
              <h2>{activeSample.title}</h2>
            </div>
            <code>{activeSample.path}</code>
          </header>

          <div className="tag-row">
            {activeSample.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <ActiveComponent />
        </section>
      </section>
    </main>
  )
}

export default App
