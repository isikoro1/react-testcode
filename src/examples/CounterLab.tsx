import { useState } from 'react'
import type { ExampleComponent } from './exampleTypes'

type CounterPanelProps = {
  label: string
  value: number
}

function CounterPanel({ label, value }: CounterPanelProps) {
  return (
    <div className="mini-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

const CounterLab: ExampleComponent = () => {
  const [count, setCount] = useState<number>(0)
  const [step, setStep] = useState<number>(1)

  return (
    <section className="demo-card">
      <div className="demo-copy">
        <h3>カウンター</h3>
        <p>
          まずは `useState` とクリックイベント。`step` を変えるだけで更新ロジックの
          見通しがかなり良くなります。
        </p>
      </div>

      <div className="counter-stage">
        <CounterPanel label="count" value={count} />
        <CounterPanel label="step" value={step} />
        <div className="counter-actions">
          <button type="button" onClick={() => setCount((current) => current - step)}>
            -{step}
          </button>
          <button type="button" onClick={() => setCount((current) => current + step)}>
            +{step}
          </button>
          <button type="button" onClick={() => setCount(0)}>
            reset
          </button>
        </div>
        <label className="field">
          <span>step</span>
          <input
            type="range"
            min="1"
            max="10"
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
      </div>
    </section>
  )
}

CounterLab.exampleMeta = {
  id: 'counter',
  title: 'Sample 1: Counter Lab',
  description: 'useState とイベント処理を最短で反復できるサンプル。',
  tags: ['useState', 'onClick', 'props'],
  order: 1,
}

export default CounterLab
