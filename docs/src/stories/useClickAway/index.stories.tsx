import type { Meta, StoryObj } from '@storybook/react-vite'
import { UseClickAwaysingle, UseClickAwayBrother } from './index'

/**
 * 优雅地监听元素外部点击事件，支持多元素和多事件类型。
 */
const meta = {
  title: 'Dom/useClickAway',
  component: UseClickAwaysingle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    fn: {
      description: '点击外部区域时的回调函数',
      type: '(event: Event) => void',
      control: false,
    },
    target: {
      description: '目标元素或者 Ref 对象，支持数组',
      type: 'BasicTarget | BasicTarget[]',
      control: false,
    },
    eventName: {
      description: '需要监听的事件，支持数组',
      control: 'text',
      table: {
        type: {
          summary: 'keyof DocumentEventMap | (keyof DocumentEventMap)[]',
        },
        defaultValue: { summary: 'click' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof UseClickAwaysingle>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Single: Story = {
  name: '基础使用',
  args: {},
}

export const Multiple: Story = {
  name: '绑定多个目标元素',
  args: {},
  render: (args) => <UseClickAwayBrother {...args} />,
}
