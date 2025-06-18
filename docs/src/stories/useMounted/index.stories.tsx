import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseMounted } from './index'

/**
 * 在组件首次挂载时执行函数的 Hook。
 */
const meta = {
  title: 'Lifecycle/useMounted',
  component: UseMounted,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '组件首次挂载时执行的函数',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
  },
} satisfies Meta<typeof UseMounted>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
