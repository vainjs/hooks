import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useWaterfallFlow',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useWaterfallFlow\` 是一个自定义 Hook，用于实现瀑布流布局。瀑布流是一种常见的布局方式，特别适用于展示不同高度的内容，如图片墙、商品列表等。

### 使用场景

- 图片墙或图片展示
- 商品列表
- 卡片布局
- 任何需要按列排列且高度不一的内容

### 基本用法

\`\`\`tsx
import { useWaterfallFlow } from '@vainjs/hooks';
import { useRef } from 'react';

const MyComponent = () => {
  const containerRef = useRef(null);
  
  const { targetStyle, childNodeStyles } = useWaterfallFlow(containerRef, {
    width: 200, // 每列的宽度
    gap: 16,    // 项目之间的间距
    attribute: 'data-key', // 用于标识每个项目的属性
  });
  
  return (
    <div ref={containerRef} style={targetStyle}>
      {items.map(item => {
        const style = childNodeStyles.get(item.id);
        return (
          <div
            key={item.id}
            data-key={item.id}
            style={style}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
\`\`\`

### 参数

- \`target\`: 瀑布流容器的引用（可以是 ref、DOM 元素或返回 DOM 元素的函数）
- \`options\`: 配置选项（可选）
  - \`width\`: 每列的宽度（默认为 320px）
  - \`gap\`: 项目之间的间距（默认为 16px）
  - \`attribute\`: 用于标识每个项目的属性（默认为 'data-key'）

### 返回值

- \`targetStyle\`: 应用于容器元素的样式
- \`childNodeStyles\`: 一个 Map，包含每个子元素的样式，使用 attribute 指定的属性值作为键
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
          '这个例子展示了如何使用 `useWaterfallFlow` 来创建瀑布流布局。你可以添加、删除或重新排序项目，并观察布局如何自动调整。尝试调整浏览器窗口大小，观察布局如何响应变化。',
      },
    },
  },
}
