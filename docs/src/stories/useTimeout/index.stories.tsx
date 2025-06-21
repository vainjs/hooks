import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseTimeout } from './index'

/**
 * 处理 setTimeout 计时器的 Hook，支持清除定时器。
 */
const meta = {
  title: 'Utils/useTimeout',
  component: UseTimeout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '要执行的函数',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    delay: {
      description: '延迟时间，单位为毫秒',
      type: 'number',
      control: 'number',
    },
  },
} satisfies Meta<typeof UseTimeout>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '基础使用',
  args: {
    delay: 5000,
  },
}
