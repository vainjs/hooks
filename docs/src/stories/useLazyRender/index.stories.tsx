import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useLazyRender',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useLazyRender\` 是一个用于懒加载和分批渲染大量数据的自定义 Hook，它结合了 Intersection Observer API 来实现基于视口的懒加载，只有当指定的目标元素进入视口时才会加载更多数据。

### 使用场景

- 长列表或无限滚动列表的实现
- 图片或内容的懒加载
- 优化初始加载性能
- 结合虚拟滚动技术处理超大数据集

### 基本用法

\`\`\`tsx
import { useLazyRender } from '@vainjs/hooks';
import { useRef } from 'react';

const MyComponent = () => {
  // 创建一个引用，指向触发懒加载的元素
  const bottomRef = useRef(null);
  
  // 准备数据源
  const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    name: \`Item \${index}\`,
    // 其他属性...
  }));
  
  // 使用 useLazyRender 懒加载数据
  const { dataSource: renderedData } = useLazyRender({
    target: bottomRef, // 当这个元素进入视口时，加载更多数据
    dataSource: largeDataset,
    limit: 50, // 每批次加载 50 项
  });
  
  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {/* 渲染已加载的数据 */}
      {renderedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      {/* 当这个元素进入视口时，会触发加载更多数据 */}
      <div ref={bottomRef} />
    </div>
  );
};
\`\`\`

### 参数

\`useLazyRender\` 接受一个配置对象，包含以下属性：

- \`target\`: 触发懒加载的目标元素，可以是 React ref、DOM 元素或返回 DOM 元素的函数
- \`dataSource\`: 要渲染的完整数据源数组
- \`limit\`: 可选，每批次加载的项目数量，默认为 50

### 返回值

- \`dataSource\`: 当前已加载的数据项数组，随着目标元素进入视口会逐渐增加
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
          '这个例子展示了如何使用 `useLazyRender` 结合虚拟滚动技术来高效渲染大型列表。虚拟滚动确保只渲染可见区域内的项，而 useLazyRender 则随着滚动逐步加载更多数据，两者结合可以处理非常大的数据集而不影响性能。',
      },
    },
  },
}
