import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useDeepCompareLayoutEffect',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useDeepCompareLayoutEffect\` 是 React 的 \`useLayoutEffect\` 的一个变体，它使用深度比较来检查依赖项是否发生变化，而不是默认的引用比较。

### 使用场景

当你需要在依赖项为复杂对象或数组时避免不必要的副作用执行，同时需要在 DOM 更新之前同步执行副作用时，可以使用此 Hook。

### 基本用法

\`\`\`tsx
import { useDeepCompareLayoutEffect } from '@vainjs/hooks';

useDeepCompareLayoutEffect(() => {
  // 只有当 deps 的内容真正变化时才会执行
  console.log('Effect executed');
}, [complexObject, complexArray]);
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
          '这个例子展示了 `useDeepCompareLayoutEffect` 与普通 `useLayoutEffect` 的区别。当对象引用变化但内容相同时，普通的 `useLayoutEffect` 会重新执行，而 `useDeepCompareLayoutEffect` 不会。',
      },
    },
  },
}
