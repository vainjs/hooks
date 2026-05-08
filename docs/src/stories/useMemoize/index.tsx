import { useMemoize } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography, Card, Input } from 'antd'

export const UseMemoize = () => {
  const [inputValue, setInputValue] = useState<string>('初始值')
  const [count, setCount] = useState<number>(0)
  const memoizedValue = useMemoize(inputValue)

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useMemoize 示例" style={{ width: 400 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>当前输入值: {inputValue}</Typography.Text>
          <Typography.Text>记忆的值: {memoizedValue}</Typography.Text>
          <Typography.Text>重新渲染次数: {count}</Typography.Text>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="修改输入值"
            style={{ marginBottom: 16 }}
          />

          <Button type="primary" onClick={() => setCount(count + 1)}>
            触发重新渲染
          </Button>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        useMemoize 只会记住组件首次渲染时的值，后续的值更新不会影响记忆的值
      </Typography.Text>
    </Space>
  )
}
