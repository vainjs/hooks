import { useState, useLayoutEffect } from 'react'
import { useDeepCompareLayoutEffect } from '@vainjs/hooks'

const DeepCompareLayoutEffectExample = () => {
  const [count, setCount] = useState(0)
  const [normalObj, setNormalObj] = useState({ value: 0 })
  const [deepObj, setDeepObj] = useState({ value: 0 })

  const [normalEffectRuns, setNormalEffectRuns] = useState(0)
  const [deepEffectRuns, setDeepEffectRuns] = useState(0)

  // 普通的 useLayoutEffect，当对象引用变化时会执行
  useLayoutEffect(() => {
    setNormalEffectRuns((prev) => prev + 1)
    console.log('Normal useLayoutEffect executed')
  }, [normalObj])

  // 使用 useDeepCompareLayoutEffect，只有当对象内容真正变化时才会执行
  useDeepCompareLayoutEffect(() => {
    setDeepEffectRuns((prev) => prev + 1)
    console.log('Deep compare useLayoutEffect executed')
  }, [deepObj])

  // 创建新对象但内容相同
  const updateWithSameContent = () => {
    setNormalObj({ value: normalObj.value })
    setDeepObj({ value: deepObj.value })
  }

  // 创建新对象且内容不同
  const updateWithNewContent = () => {
    setNormalObj({ value: normalObj.value + 1 })
    setDeepObj({ value: deepObj.value + 1 })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useDeepCompareLayoutEffect Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)} style={buttonStyle}>
          Increment Count (Trigger Re-render)
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={boxStyle}>
          <h3>Normal useLayoutEffect</h3>
          <p>Object: {JSON.stringify(normalObj)}</p>
          <p>Effect Runs: {normalEffectRuns}</p>
        </div>

        <div style={boxStyle}>
          <h3>useDeepCompareLayoutEffect</h3>
          <p>Object: {JSON.stringify(deepObj)}</p>
          <p>Effect Runs: {deepEffectRuns}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={updateWithSameContent} style={buttonStyle}>
          Update Objects (Same Content)
        </button>

        <button onClick={updateWithNewContent} style={buttonStyle}>
          Update Objects (New Content)
        </button>
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
          <li>
            Normal useLayoutEffect runs every time the object reference changes,
            even if the content is the same.
          </li>
          <li>
            useDeepCompareLayoutEffect only runs when the object content
            actually changes.
          </li>
          <li>
            Click &quot;Update Objects (Same Content)&quot; to see the
            difference.
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
  width: '250px',
}

export default DeepCompareLayoutEffectExample
