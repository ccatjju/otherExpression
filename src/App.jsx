import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CanvasNewww from './works/canvas-newww/App'

function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1>작품 목록</h1>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/canvas-newww" style={{ fontSize: '18px', color: '#0066cc' }}>
              canvas-newww - 첫 번째 표현
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas-newww" element={<CanvasNewww />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
