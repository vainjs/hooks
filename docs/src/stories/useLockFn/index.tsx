import { useLockFn } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography, Card, message } from 'antd'

export const UseLockFn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  const mockAsyncFn = async () => {
    setLoading(true)
    message.info('开始执行异步操作')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCount((c) => c + 1)
    setLoading(false)
    message.success('异步操作执行完成')
  }

  const lockedFn = useLockFn(mockAsyncFn)

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useLockFn 示例" style={{ width: 300 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>当前计数: {count}</Typography.Text>
          <Space>
            <Button type="primary" onClick={mockAsyncFn} loading={loading}>
              普通异步函数
            </Button>
            <Button type="primary" onClick={lockedFn} loading={loading}>
              加锁异步函数
            </Button>
          </Space>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        快速点击「普通异步函数」可以触发多次执行，而「加锁异步函数」在上一次执行完成前，无法再次触发
      </Typography.Text>
    </Space>
  )
}
