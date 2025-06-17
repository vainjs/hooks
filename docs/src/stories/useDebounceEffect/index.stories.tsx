import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  UseDebounceEffectDeps,
  UseDebounceEffectDeep,
  UseDebounceEffect,
} from './index'

/**
 * 提供类似于 useEffect 的防抖功能，在依赖项变化时，延迟执行回调函数。
 */
const meta = {
  title: 'Effect/useDebounceEffect',
  component: UseDebounceEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '需要防抖执行的回调函数',
      control: false,
      table: {
        type: {
          summary: 'EffectCallback',
        },
      },
    },
    deps: {
      description: '依赖数组，类似于 useEffect 的第二个参数',
      control: false,
      table: {
        type: {
          summary: 'DependencyList',
        },
      },
    },
    options: {
      description: '配置选项',
      control: 'object',
      table: {
        defaultValue: {
          summary: '{ wait: 300, leading: false, trailing: true }',
        },
        type: {
          summary: '{ wait?: number; leading?: boolean; trailing?: boolean }',
        },
      },
    },
  },
} satisfies Meta<typeof UseDebounceEffect>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '基础使用',
  args: {},
}

export const Options: Story = {
  name: '配置项',
  args: {
    options: { leading: true, trailing: true, wait: 1000 },
  },
}

export const Deps: Story = {
  name: '依赖数组',
  args: {
    options: { wait: 1000 },
  },
  render: (args) => <UseDebounceEffectDeps {...args} />,
}

export const DeepTrue: Story = {
  name: '配置项: deep: true',
  args: {
    options: { deep: true, wait: 1000 },
  },
  render: (args) => <UseDebounceEffectDeep {...args} />,
}

export const DeepFalse: Story = {
  name: '配置项: deep: false',
  args: {
    options: { deep: false, wait: 1000 },
  },
  render: (args) => <UseDebounceEffectDeep {...args} />,
}
