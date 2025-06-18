import React, { useState, useEffect } from 'react'
import { useBatchRender } from '@vainjs/hooks'

const BatchRenderExample = () => {
  const [dataSize, setDataSize] = useState(1000)
  const [batchSize, setBatchSize] = useState(50)
  const [renderTime, setRenderTime] = useState<number | null>(null)
  const [isRendering, setIsRendering] = useState(false)

  // 生成大量数据
  const generateData = (size: number) => {
    return Array.from({ length: size }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      value: Math.floor(Math.random() * 1000),
      color: getRandomColor(),
    }))
  }

  const [fullData, setFullData] = useState(() => generateData(dataSize))

  // 使用 useBatchRender 分批渲染数据
  const { dataSource: renderedData, cleanup } = useBatchRender({
    dataSource: fullData,
    limit: batchSize,
  })

  // 重新生成数据并开始计时
  const regenerateData = () => {
    cleanup() // 清理之前的渲染
    setRenderTime(null)
    setIsRendering(true)
    const startTime = performance.now()

    // 生成新数据
    const newData = generateData(dataSize)
    setFullData(newData)

    // 在所有数据渲染完成后记录时间
    const checkRenderComplete = () => {
      if (renderedData.length === newData.length) {
        const endTime = performance.now()
        setRenderTime(endTime - startTime)
        setIsRendering(false)
      } else {
        setTimeout(checkRenderComplete, 100)
      }
    }

    setTimeout(checkRenderComplete, 100)
  }

  // 当数据大小或批次大小变化时重新生成数据
  useEffect(() => {
    regenerateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSize, batchSize])

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
      }}>
      <h2>useBatchRender Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>
          useBatchRender 通过分批渲染大量数据来提高性能，避免一次性渲染大量 DOM
          元素导致的页面卡顿。
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>配置</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              数据量: {dataSize} 项
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={dataSize}
              onChange={(e) => setDataSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              每批次渲染: {batchSize} 项
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <button
            onClick={regenerateData}
            style={buttonStyle}
            disabled={isRendering}>
            {isRendering ? '渲染中...' : '重新渲染'}
          </button>

          {renderTime !== null && (
            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: '#f0f8ff',
                borderRadius: '4px',
              }}>
              <p style={{ margin: 0 }}>
                <strong>渲染完成!</strong> 用时: {renderTime.toFixed(2)} 毫秒
              </p>
              <p
                style={{
                  margin: '5px 0 0 0',
                  fontSize: '14px',
                  color: '#666',
                }}>
                已渲染 {renderedData.length} / {fullData.length} 项
              </p>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3>渲染进度</h3>
          <div
            style={{
              height: '30px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
            <div
              style={{
                height: '100%',
                width: `${(renderedData.length / fullData.length) * 100}%`,
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p style={{ textAlign: 'center', margin: '5px 0' }}>
            {renderedData.length} / {fullData.length} (
            {Math.round((renderedData.length / fullData.length) * 100)}%)
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>渲染结果</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '10px',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
          }}>
          {renderedData.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '10px',
                backgroundColor: item.color,
                color: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div>值: {item.value}</div>
            </div>
          ))}
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
          <li>useBatchRender 使用 requestAnimationFrame 分批渲染大量数据。</li>
          <li>通过调整数据量和每批次渲染数量，可以观察渲染性能的变化。</li>
          <li>在实际应用中，这种方法可以显著提高大列表的初始渲染性能。</li>
          <li>对于非常大的列表，还可以结合虚拟滚动技术来进一步优化性能。</li>
        </ul>
      </div>
    </div>
  )
}

// 生成随机颜色
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 45%)`
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

export default BatchRenderExample
