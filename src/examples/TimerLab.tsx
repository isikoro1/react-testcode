import { useEffect, useState } from 'react'
import type { ExampleComponent } from './exampleTypes'

const TimerLab: ExampleComponent = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [isRunning])

  return (
    <section className="demo-card">
      <div className="demo-copy">
        <h3>タイマー</h3>
        <p>
          `useEffect` が必要になる最初の題材として扱いやすいです。開始、停止、リセット
          とクリーンアップをまとめて試せます。
        </p>
      </div>

      <div className="counter-stage">
        <div className="mini-stat">
          <span>seconds</span>
          <strong>{seconds}</strong>
        </div>

        <div className="counter-actions">
          <button type="button" onClick={() => setIsRunning(true)}>
            start
          </button>
          <button type="button" onClick={() => setIsRunning(false)}>
            stop
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRunning(false)
              setSeconds(0)
            }}
          >
            reset
          </button>
        </div>
      </div>
    </section>
  )
}

TimerLab.exampleMeta = {
  id: 'timer',
  title: 'Sample 4: Timer Lab',
  description: 'useEffect とクリーンアップを触るためのタイマー。',
  tags: ['useEffect', 'cleanup', 'interval'],
  order: 4,
}

export default TimerLab
