import type { ExampleComponent } from './exampleTypes'

const ExampleTemplate: ExampleComponent = () => {
  return (
    <section className="demo-card">
      <div className="demo-copy">
        <h3>テンプレート</h3>
        <p>
          このファイルをコピーして `src/examples` に置けば、自動で一覧に出ます。
          `exampleMeta` を付けるとタイトルや並び順も調整できます。
        </p>
      </div>
    </section>
  )
}

ExampleTemplate.exampleMeta = {
  id: 'template',
  title: 'Template: Replace Me',
  description: '新しい練習ファイルを作るときの最小テンプレート。',
  tags: ['template'],
  order: 99,
}

export default ExampleTemplate
