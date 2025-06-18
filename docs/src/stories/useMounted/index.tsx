import { useMounted } from '@vainjs/hooks'
import { useState } from 'react'
import { Card, Typography, Space, Button, Alert } from 'antd'

export const UseMounted = () => {
  const [message, setMessage] = useState<string>('')
  const [count, setCount] = useState<number>(0)

  useMounted(() => {
    setMessage('组件已挂载，这个函数只会在首次挂载时执行一次')
  })

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useMounted 示例" style={{ width: 400 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={message || '等待挂载...'} type="info" />
          <Typography.Text>计数器: {count}</Typography.Text>
          <Button type="primary" onClick={() => setCount(count + 1)}>
            增加计数（不会触发 useMounted）
          </Button>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        useMounted 只在组件首次挂载时执行一次，后续的状态更新不会再次触发
      </Typography.Text>
    </Space>
  )
}
