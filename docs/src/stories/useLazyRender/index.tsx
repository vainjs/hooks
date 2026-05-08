import React, { useState, useRef, useEffect } from 'react'
import { useLazyRender } from '@vainjs/hooks'

const LazyRenderExample = () => {
  const [dataSize, setDataSize] = useState(1000)
  const [visibleItems, setVisibleItems] = useState(10)
  const [itemHeight, setItemHeight] = useState(60)
  const [scrollPosition, setScrollPosition] = useState(0)

  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // 生成大量数据
  const generateData = (size: number) => {
    return Array.from({ length: size }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      description: `This is the description for item ${index + 1}`,
      color: getRandomColor(),
    }))
  }

  const [fullData, setFullData] = useState(() => generateData(dataSize))

  // 使用 useLazyRender 懒加载数据
  const { dataSource: lazyLoadedData } = useLazyRender({
    target: bottomRef,
    dataSource: fullData,
    limit: 50, // 每次加载50项
  })

  // 计算可视区域内应该显示哪些项
  const startIndex = Math.floor(scrollPosition / itemHeight)
  const endIndex = Math.min(startIndex + visibleItems, lazyLoadedData.length)

  // 获取当前可见的项
  const visibleData = lazyLoadedData.slice(startIndex, endIndex)

  // 处理滚动事件
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop)
  }

  // 当数据大小变化时重新生成数据
  useEffect(() => {
    setFullData(generateData(dataSize))
  }, [dataSize])

  // 当容器大小变化时更新可见项数量
  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight
      const newVisibleItems = Math.ceil(containerHeight / itemHeight) + 2 // 额外加载2项以确保平滑滚动
      setVisibleItems(newVisibleItems)
    }
  }, [itemHeight])

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
      }}>
      <h2>useLazyRender 虚拟列表示例</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>
          useLazyRender
          结合虚拟滚动技术，可以高效地渲染大型列表，只渲染可见区域内的项，
          并且随着滚动懒加载更多数据。
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
              max="10000"
              step="100"
              value={dataSize}
              onChange={(e) => setDataSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              项目高度: {itemHeight}px
            </label>
            <input
              type="range"
              min="40"
              max="120"
              step="10"
              value={itemHeight}
              onChange={(e) => setItemHeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}>
            <p>
              <strong>统计信息:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>总数据量: {fullData.length} 项</li>
              <li>已加载数据: {lazyLoadedData.length} 项</li>
              <li>当前渲染: {visibleData.length} 项</li>
              <li>当前滚动位置: {Math.round(scrollPosition)}px</li>
              <li>可视区域起始索引: {startIndex}</li>
              <li>可视区域结束索引: {endIndex - 1}</li>
            </ul>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3>虚拟列表</h3>
          <div
            ref={containerRef}
            style={{
              height: '400px',
              overflow: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              position: 'relative',
            }}
            onScroll={handleScroll}>
            {/* 用于保持滚动区域高度 */}
            <div
              style={{
                height: `${lazyLoadedData.length * itemHeight}px`,
                position: 'relative',
              }}>
              {/* 只渲染可见项 */}
              {visibleData.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    top: `${(startIndex + index) * itemHeight}px`,
                    left: 0,
                    right: 0,
                    height: `${itemHeight}px`,
                    padding: '10px',
                    boxSizing: 'border-box',
                    backgroundColor: item.color,
                    color: 'white',
                    borderRadius: '4px',
                    margin: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '14px' }}>{item.description}</div>
                </div>
              ))}
            </div>

            {/* 用于触发懒加载的元素 */}
            <div ref={bottomRef} style={{ height: '1px' }} />
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
          <strong>虚拟列表与懒加载的结合:</strong>
        </p>
        <ul>
          <li>
            <strong>懒加载 (useLazyRender):</strong>{' '}
            随着用户滚动，逐步加载更多数据，避免一次性加载全部数据。
          </li>
          <li>
            <strong>虚拟滚动:</strong> 只渲染可视区域内的元素，无论列表多长，DOM
            元素数量保持恒定。
          </li>
          <li>
            <strong>性能优势:</strong>{' '}
            即使处理数万条数据，也能保持流畅的滚动体验和低内存占用。
          </li>
          <li>
            <strong>实现原理:</strong>{' '}
            通过计算滚动位置确定可见项，使用绝对定位放置元素，创建一个高度足够的容器来支持滚动。
          </li>
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

export default LazyRenderExample
