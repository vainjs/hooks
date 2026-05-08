import { type UseDebounceEffectOptions, useDebounceEffect } from '@vainjs/hooks'
import type { FC, EffectCallback, DependencyList } from 'react'
import { List, Button, Typography } from 'antd'
import { useState } from 'react'

export const UseDebounceEffect: FC<{
  options?: UseDebounceEffectOptions
  deps?: DependencyList
  fn?: EffectCallback
}> = (props) => {
  const [log, setLog] = useState<string[]>([
    `万物静观皆自得: ${new Date().getTime()}`,
  ])

  useDebounceEffect(
    () => {
      setLog((prev) => [`万物静观皆自得: ${new Date().getTime()}`, ...prev])
    },
    [],
    props.options
  )

  return (
    <List>
      {log.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  )
}

export const UseDebounceEffectDeps: FC<{
  options?: UseDebounceEffectOptions
  deps?: DependencyList
  fn?: EffectCallback
}> = (props) => {
  const [signal, setSignal] = useState(0)
  const [log, setLog] = useState([
    {
      desc: `万物静观皆自得: ${new Date().getTime()}`,
      signal: -1,
      mark: false,
    },
  ])

  useDebounceEffect(
    () => {
      setLog((prev) => [
        {
          desc: `万物静观皆自得: ${new Date().getTime()}`,
          signal,
          mark: true,
        },
        ...prev,
      ])
    },
    [signal],
    props.options
  )

  return (
    <div style={{ width: 500 }}>
      <Button
        type="primary"
        onClick={() => {
          setSignal((prev) => {
            const newSignal = prev + 1
            setLog((prev) => [
              {
                desc: `万物静观皆自得: ${new Date().getTime()}`,
                signal: newSignal,
                mark: false,
              },
              ...prev,
            ])
            return newSignal
          })
        }}>
        谢灵运
      </Button>
      <List style={{ height: 400, overflow: 'auto' }}>
        {log.map((item) => (
          <List.Item key={item.desc}>
            <List.Item.Meta
              title={
                item.mark ? (
                  <Typography.Text mark>{item.desc}</Typography.Text>
                ) : (
                  <Typography.Text type="secondary">
                    {item.desc}
                  </Typography.Text>
                )
              }
            />
            {item.signal}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export const UseDebounceEffectDeep: FC<{
  options?: UseDebounceEffectOptions
  deps?: DependencyList
  fn?: EffectCallback
}> = (props) => {
  const [signal, setSignal] = useState({})
  const [log, setLog] = useState([
    {
      desc: `万物静观皆自得: ${new Date().getTime()}`,
      mark: false,
    },
  ])

  useDebounceEffect(
    () => {
      setLog((prev) => [
        {
          desc: `万物静观皆自得: ${new Date().getTime()}`,
          mark: true,
        },
        ...prev,
      ])
    },
    [signal],
    props.options
  )

  return (
    <div style={{ width: 500 }}>
      <Button
        type="primary"
        onClick={() => {
          setLog((prev) => [
            {
              desc: `万物静观皆自得: ${new Date().getTime()}`,
              mark: false,
            },
            ...prev,
          ])
          setSignal({})
        }}>
        谢灵运
      </Button>
      <List style={{ height: 400, overflow: 'auto' }}>
        {log.map((item) => (
          <List.Item key={item.desc}>
            <List.Item.Meta
              title={
                item.mark ? (
                  <Typography.Text mark>{item.desc}</Typography.Text>
                ) : (
                  <Typography.Text type="secondary">
                    {item.desc}
                  </Typography.Text>
                )
              }
            />
          </List.Item>
        ))}
      </List>
    </div>
  )
}
