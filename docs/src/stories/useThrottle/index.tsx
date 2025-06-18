import { type ThrottleOptions, useThrottle } from '@vainjs/hooks'
import { type FC, useState } from 'react'
import { Input, Alert, Space, Typography, Slider } from 'antd'

export const UseThrottle: FC<{
  options?: ThrottleOptions
  value?: string
  wait: number
}> = (props) => {
  const { wait = 500, options } = props
  const [value, setValue] = useState('')
  const [waitTime, setWaitTime] = useState(wait)
  const throttledValue = useThrottle(value, waitTime, options)

  return (
    <Space direction="vertical" style={{ width: 500 }}>
      <Typography.Text>输入内容：</Typography.Text>
      <Input
        onChange={(e) => setValue(e.target.value)}
        placeholder="请输入内容，观察节流效果"
        allowClear
      />
      <Typography.Text>节流时间（毫秒）：{waitTime}</Typography.Text>
      <Slider
        min={100}
        max={2000}
        step={100}
        value={waitTime}
        onChange={setWaitTime}
      />
      <Alert
        message={`节流后的值: ${throttledValue}`}
        description="快速输入时，节流值会以固定频率更新"
        type="info"
      />
    </Space>
  )
}
