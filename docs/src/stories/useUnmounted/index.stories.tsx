import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseUnmounted } from './index'

/**
 * 在组件卸载时执行函数的 Hook。
 */
const meta = {
  title: 'Lifecycle/useUnmounted',
  component: UseUnmounted,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '组件卸载时执行的函数',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
  },
} satisfies Meta<typeof UseUnmounted>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
