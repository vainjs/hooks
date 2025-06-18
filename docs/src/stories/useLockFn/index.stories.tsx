import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseLockFn } from './index'

/**
 * 给异步函数加锁，防止并发执行。
 */
const meta = {
  title: 'Async/useLockFn',
  component: UseLockFn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '需要加锁的异步函数',
      control: false,
      table: {
        type: {
          summary: '(...args: P) => Promise<R>',
        },
      },
    },
    options: {
      description: '配置项',
      control: 'object',
      table: {
        type: {
          summary: '{ timing?: "catch" | "finally" }',
        },
        defaultValue: { summary: '{ timing: "catch" }' },
      },
    },
  },
} satisfies Meta<typeof UseLockFn>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
