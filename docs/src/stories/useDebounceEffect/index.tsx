import { type DebounceOptions, useDebounceEffect } from '@vainjs/hooks'
import type { FC, EffectCallback, DependencyList } from 'react'
import { message, Button } from 'antd'

export const UseDebounceEffect: FC<{
  options?: DebounceOptions & { wait: number }
  deps?: DependencyList
  fn?: EffectCallback
}> = (props) => {
  useDebounceEffect(
    () => {
      message.success('万物静观皆自得')
    },
    [],
    props.options
  )

  return <Button type="primary">谢灵运</Button>
}
