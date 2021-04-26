import Garden from '../components/Garden'

export default function Home () {
  const garden = [
    ['models/base.vox', 'models/tree.vox', 'models/base.vox', null],
    ['models/base.vox', null, 'models/base.vox', 'models/pine.vox'],
    ['models/sprout.vox', 'models/tree.vox', 'models/base.vox', 'models/base.vox'],
    ['models/base.vox', 'models/base.vox', null, 'models/sprout.vox']
  ]

  return (
    <div className="w-screen h-screen">
      <Garden garden={garden} />
    </div>
  )
}
