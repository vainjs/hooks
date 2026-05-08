import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '.'

const meta = {
  title: 'Hooks/useSearchParams',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 介绍

\`useSearchParams\` 是一个自定义 Hook，用于获取和响应 URL 查询参数的变化。

### 使用场景

- 实现可分享的 URL 状态
- 创建过滤器和搜索功能
- 保存用户偏好设置到 URL
- 实现多步骤表单或向导，其中每个步骤的状态保存在 URL 中

### 基本用法

\`\`\`tsx
import { useSearchParams } from '@vainjs/hooks';

const MyComponent = () => {
  // 指定查询参数的类型
  const [params, updateParams] = useSearchParams<{
    search?: string;
    page?: string;
    filter?: string;
  }>();
  
  // 使用查询参数
  console.log(params.search); // 获取 ?search=xxx 的值
  console.log(params.page);   // 获取 ?page=xxx 的值
  
  // 更新 URL 并通知 hook 更新
  const updateUrl = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', 'new value');
    window.history.pushState({}, '', \`?\${searchParams.toString()}\`);
    updateParams(); // 通知 hook 更新
  };
  
  return (
    <div>
      <p>Search: {params.search || 'None'}</p>
      <p>Page: {params.page || '1'}</p>
      <button onClick={updateUrl}>Update URL</button>
    </div>
  );
};
\`\`\`

### 参数

- \`search\`: 可选参数，指定要解析的查询字符串。如果未提供，将使用 \`window.location.search\`。

### 返回值

- \`[params, update]\`: 一个包含两个元素的数组：
  - \`params\`: 一个对象，包含解析后的查询参数
  - \`update\`: 一个函数，调用它会重新解析当前 URL 的查询参数
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
          '这个例子展示了如何使用 `useSearchParams` 来获取和更新 URL 查询参数。你可以通过表单输入值并点击「更新 URL 参数」按钮来修改 URL，或者点击「清除所有参数」按钮来移除所有查询参数。',
      },
    },
  },
}
