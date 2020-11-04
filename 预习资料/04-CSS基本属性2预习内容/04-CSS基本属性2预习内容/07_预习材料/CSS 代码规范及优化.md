<!--
 * @Author: DsCode
 * @Date: 2020-08-03 09:44:50
 * @LastEditors: DsCode
 * @LastEditTime: 2020-08-03 09:51:37
 * @FilePath: \HTML&CSS\CSS选择器.md
-->

# CSS 代码规范及优化

### BEM 命名原则

- block：模块，名字单词间用 - 连接
- element：元素，模块的子元素，以 \_\_ 与 block 连接
- modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接

```css
/* 举个例子 */
.block__element {
}
.block--modifier {
}
```

### 有效使用 css 选择器

选择器嵌套应少于 3 级

```css
/* bad */
.page .header .login #username input {
}

/* good */
#username input {
}
```

有效使用 css 选择器，因遵循以下原则

- 保持简单，不要使用嵌套过多过于复杂的选择器。
- 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。
- 不要使用类选择器和 ID 选择器修饰元素标签。
- 不要为了追求速度而放弃可读性与可维护性
- 避免使用 CSS 表达式

### 慎重选择高消耗的样式

高消耗属性在绘制前需要浏览器进行大量计算：

```css
box-shadows
border-radius
transparency
transforms
CSS filters（性能杀手）
```

### 避免重绘重排

当发生重排的时候，浏览器需要重新计算布局位置与大小，不利于性能优化。

常见引起重绘重排属性和方法

- 添加或者删除可见的 `DOM` 元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在 `input` 框中输入文字
- 浏览器窗口尺寸改变——resize 事件发生时
- 计算 `offsetWidth` 和 `offsetHeight` 属性
- 设置 `style` 属性的值

减少重绘重排的方法

- 使用 `transform` 替代 `top`
- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要把节点的属性值放在一个循环里当成循环里的变量。
- 不要使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`
- CSS 选择符从右往左匹配查找，避免节点层级过多
