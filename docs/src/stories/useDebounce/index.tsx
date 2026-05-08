import { type DebounceOptions, useDebounce } from '@vainjs/hooks'
import { type FC, useState } from 'react'
import { Input, Alert } from 'antd'

export const UseDebounce: FC<{
  options?: DebounceOptions
  value?: string
  wait: number
}> = (props) => {
  const { wait, options } = props
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, wait, options)

  return (
    <div style={{ width: 500 }}>
      <Input
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: 20 }}
        allowClear
      />
      <Alert message={`物来顺应，未来不迎: ${debouncedValue}`} />
    </div>
  )
}
