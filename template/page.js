// page.js - World Heard 新闻展示脚本

document.addEventListener('DOMContentLoaded', function() {
    // 显示加载状态
    const loadingState = document.getElementById('loadingState');
    const newsList = document.getElementById('newsList');
    const newsCount = document.getElementById('newsCount');
    const updateTime = document.getElementById('updateTime');
    
    // 获取新闻数据
    fetch('./rss.json')
        .then(async function(response) {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            const res = await response.json();
            return res;
        })
        .then(function(data) {
            // 隐藏加载状态
            loadingState.style.display = 'none';
            
            // 更新统计信息
            const items = data.items || [];
            newsCount.textContent = items.length;
            
            // 设置最后更新时间
            const now = new Date();
            updateTime.textContent = now.toLocaleTimeString('zh-CN', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // 渲染新闻列表
            renderNewsList(items);
        })
        .catch(function(error) {
            console.error('加载新闻数据失败:', error);
            loadingState.innerHTML = `
                <div style="color: #e74c3c; padding: 20px; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <p style="font-size: 16px;">加载新闻失败，请刷新页面重试</p>
                    <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        重新加载
                    </button>
                </div>
            `;
        });
    
    // 渲染新闻列表函数
    function renderNewsList(items) {
        if (!items || items.length === 0) {
            newsList.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px; color: #667eea;"></i>
                    <p style="font-size: 16px;">暂无新闻数据</p>
                </div>
            `;
            return;
        }
        
        // 清空列表
        newsList.innerHTML = '';
        
        // 创建文档片段以提高性能
        const fragment = document.createDocumentFragment();
        
        items.forEach(function(item, index) {
            const li = document.createElement('li');
            li.className = 'news-item';
            
            // 格式化时间
            const timeObj = new Date(item.date_modified || item.date_published || new Date());
            const timeString = timeObj.toLocaleTimeString('zh-CN', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // 生成新闻HTML - 修复结构
            li.innerHTML = `
                <div class="news-content">
                    <h3 class="news-title">${item.title || '无标题'}</h3>
                    <div class="news-meta">
                        <span class="news-time">
                            <i class="far fa-clock"></i>
                            ${timeString}
                        </span>
                        ${item.url ? `
                            <a href="${item.url}" class="news-link" target="_blank" rel="noopener noreferrer">
                                阅读原文
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            fragment.appendChild(li);
        });
        
        // 添加到DOM
        newsList.appendChild(fragment);
    }
    
    // 自动刷新新闻（可选，默认关闭）
    // 每10分钟自动刷新一次
    // setInterval(() => {
    //     location.reload();
    // }, 10 * 60 * 1000);
});
