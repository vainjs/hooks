import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseInterval } from './index'

/**
 * 处理 setInterval 计时器的 Hook，支持清除定时器。
 */
const meta = {
  title: 'Effect/useInterval',
  component: UseInterval,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '要定时执行的函数',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    timeout: {
      description: '间隔时间，单位为毫秒',
      type: 'number',
      control: 'number',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    options: {
      description: '配置项',
      control: 'object',
      table: {
        type: {
          summary: '{ immediate?: boolean }',
        },
        defaultValue: { summary: '{}' },
      },
    },
  },
} satisfies Meta<typeof UseInterval>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
