import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useUpdateEffect',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useUpdateEffect\` 是一个自定义 Hook，它类似于 React 的 \`useEffect\`，但只在组件更新时执行，跳过首次渲染。

### 使用场景

当你需要在组件更新（而不是首次渲染）时执行副作用时，可以使用此 Hook。

### 基本用法

\`\`\`tsx
import { useUpdateEffect } from '@vainjs/hooks';

useUpdateEffect(() => {
  // 这个副作用只在组件更新时执行，跳过首次渲染
  console.log('Component updated');
}, [dependency]);
\`\`\`
        `,
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          '这个例子展示了 `useUpdateEffect` 与普通 `useEffect` 的区别。普通的 `useEffect` 在首次渲染和每次更新时都会执行，而 `useUpdateEffect` 只在更新时执行，跳过首次渲染。',
      },
    },
  },
}
