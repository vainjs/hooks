import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseDebounceFn } from './index'

/**
 * 对函数进行防抖处理。
 */
const meta = {
  title: 'Utils/useDebounceFn',
  component: UseDebounceFn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fn: {
      description: '需要防抖的函数',
      control: false,
    },
    wait: {
      description: '等待时间，单位为毫秒',
      type: 'number',
      control: 'number',
      defaultValue: { summary: '300' },
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
} satisfies Meta<typeof UseDebounceFn>

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
