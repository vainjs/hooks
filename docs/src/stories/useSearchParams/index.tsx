import { useState, useEffect } from 'react'
import { useSearchParams } from '@vainjs/hooks'

const SearchParamsExample = () => {
  // 使用 useSearchParams 获取 URL 查询参数
  const [params, updateParams] = useSearchParams<{
    name?: string
    age?: string
    city?: string
  }>()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')

  // 当组件挂载或 URL 变化时，更新表单状态
  useEffect(() => {
    setName(params.name || '')
    setAge(params.age || '')
    setCity(params.city || '')
    setCurrentUrl(window.location.href)
  }, [params])

  // 更新 URL 查询参数
  const updateUrlParams = () => {
    const searchParams = new URLSearchParams()

    if (name) searchParams.set('name', name)
    if (age) searchParams.set('age', age)
    if (city) searchParams.set('city', city)

    // 更新 URL，不刷新页面
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    )

    // 通知 useSearchParams 更新
    updateParams()
  }

  // 清除所有参数
  const clearParams = () => {
    setName('')
    setAge('')
    setCity('')

    window.history.pushState({}, '', window.location.pathname)
    updateParams()
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
      }}>
      <h2>useSearchParams Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>当前 URL:</p>
        <div
          style={{
            padding: '10px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            wordBreak: 'break-all',
          }}>
          {currentUrl}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>当前查询参数:</h3>
        {Object.keys(params).length === 0 ? (
          <p style={{ color: '#888' }}>无查询参数</p>
        ) : (
          <ul
            style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              borderRadius: '4px',
            }}>
            {Object.entries(params).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>更新查询参数:</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px',
          }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              名称:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              placeholder="输入名称"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              年龄:
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={inputStyle}
              placeholder="输入年龄"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              城市:
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
              placeholder="输入城市"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={updateUrlParams} style={buttonStyle}>
              更新 URL 参数
            </button>
            <button
              onClick={clearParams}
              style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
              清除所有参数
            </button>
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
          <strong>注意:</strong>
        </p>
        <ul>
          <li>useSearchParams 允许你获取和响应 URL 查询参数的变化。</li>
          <li>
            当你更新表单并点击「更新 URL 参数」按钮时，URL
            会更新但页面不会刷新。
          </li>
          <li>
            如果你直接在浏览器地址栏修改查询参数并按回车，useSearchParams
            也会检测到变化。
          </li>
          <li>
            这个 Hook 在实现可分享的 URL 状态、过滤器和搜索功能时非常有用。
          </li>
        </ul>
      </div>
    </div>
  )
}

// 样式
const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxSizing: 'border-box' as const,
}

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

export default SearchParamsExample
