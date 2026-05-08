import { useLocalStorage } from '@vainjs/hooks'
import { useState } from 'react'
import { Input, Button, Space, Typography, Card, Select } from 'antd'

type DataType = 'string' | 'number' | 'object' | 'boolean'

export const UseLocalStorage = () => {
  const [key, setKey] = useState<string>('test-key')
  const [dataType, setDataType] = useState<DataType>('string')
  const [value, setValue] = useLocalStorage<
    string | number | Record<string, never> | boolean
  >(key, getDefaultValue(dataType))
  const [inputValue, setInputValue] = useState<string>(
    JSON.stringify(value) || ''
  )

  const updateValue = () => {
    try {
      setValue(parseValue(inputValue, dataType))
    } catch (error) {
      console.error('解析值失败', error)
    }
  }

  const handleDataTypeChange = (type: DataType) => {
    setDataType(type)
    setInputValue(JSON.stringify(getDefaultValue(type)))
    setValue(getDefaultValue(type))
  }

  return (
    <Space direction="vertical" style={{ width: 400 }}>
      <Card title="useLocalStorage 示例">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>存储键名：</Typography.Text>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="输入存储键名"
            style={{ marginBottom: 16 }}
          />

          <Typography.Text>数据类型：</Typography.Text>
          <Select
            style={{ width: '100%', marginBottom: 16 }}
            value={dataType}
            onChange={handleDataTypeChange}
            options={[
              { label: '字符串', value: 'string' },
              { label: '数字', value: 'number' },
              { label: '对象', value: 'object' },
              { label: '布尔值', value: 'boolean' },
            ]}
          />

          <Typography.Text>存储值：</Typography.Text>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入要存储的值"
            style={{ marginBottom: 16 }}
          />

          <Button type="primary" onClick={updateValue}>
            更新存储
          </Button>

          <Typography.Text style={{ marginTop: 16 }}>
            当前存储值: {JSON.stringify(value)}
          </Typography.Text>
        </Space>
      </Card>
      <Typography.Text type="secondary">
        数据会持久化存储在浏览器的 localStorage 中，刷新页面后仍然存在
      </Typography.Text>
    </Space>
  )
}

function getDefaultValue(type: DataType) {
  switch (type) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'object':
      return {}
    case 'boolean':
      return false
    default:
      return ''
  }
}

function parseValue(value: string, type: DataType) {
  switch (type) {
    case 'string':
      return value
    case 'number':
      return Number(value)
    case 'object':
      return JSON.parse(value)
    case 'boolean':
      return value.toLowerCase() === 'true'
    default:
      return value
  }
}
