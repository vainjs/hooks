import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useUpdateLayoutEffect',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useUpdateLayoutEffect\` 是一个自定义 Hook，它类似于 React 的 \`useLayoutEffect\`，但只在组件更新时执行，跳过首次渲染。

### 使用场景

当你需要在组件更新（而不是首次渲染）时执行副作用，并且需要在浏览器绘制之前同步执行（例如，需要读取布局或进行 DOM 修改）时，可以使用此 Hook。

### 基本用法

\`\`\`tsx
import { useUpdateLayoutEffect } from '@vainjs/hooks';

useUpdateLayoutEffect(() => {
  // 这个副作用只在组件更新时执行，跳过首次渲染
  // 并且在浏览器绘制之前同步执行
  console.log('Component updated');
  // 可以读取布局或进行 DOM 修改
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
          '这个例子展示了 `useUpdateLayoutEffect` 与普通 `useLayoutEffect` 的区别。普通的 `useLayoutEffect` 在首次渲染和每次更新时都会执行，而 `useUpdateLayoutEffect` 只在更新时执行，跳过首次渲染。',
      },
    },
  },
}
