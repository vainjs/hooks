import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useDeepCompareMemo',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useDeepCompareMemo\` 是 React 的 \`useMemo\` 的一个变体，它使用深度比较来检查依赖项是否发生变化，而不是默认的引用比较。

### 使用场景

当你需要在依赖项为复杂对象或数组时避免不必要的重新计算时，可以使用此 Hook。

### 基本用法

\`\`\`tsx
import { useDeepCompareMemo } from '@vainjs/hooks';

const memoizedValue = useDeepCompareMemo(() => {
  // 只有当 deps 的内容真正变化时才会重新计算
  return computeExpensiveValue(a, b);
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
          '这个例子展示了 `useDeepCompareMemo` 与普通 `useMemo` 的区别。当对象引用变化但内容相同时，普通的 `useMemo` 会重新计算，而 `useDeepCompareMemo` 不会。',
      },
    },
  },
}
