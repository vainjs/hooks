import { useLatest } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography } from 'antd'

export const UseLatest = () => {
  const [count, setCount] = useState(0)
  const countRef = useLatest(count)

  const alertLatest = () => {
    setTimeout(() => {
      alert(`Current count: ${count}\nLatest count: ${countRef.current}`)
    }, 1000)
  }

  return (
    <Space direction="vertical" align="center">
      <Typography.Title level={4}>Count: {count}</Typography.Title>
      <Space>
        <Button onClick={() => setCount(count + 1)}>增加</Button>
        <Button onClick={alertLatest}>延迟显示</Button>
      </Space>
      <Typography.Text type="secondary">
        点击「增加」后立即点击「延迟显示」，可以看到 useLatest
        始终保持最新值的引用
      </Typography.Text>
    </Space>
  )
}
