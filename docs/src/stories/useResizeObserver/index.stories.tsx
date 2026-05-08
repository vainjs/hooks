import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useResizeObserver',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useResizeObserver\` 是一个自定义 Hook，它使用浏览器的 ResizeObserver API 来监测 DOM 元素的大小变化。

### 使用场景

- 响应元素大小变化，调整布局或内容
- 实现自适应组件
- 监测窗口或容器大小变化
- 创建响应式图表或可视化

### 基本用法

\`\`\`tsx
import { useResizeObserver } from '@vainjs/hooks';
import { useRef } from 'react';

const MyComponent = () => {
  const elementRef = useRef(null);
  
  useResizeObserver(
    (entries) => {
      // 当被观察元素的大小变化时调用
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        console.log(\`Element resized to \${width}px × \${height}px\`);
      }
    },
    elementRef,
    { box: 'border-box' } // 可选配置
  );
  
  return <div ref={elementRef}>Resizable Element</div>;
};
\`\`\`

### 参数

- \`fn\`: 当被观察元素的大小变化时调用的回调函数
- \`target\`: 要观察的目标元素（可以是 ref、DOM 元素或返回 DOM 元素的函数）
- \`options\`: ResizeObserver 的配置选项（可选）
  - \`box\`: 指定观察的盒模型，可以是 'content-box'（默认）或 'border-box'
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
          '这个例子展示了如何使用 `useResizeObserver` 来监测元素大小变化。你可以通过拖动元素的右下角或使用按钮来调整元素大小，并实时查看大小变化日志。',
      },
    },
  },
}
