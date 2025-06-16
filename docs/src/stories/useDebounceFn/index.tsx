import { type DebounceOptions, useDebounceFn } from '@vainjs/hooks'
import { type FC } from 'react'
import { message, Button } from 'antd'

export const UseDebounceFn: FC<{
  options?: DebounceOptions
  fn?: () => void
  wait: number
}> = (props) => {
  const { wait, options } = props
  const debouncedFn = useDebounceFn(
    (...args: string[]) => {
      message.success(`万物静观皆自得，${args.join('')}`)
    },
    wait,
    options
  )

  return (
    <Button onClick={() => debouncedFn('出自', '《山居赋》')} type="primary">
      谢灵运
    </Button>
  )
}
