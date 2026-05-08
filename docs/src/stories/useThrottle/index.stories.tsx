import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseThrottle } from './index'

/**
 * 对值进行节流处理。
 */
const meta = {
  title: 'Utils/useThrottle',
  component: UseThrottle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '需要节流的值',
      control: false,
      table: {
        type: {
          summary: 'T',
        },
      },
    },
    wait: {
      description: '等待时间，单位为毫秒',
      type: 'number',
      control: 'number',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    options: {
      description: '节流配置',
      control: 'object',
      table: {
        type: {
          summary: '{ leading?: boolean; trailing?: boolean }',
        },
        defaultValue: { summary: '{ leading: true, trailing: true }' },
      },
    },
  },
} satisfies Meta<typeof UseThrottle>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
