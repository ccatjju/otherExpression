import { useEffect, useRef, useState } from 'react'
import lineCircleImage from '../photo/line_circle.png'

// 12개 선 초기 데이터 생성
function createLines() {
  // 선 간격: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1 (총 11개 간격)
  const spacings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  const lines = []
  let x = 0
  for (let i = 0; i < 12; i++) {
    const width = parseFloat((1.5 - i * 0.1).toFixed(1))
    // 첫 번째 선은 #000000, 이후 선은 뒤 5자리 랜덤 HEX
    const color = i === 0
      ? '#000000'
      : '#0' + Math.floor(Math.random() * 0xFFFFF).toString(16).padStart(5, '0').toUpperCase()
    lines.push({ id: i, initialX: x, width, color })
    if (i < 11) x += spacings[i]
  }
  return lines
}

// 좌측 이동 루프 애니메이션 선 컴포넌트
function MovingLines() {
  const containerRef = useRef(null)
  const containerWidthRef = useRef(1200)
  const linesData = useRef(createLines())
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        containerWidthRef.current = containerRef.current.clientWidth
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)

    // 1초마다 2px씩 좌측 이동
    const timer = setInterval(() => {
      setOffset(prev => prev + 2)
    }, 1000)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}
    >
      {linesData.current.map(line => {
        const cw = containerWidthRef.current
        // 좌측으로 이동하다가 left edge 벗어나면 우측에서 다시 등장 (루프)
        const rawX = line.initialX - offset
        const displayX = ((rawX % cw) + cw) % cw
        return (
          <div
            key={line.id}
            style={{
              position: 'absolute',
              left: `${displayX}px`,
              top: 0,
              width: `${line.width}px`,
              height: '100%',
              backgroundColor: line.color,
            }}
          />
        )
      })}
    </div>
  )
}

export default function VisualPanel() {
  return (
    <div className="image-panel" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <div className="first" style={{ width: '100%', height: '700px', position: 'relative' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 900 700"
          style={{ position: 'absolute', top: 0, left: 0 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 중앙 기준점 계산 - 고정 viewBox 900x700 기준 */}
          {(() => {
            const width = 900
            const centerX = width / 2
            const lineWidth = 320
            const lineSpacing = 20
            const lineStartX = centerX - lineWidth / 2
            const lineEndX = centerX + lineWidth / 2

            return (
              <>
                {/* 2줄의 수평선 */}
                <line
                  x1={lineStartX}
                  y1={150}
                  x2={lineEndX}
                  y2={150}
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1={lineStartX}
                  y1={150 + lineSpacing + 2}
                  x2={lineEndX}
                  y2={150 + lineSpacing + 2}
                  stroke="black"
                  strokeWidth="2"
                />

                {/* 왼쪽 끝에서 20px 왼쪽에서 45도 각도로 170px의 선 */}
                <line
                  x1={lineStartX - 20}
                  y1={150}
                  x2={lineStartX - 20 + 120.2}
                  y2={150 - 120.2}
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1={lineStartX - 20}
                  y1={150 + lineSpacing + 2}
                  x2={lineStartX - 20}
                  y2={150 + lineSpacing + 2 + 170}
                  stroke="black"
                  strokeWidth="2"
                />

                {/* 중앙의 선에서 15px 위쪽 중앙에 반지름 30px의 원 */}
                <circle
                  cx={centerX}
                  cy={150 - 15}
                  r="30"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />

                {/* 원 위에 상반구들 - 간격 2배 (10px) */}
                {/* 첫 번째 반원: r=30, cy=130 (원의 cy 135에서 5px 위) */}
                <path
                  d={`M ${centerX - 30} 130 A 30 30 0 0 1 ${centerX + 30} 130`}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />

                {/* 두 번째 반원: r=21 (70% scale), cy=111 (간격 10px) */}
                <path
                  d={`M ${centerX - 21} 111 A 21 21 0 0 1 ${centerX + 21} 111`}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />

                {/* 세 번째 반원: r≈14.7 (70% scale), cy≈94.7 (간격 10px) */}
                <path
                  d={`M ${centerX - 14.7} 94.7 A 14.7 14.7 0 0 1 ${centerX + 14.7} 94.7`}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              </>
            )
          })()}
        </svg>
      </div>
      <div className="image" style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={lineCircleImage} alt="사용자가 그린 이미지" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </div>
      <div className="lines" style={{ width: '100%' }}>
        <MovingLines />
      </div>
    </div>
  )
}
