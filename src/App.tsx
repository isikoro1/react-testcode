import { useState } from 'react'
import './App.css'
import type { ExampleComponent, ExampleMeta } from './examples/exampleTypes'

const modules = import.meta.glob('./examples/*.tsx', { eager: true }) as Record<
  string,
  { default?: ExampleComponent }
>

function getFileName(path: string) {
  return path.split('/').pop()?.replace(/\.tsx$/, '') ?? 'Example'
}

function toTitle(fileName: string) {
  return fileName.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

function toId(fileName: string) {
  return fileName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

type Sample = Omit<ExampleMeta, 'order'> & {
  component: ExampleComponent
  order: number
  path: string
}

const samples = Object.entries(modules)
  .reduce<Sample[]>((list, [path, module]) => {
    const Component = module.default

    if (!Component) {
      return list
    }

    const fileName = getFileName(path)
    const meta = Component.exampleMeta

    list.push({
      id: meta?.id ?? toId(fileName),
      title: meta?.title ?? toTitle(fileName),
      description: meta?.description ?? '新しい練習用サンプル。',
      tags: meta?.tags ?? [],
      order: meta?.order ?? 999,
      path: path.replace('./', 'src/'),
      component: Component,
    })

    return list
  }, [])
  .sort((left, right) => left.order - right.order)

function App() {
  const [activeId, setActiveId] = useState(samples[0]?.id ?? '')

  const activeSample = samples.find((sample) => sample.id === activeId) ?? samples[0]

  if (!activeSample) {
    return (
      <main className="shell">
        <section className="hero-panel">
          <p className="eyebrow">React practice repo</p>
          <h1>sample が見つかりません</h1>
          <p className="hero-copy">
            `src/examples` に `default export` の `.tsx` ファイルを置いてください。
            `exampleMeta` は任意です。
          </p>
        </section>
      </main>
    )
  }

  const ActiveComponent = activeSample.component

  return (
    <main className="shell">
      <section className="hero-panel">
        <p className="eyebrow">React practice repo</p>
        <h1>書いて覚えるための React テストコード置き場</h1>
        <p className="hero-copy">
          Vite + React + TypeScript の最小構成です。`src/examples` に `.tsx` を増やせば、
          画面の一覧にも自動で出ます。
        </p>
        <div className="command-strip">
          <code>npm run dev</code>
          <code>npm run typecheck</code>
          <code>git push</code>
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
