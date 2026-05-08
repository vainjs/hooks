import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseLockFn } from './index'

/**
 * 给异步函数加锁，防止并发执行。
 */
const meta = {
  title: 'Utils/useLockFn',
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
      description: '配置项，可以设置解锁时机',
      control: 'object',
      table: {
        type: {
          summary: '{ timing?: "catch" | "finally" }',
        },
        defaultValue: { summary: '{ timing: "finally" }' },
      },
    },
  },
} satisfies Meta<typeof UseLockFn>

export default meta
type Story = StoryObj<typeof meta>

export const Finally: Story = {
  name: 'finally 时解锁',
  args: {
    options: { timing: 'finally' },
  },
}

export const Catch: Story = {
  name: 'catch 时解锁',
  args: {
    options: { timing: 'catch' },
  },
}
