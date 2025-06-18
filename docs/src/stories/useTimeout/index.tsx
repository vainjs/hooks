import { useTimeout } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography, Card } from 'antd'

export const UseTimeout = () => {
  const [message, setMessage] = useState<string>('')
  const delay = 3000
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const clear = useTimeout(() => {
    setMessage('时间到！')
    setIsRunning(false)
  }, delay)

  const startTimer = () => {
    setMessage('等待中...')
    setIsRunning(true)
  }

  const stopTimer = () => {
    clear()
    setMessage('已取消')
    setIsRunning(false)
  }

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useTimeout 示例" style={{ width: 300 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>延迟时间: {delay / 1000} 秒</Typography.Text>
          <Space>
            <Button type="primary" onClick={startTimer} disabled={isRunning}>
              开始
            </Button>
            <Button danger onClick={stopTimer} disabled={!isRunning}>
              取消
            </Button>
          </Space>
          <Typography.Text
            style={{
              height: 24,
              display: 'block',
              textAlign: 'center',
              marginTop: 16,
            }}>
            {message}
          </Typography.Text>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        点击「开始」后，{delay / 1000}{' '}
        秒后会显示「时间到！」，或者点击「取消」提前结束
      </Typography.Text>
    </Space>
  )
}
