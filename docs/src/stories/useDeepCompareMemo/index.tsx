import { useState, useMemo } from 'react'
import { useDeepCompareMemo } from '@vainjs/hooks'

const DeepCompareMemoExample = () => {
  const [count, setCount] = useState(0)
  const [normalObj, setNormalObj] = useState({ value: 10 })
  const [deepObj, setDeepObj] = useState({ value: 10 })

  const [normalCalcCount, setNormalCalcCount] = useState(0)
  const [deepCalcCount, setDeepCalcCount] = useState(0)

  // 使用普通的 useMemo，当对象引用变化时会重新计算
  const normalResult = useMemo(() => {
    setNormalCalcCount((prev) => prev + 1)
    console.log('Normal useMemo calculation executed')
    return normalObj.value * 2
  }, [normalObj])

  // 使用 useDeepCompareMemo，只有当对象内容真正变化时才会重新计算
  const deepResult = useDeepCompareMemo(() => {
    setDeepCalcCount((prev) => prev + 1)
    console.log('Deep compare useMemo calculation executed')
    return deepObj.value * 2
  }, [deepObj])

  // 创建新对象但内容相同
  const updateWithSameContent = () => {
    setNormalObj({ value: normalObj.value })
    setDeepObj({ value: deepObj.value })
  }

  // 创建新对象且内容不同
  const updateWithNewContent = () => {
    setNormalObj({ value: normalObj.value + 5 })
    setDeepObj({ value: deepObj.value + 5 })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useDeepCompareMemo Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)} style={buttonStyle}>
          Increment Count (Trigger Re-render)
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={boxStyle}>
          <h3>Normal useMemo</h3>
          <p>Input Object: {JSON.stringify(normalObj)}</p>
          <p>Calculated Result: {normalResult}</p>
          <p>Calculation Count: {normalCalcCount}</p>
        </div>

        <div style={boxStyle}>
          <h3>useDeepCompareMemo</h3>
          <p>Input Object: {JSON.stringify(deepObj)}</p>
          <p>Calculated Result: {deepResult}</p>
          <p>Calculation Count: {deepCalcCount}</p>
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
            Normal useMemo recalculates every time the object reference changes,
            even if the content is the same.
          </li>
          <li>
            useDeepCompareMemo only recalculates when the object content
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

export default DeepCompareMemoExample
