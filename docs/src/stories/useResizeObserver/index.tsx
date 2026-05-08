import { useState, useRef } from 'react'
import { useResizeObserver } from '@vainjs/hooks'

const ResizeObserverExample = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [logs, setLogs] = useState<string[]>([])
  const [resizable, setResizable] = useState(true)

  // 创建一个引用，用于观察大小变化
  const targetRef = useRef<HTMLDivElement>(null)

  // 添加日志的辅助函数
  const addLog = (message: string) => {
    setLogs((prev) => [message, ...prev].slice(0, 10)) // 只保留最近的 10 条日志
  }

  // 使用 useResizeObserver 监测元素大小变化
  useResizeObserver((entries) => {
    const entry = entries[0]
    if (entry) {
      const { width, height } = entry.contentRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })

      const timestamp = new Date().toLocaleTimeString()
      addLog(
        `${timestamp}: Resized to ${Math.round(width)}px × ${Math.round(height)}px`
      )
    }
  }, targetRef)

  // 改变元素大小的函数
  const changeSize = (widthDelta: number, heightDelta: number) => {
    if (targetRef.current) {
      const currentWidth = parseInt(targetRef.current.style.width || '300')
      const currentHeight = parseInt(targetRef.current.style.height || '200')

      targetRef.current.style.width = `${Math.max(100, currentWidth + widthDelta)}px`
      targetRef.current.style.height = `${Math.max(100, currentHeight + heightDelta)}px`
    }
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
      }}>
      <h2>useResizeObserver Example</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* 观察的目标元素 */}
        <div style={{ flex: 1 }}>
          <h3>Resizable Element</h3>
          <div
            ref={targetRef}
            style={{
              width: '300px',
              height: '200px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              overflow: 'hidden',
              resize: resizable ? 'both' : 'none',
              transition: 'background-color 0.3s ease',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin: '0 0 10px 0',
                }}>
                Current Dimensions:
              </p>
              <p style={{ fontSize: '16px', margin: 0 }}>
                {dimensions.width}px × {dimensions.height}px
              </p>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                {resizable
                  ? 'Drag the bottom-right corner to resize'
                  : 'Manual resize is disabled'}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
            <button onClick={() => changeSize(50, 0)} style={buttonStyle}>
              Width +50px
            </button>
            <button onClick={() => changeSize(-50, 0)} style={buttonStyle}>
              Width -50px
            </button>
            <button onClick={() => changeSize(0, 50)} style={buttonStyle}>
              Height +50px
            </button>
            <button onClick={() => changeSize(0, -50)} style={buttonStyle}>
              Height -50px
            </button>
            <button
              onClick={() => setResizable(!resizable)}
              style={{
                ...buttonStyle,
                backgroundColor: resizable ? '#f44336' : '#4CAF50',
              }}>
              {resizable ? 'Disable Manual Resize' : 'Enable Manual Resize'}
            </button>
          </div>
        </div>

        {/* 变化日志 */}
        <div style={{ flex: 1 }}>
          <h3>Resize Logs</h3>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              height: '250px',
              overflowY: 'auto',
            }}>
            {logs.length === 0 ? (
              <p style={{ color: '#888' }}>
                No resize events detected yet. Try resizing the element.
              </p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    marginBottom: '5px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    fontSize: '14px',
                  }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}>
        <p>
          <strong>Note:</strong>
        </p>
        <ul>
          <li>
            The ResizeObserver API allows you to observe changes to the size of
            an element&apos;s content or border box.
          </li>
          <li>
            In this example, we&apos;re tracking the width and height of the
            resizable element.
          </li>
          <li>
            You can resize the element by dragging its bottom-right corner (when
            manual resize is enabled) or by using the buttons.
          </li>
          <li>
            Each resize event is logged with a timestamp and the new dimensions.
          </li>
        </ul>
      </div>
    </div>
  )
}

// Styles
const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

export default ResizeObserverExample
