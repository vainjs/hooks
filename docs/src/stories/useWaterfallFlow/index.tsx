import React, { useState, useRef } from 'react'
import { useWaterfallFlow } from '@vainjs/hooks'

const WaterfallFlowExample = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(() => {
    // 生成随机高度的初始项目
    return Array.from({ length: 20 }, (_, index) => ({
      id: `item-${index + 1}`,
      height: Math.floor(Math.random() * 200) + 100, // 100-300px 的随机高度
      color: getRandomColor(),
    }))
  })

  // 使用 useWaterfallFlow 计算瀑布流布局
  const { targetStyle, childNodeStyles } = useWaterfallFlow(containerRef, {
    width: 200, // 每列的宽度
    gap: 16, // 项目之间的间距
    attribute: 'data-key', // 用于标识每个项目的属性
  })

  // 添加新项目
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${prev.length + 1}`,
        height: Math.floor(Math.random() * 200) + 100,
        color: getRandomColor(),
      },
    ])
  }

  // 移除最后一个项目
  const removeItem = () => {
    if (items.length > 0) {
      setItems((prev) => prev.slice(0, -1))
    }
  }

  // 重新排序项目
  const shuffleItems = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5))
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
      }}>
      <h2>useWaterfallFlow Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>
          瀑布流布局会自动调整项目位置，使其填充可用空间，同时保持项目的原始宽高比。
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button onClick={addItem} style={buttonStyle}>
            添加项目
          </button>
          <button
            onClick={removeItem}
            style={buttonStyle}
            disabled={items.length === 0}>
            移除项目
          </button>
          <button onClick={shuffleItems} style={buttonStyle}>
            重新排序
          </button>
        </div>
      </div>

      {/* 瀑布流容器 */}
      <div
        ref={containerRef}
        style={{
          ...targetStyle,
          width: '100%',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '16px',
          backgroundColor: '#f9f9f9',
        }}>
        {items.map((item) => {
          const style = childNodeStyles.get(item.id)
          return (
            <div
              key={item.id}
              data-key={item.id}
              style={{
                ...style,
                height: item.height,
                backgroundColor: item.color,
                borderRadius: '4px',
                padding: '16px',
                boxSizing: 'border-box',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
              <div>{item.id}</div>
              <div>高度: {item.height}px</div>
            </div>
          )
        })}
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
          <li>瀑布流布局会自动计算每个项目的位置，使其填充可用空间。</li>
          <li>当容器大小变化或项目添加/删除时，布局会自动重新计算。</li>
          <li>每个项目必须有一个唯一的 data-key 属性，用于标识和定位。</li>
          <li>尝试调整浏览器窗口大小，观察布局如何响应变化。</li>
        </ul>
      </div>
    </div>
  )
}

// 生成随机颜色
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 60%)`
}

// 样式
const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

export default WaterfallFlowExample
