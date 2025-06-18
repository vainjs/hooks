import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseSessionStorage } from './index'

/**
 * 将状态持久化存储在 sessionStorage 中的 Hook。
 */
const meta = {
  title: 'Storage/useSessionStorage',
  component: UseSessionStorage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    key: {
      description: '存储的键名',
      type: 'string',
      control: 'text',
    },
    value: {
      description: '存储的默认值',
      control: false,
      table: {
        type: {
          summary: 'T | (() => T)',
        },
      },
    },
    options: {
      description: '配置项',
      control: 'object',
      table: {
        type: {
          summary:
            '{ serializer?: Serializer<T>; prefix?: string; onError?: (error: unknown) => void }',
        },
      },
    },
  },
} satisfies Meta<typeof UseSessionStorage>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
