import { useInterval } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography, Card, Progress } from 'antd'

export const UseInterval = () => {
  const [count, setCount] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const delay = 1000

  const clear = useInterval(
    () => {
      setCount((c) => (c >= 100 ? 0 : c + 10))
    },
    isRunning ? delay : (null as unknown as number)
  )

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    clear()
    setIsRunning(false)
  }

  const resetTimer = () => {
    clear()
    setCount(0)
    setIsRunning(false)
  }

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useInterval 示例" style={{ width: 300 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Progress percent={count} status={isRunning ? 'active' : 'normal'} />
          <Typography.Text>间隔时间: {delay / 1000} 秒</Typography.Text>
          <Space>
            <Button type="primary" onClick={startTimer} disabled={isRunning}>
              开始
            </Button>
            <Button onClick={stopTimer} disabled={!isRunning}>
              暂停
            </Button>
            <Button danger onClick={resetTimer}>
              重置
            </Button>
          </Space>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        点击「开始」后，每隔 {delay / 1000} 秒进度条增加
        10%，可以随时「暂停」或「重置」
      </Typography.Text>
    </Space>
  )
}
