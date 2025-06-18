import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseMemoize } from './index'

/**
 * 记忆初始值的 Hook，只会在初始值为 null 或 undefined 时更新。
 */
const meta = {
  title: 'State/useMemoize',
  component: UseMemoize,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '需要记忆的值',
      control: false,
      table: {
        type: {
          summary: 'T',
        },
      },
    },
  },
} satisfies Meta<typeof UseMemoize>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
