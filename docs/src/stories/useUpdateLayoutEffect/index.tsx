import React, { useState, useLayoutEffect } from 'react'
import { useUpdateLayoutEffect } from '@vainjs/hooks'

const UpdateLayoutEffectExample = () => {
  const [count, setCount] = useState(0)
  const [normalEffectLogs, setNormalEffectLogs] = useState<string[]>([])
  const [updateEffectLogs, setUpdateEffectLogs] = useState<string[]>([])

  // 普通的 useLayoutEffect，在首次渲染和每次更新时都会执行
  useLayoutEffect(() => {
    const timestamp = new Date().toLocaleTimeString()
    setNormalEffectLogs((prev) => [
      ...prev,
      `Executed at ${timestamp} (count: ${count})`,
    ])
    console.log('Normal useLayoutEffect executed')
  }, [count])

  // 使用 useUpdateLayoutEffect，只在更新时执行，跳过首次渲染
  useUpdateLayoutEffect(() => {
    const timestamp = new Date().toLocaleTimeString()
    setUpdateEffectLogs((prev) => [
      ...prev,
      `Executed at ${timestamp} (count: ${count})`,
    ])
    console.log('Update useLayoutEffect executed')
  }, [count])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useUpdateLayoutEffect Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)} style={buttonStyle}>
          Increment Count
        </button>
        <button
          onClick={() => {
            setNormalEffectLogs([])
            setUpdateEffectLogs([])
            setCount(0)
          }}
          style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={boxStyle}>
          <h3>Normal useLayoutEffect</h3>
          <p>Executes on mount and updates</p>
          <div style={logContainerStyle}>
            {normalEffectLogs.length === 0 ? (
              <p style={{ color: '#888' }}>
                No logs yet. Try incrementing the count.
              </p>
            ) : (
              normalEffectLogs.map((log, index) => (
                <div key={index} style={logItemStyle}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        <div style={boxStyle}>
          <h3>useUpdateLayoutEffect</h3>
          <p>Executes only on updates (skips mount)</p>
          <div style={logContainerStyle}>
            {updateEffectLogs.length === 0 ? (
              <p style={{ color: '#888' }}>
                No logs yet. Try incrementing the count.
              </p>
            ) : (
              updateEffectLogs.map((log, index) => (
                <div key={index} style={logItemStyle}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}>
        <p>
          <strong>Note:</strong>
        </p>
        <ul>
          <li>Normal useLayoutEffect runs on both mount and updates.</li>
          <li>
            useUpdateLayoutEffect only runs on updates, skipping the initial
            mount.
          </li>
          <li>
            Both effects run synchronously before the browser paints, allowing
            you to read layout and make DOM mutations.
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
  marginRight: '10px',
}

const boxStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  width: '300px',
}

const logContainerStyle = {
  maxHeight: '200px',
  overflowY: 'auto',
  marginTop: '10px',
  padding: '5px',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '4px',
}

const logItemStyle = {
  padding: '5px',
  borderBottom: '1px solid #eee',
  fontSize: '14px',
}

export default UpdateLayoutEffectExample
