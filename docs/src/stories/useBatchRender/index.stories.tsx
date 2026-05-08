import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useBatchRender',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useBatchRender\` 是一个用于分批渲染大量数据的自定义 Hook，可以有效避免一次性渲染大量 DOM 元素导致的页面卡顿和性能问题。

### 使用场景

- 渲染包含大量项目的列表或表格
- 初始化包含大量 DOM 元素的复杂界面
- 优化首次加载时的渲染性能
- 处理数据可视化中的大量数据点

### 基本用法

\`\`\`tsx
import { useBatchRender } from '@vainjs/hooks';
import { useEffect } from 'react';

const MyComponent = () => {
  // 准备大量数据
  const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    name: \`Item \${index}\`,
    // 其他属性...
  }));
  
  // 使用 useBatchRender 分批渲染数据
  const { dataSource: renderedData, cleanup } = useBatchRender({
    dataSource: largeDataset,
    limit: 50, // 每批次渲染 50 项
  });
  
  // 当组件卸载或需要重新开始渲染时，调用 cleanup
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
  
  return (
    <div>
      <h2>渲染进度: {renderedData.length} / {largeDataset.length}</h2>
      <ul>
        {renderedData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
\`\`\`

### 参数

\`useBatchRender\` 接受一个配置对象，包含以下属性：

- \`dataSource\`: 要渲染的完整数据源数组
- \`limit\`: 可选，每批次渲染的项目数量，默认为 50

### 返回值

- \`dataSource\`: 当前已渲染的数据项数组，随着渲染进行会逐渐增加
- \`cleanup\`: 清理函数，用于取消未完成的渲染任务，通常在组件卸载时调用
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
          '这个例子展示了如何使用 `useBatchRender` 来分批渲染大量数据。你可以通过调整数据量和每批次渲染数量来观察渲染性能的变化。',
      },
    },
  },
}
