import { Button, Space, Typography, Card, message } from 'antd'
import { useLockFn } from '@vainjs/hooks'
import { useState } from 'react'

export const UseLockFn = (props: {
  options?: { timing: 'catch' | 'finally' }
  fn?: () => void
}) => {
  const [count, setCount] = useState<number>(0)

  const lockedFn = useLockFn(async () => {
    setCount((c) => c + 1)
    const close = message.loading('长风破浪会有时，直挂云帆济沧海')
    return new Promise((resolve) => setTimeout(resolve, 2000)).finally(close)
  }, props.options)

  return (
    <Card style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }} size={20}>
        <Typography.Text>当前计数: {count}</Typography.Text>
        <Button type="primary" onClick={lockedFn}>
          提交
        </Button>
        <Typography.Text type="secondary">
          加锁异步函数，{props.options?.timing} 时解锁
        </Typography.Text>
      </Space>
    </Card>
  )
}
