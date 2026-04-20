import { useState } from 'react'
import type { ExampleComponent } from './exampleTypes'

const PaletteLab: ExampleComponent = () => {
  const [name, setName] = useState<string>('sunset')
  const [hue, setHue] = useState<number>(18)
  const [saturation, setSaturation] = useState<number>(88)
  const [lightness, setLightness] = useState<number>(56)

  const color = `hsl(${hue} ${saturation}% ${lightness}%)`

  return (
    <section className="demo-card">
      <div className="demo-copy">
        <h3>パレットメーカー</h3>
        <p>
          controlled input の基本形です。state を変えると、プレビューとラベルが同時に
          更新されます。
        </p>
      </div>

      <div className="palette-layout">
        <div className="swatch" style={{ background: color }}>
          <span>{name}</span>
          <strong>{color}</strong>
        </div>

        <div className="field-grid">
          <label className="field">
            <span>name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="color name"
            />
          </label>
          <label className="field">
            <span>hue</span>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(event) => setHue(Number(event.target.value))}
            />
          </label>
          <label className="field">
            <span>saturation</span>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(event) => setSaturation(Number(event.target.value))}
            />
          </label>
          <label className="field">
            <span>lightness</span>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(event) => setLightness(Number(event.target.value))}
            />
          </label>
        </div>
      </div>
    </section>
  )
}

PaletteLab.exampleMeta = {
  id: 'palette',
  title: 'Sample 2: Palette Lab',
  description: 'フォーム入力と派生 UI を 1 画面で確認できるサンプル。',
  tags: ['controlled input', 'range', 'derived state'],
  order: 2,
}

export default PaletteLab
