import { textEntries } from '../data/textEntries'

export default function TextPanel() {
  return (
    <div className="text-panel">
      {textEntries.map((entry, index) => (
        <div key={index} style={{ marginBottom: '12px' }}>
          {entry}
        </div>
      ))}
    </div>
  )
}
