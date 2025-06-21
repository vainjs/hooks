import { Button, Space, Typography, Card, Progress } from 'antd'
import { type IntervalOptions, useInterval } from '@vainjs/hooks'
import { useState } from 'react'

export const UseInterval = (props: {
  options?: IntervalOptions
  delay: number
}) => {
  const { delay, options } = props
  const [count, setCount] = useState<number>(0)

  const { clear, resume } = useInterval(
    () => {
      setCount((c) => (c >= 100 ? 0 : c + 10))
    },
    delay,
    options
  )

  return (
    <Card style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }} size={20}>
        <Card.Meta
          title="​天长地久有时尽，此恨绵绵无绝期。"
          description="白居易《长恨歌》"
        />
        <Progress percent={count} status="active" />
        <Typography.Text>间隔时间: {delay / 1000} 秒</Typography.Text>
        <Space>
          <Button onClick={clear}>暂停</Button>
          <Button onClick={resume}>继续</Button>
        </Space>
      </Space>
    </Card>
  )
}
