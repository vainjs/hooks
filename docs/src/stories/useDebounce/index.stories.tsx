import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseDebounce } from './index'

/**
 * 对值进行防抖处理。
 */
const meta = {
  title: 'Utils/useDebounce',
  component: UseDebounce,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '需要防抖的值',
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
        defaultValue: { summary: '300' },
      },
    },
    options: {
      description: '配置选项',
      control: 'object',
      table: {
        defaultValue: { summary: '{ leading: false, trailing: true }' },
        type: {
          summary: '{ leading?: boolean; trailing?: boolean }',
        },
      },
    },
  },
  args: {},
} satisfies Meta<typeof UseDebounce>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '基础使用',
  args: {
    wait: 300,
  },
}

export const Options: Story = {
  name: '配置项',
  args: {
    wait: 1000,
    options: { leading: true, trailing: true },
  },
}
