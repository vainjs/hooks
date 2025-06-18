import { useUnmounted } from '@vainjs/hooks'
import { useState } from 'react'
import { Button, Space, Typography, Card, message } from 'antd'

const ChildComponent = () => {
  useUnmounted(() => {
    message.success('子组件已卸载')
  })

  return (
    <Card title="子组件" style={{ width: '100%', marginBottom: 16 }}>
      <Typography.Text>
        这是一个子组件，当它被卸载时，useUnmounted 钩子会执行
      </Typography.Text>
    </Card>
  )
}

export const UseUnmounted = () => {
  const [showChild, setShowChild] = useState<boolean>(true)

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Card title="useUnmounted 示例" style={{ width: 400 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {showChild && <ChildComponent />}

          <Button type="primary" onClick={() => setShowChild(!showChild)}>
            {showChild ? '卸载子组件' : '挂载子组件'}
          </Button>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        点击按钮卸载子组件时，会触发 useUnmounted 钩子执行，显示提示消息
      </Typography.Text>
    </Space>
  )
}
