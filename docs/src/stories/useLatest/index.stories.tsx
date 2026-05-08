import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseLatest } from './index'

/**
 * 返回当前最新值的 ref 对象，可以避免闭包问题。
 */
const meta = {
  title: 'State/useLatest',
  component: UseLatest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '需要返回 ref 的值',
      control: false,
      table: {
        type: {
          summary: 'T',
        },
      },
    },
  },
} satisfies Meta<typeof UseLatest>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
