import { useTimeout } from '@vainjs/hooks'
import { useEffect, useState } from 'react'
import { Button, Space, Typography, Card, Spin } from 'antd'

export const UseTimeout = (props: { delay: number }) => {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const { delay } = props

  useEffect(() => {
    setLoading(true)
    setMessage('')
  }, [delay])

  const { clear } = useTimeout(() => {
    setMessage('虽迟但到！')
    setLoading(false)
  }, delay)

  return (
    <Card style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }} size={20}>
        <Card.Meta
          title="手持法律千钧剑，守护绿水和青山​。"
          description="王娟《检察官之诗》"
        />
        <Space size={50}>
          <Typography.Text>延迟时间: {delay / 1000} 秒</Typography.Text>
          <Spin spinning={loading}>
            <Typography.Text>{message}</Typography.Text>
          </Spin>
        </Space>
        <Button
          danger
          onClick={() => {
            setLoading(false)
            clear()
          }}>
          取消
        </Button>
      </Space>
    </Card>
  )
}
