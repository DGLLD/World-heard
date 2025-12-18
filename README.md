# 🌍 World-heard — 全球实时新闻聚合平台

> 基于 **Ruan YiFeng** 的开源项目 [sina-news](https://github.com/ruanyf/sina-news) 二次开发  
> 在保留原始数据结构的基础上，全面升级交互体验，新增智能分类、关键词搜索、响应式布局等核心功能

[![在线预览](https://img.shields.io/badge/在线预览-已部署-brightgreen?logo=github)](https://dglld.github.io/World-heard/)

---

## 🙏 致谢

本项目初始代码与数据解析逻辑源自 **Ruan YiFeng** 的开源作品：  
👉 [https://github.com/ruanyf/sina-news](https://github.com/ruanyf/sina-news)

衷心感谢 Ruan YiFeng 为开发者社区提供的高质量示例项目。本作品在其基础上进行功能扩展与用户体验优化，仅用于学习与教学演示。

> ⚠️ 本项目不用于商业用途。新闻数据模拟自新浪财经 7×24 小时快讯，版权归属原网站所有。

---

## 🌐 在线访问

✅ 项目已部署至 GitHub Pages，支持桌面端与移动端无缝浏览：

🔗 **[https://dglld.github.io/World-heard/](https://dglld.github.io/World-heard/)**

📱 手机用户：直接在浏览器（如 Safari、Chrome）中打开链接即可体验完整功能。

---

## ✨ 主要增强功能（对比原项目）

| 功能 | 原始项目 | 本项目 |
|------|--------|--------|
| 新闻展示 | 简单单列列表 | 卡片式布局 + 圆角阴影 + 悬停动效 |
| 新闻分类 | ❌ 无 | ✅ 自动按关键词分为财经、政治、军事、科技、体育、企业等类别 |
| 全局搜索 | ❌ 无 | ✅ 支持标题关键词模糊匹配，结果高亮显示 |
| 响应式设计 | ❌ 仅适配桌面 | ✅ 完美适配手机、平板、电脑 |
| 用户反馈 | ❌ 无加载提示 | ✅ 加载动画、空状态提示、网络错误重试机制 |
| 数据统计 | ❌ 无 | ✅ 实时显示总新闻数、各分类数量、最后更新时间 |
| 视觉体验 | 基础样式 | 优化字体、间距、色彩，提升可读性与美观度 |

---

## 🛠 技术栈

- **前端**：HTML5 + CSS3 + JavaScript（无框架依赖）
- **数据源**：静态 `rss.json`（兼容 sina-news 原始格式）
- **分类逻辑**：基于关键词的轻量级语义匹配
- **部署方式**：GitHub Pages（免费静态站点托管）
- **兼容性**：支持现代浏览器（Chrome、Safari、Edge 等）

---

