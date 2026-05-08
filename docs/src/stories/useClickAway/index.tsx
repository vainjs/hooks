import { useClickAway } from '@vainjs/hooks'
import { useRef, useState } from 'react'
import { Button, Space } from 'antd'

export const UseClickAwaysingle = () => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLButtonElement>(null)

  useClickAway(() => {
    setCount((prev) => prev + 1)
  }, ref)

  return (
    <Button ref={ref} type="primary">
      苏洵{count > 0 ? ` 错过${count}次` : ''}
    </Button>
  )
}

export const UseClickAwayBrother = () => {
  const [count, setCount] = useState(0)
  const olderRef = useRef(null)
  const youngerRef = useRef(null)

  useClickAway(() => {
    setCount((prev) => prev + 1)
  }, [olderRef, youngerRef])

  return (
    <Space>
      <Button ref={olderRef} type="primary">
        苏轼{count > 0 ? ` 错过${count}次` : ''}
      </Button>
      <Button ref={youngerRef} type="primary">
        苏辙{count > 0 ? ` 错过${count}次` : ''}
      </Button>
    </Space>
  )
}
