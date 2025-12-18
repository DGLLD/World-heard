const fetch = require('node-fetch');
const AbortController = require('abort-controller');
const { url } = require('./sina.js');
const Feed = require('feed').Feed;
const fs = require('fs/promises');
const process = require('process');

const controller = new AbortController();
// 30 秒后取消请求
const timeout = setTimeout(
  () => { controller.abort(); },
  30000,
);

const feed = new Feed({
  title: 'World Heard - 全球财经新闻',
  description: '汇集全球重要财经资讯，为您提供最新的市场动态',
  link: 'https://sina-news.vercel.app/',
  language: 'zh-CN',
  generator: 'World Heard News Generator',
  feedLinks: {
    json: 'https://sina-news.vercel.app/rss.json',
    rss: 'https://sina-news.vercel.app/rss.xml'
  },
});


const filterArr = [
  '比特币',
  '以太坊',
  '莱特币',
  '瑞波币',
  '疫苗',
  '疫情',
  '新冠',
  '央行',
  '联储',
  '中央银行',
  '财长',
  '财政部',
  '参议院',
  '众议院',
];

async function main() {

    const response = await fetch(url, {
      headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130'},
      signal: controller.signal
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error('wrong status code');
    }

    const json = await response.json();
    console.log(`✅ 成功获取新浪财经数据`);

    const result = json.result || {};
    if (!result.status || result.status.code !== 0) return;
    const items = result.data.feed.list;
    console.log(`✅ 成功解析数据，共 ${items.length} 条新闻`);

    let addedCount = 0;
    
    items.forEach(item => {
      if (!item.rich_text) return;

      // text filter
      for (let i = 0; i < filterArr.length; i++) {
        if (item.rich_text.includes(filterArr[i])) {
          return;
        }
      }

      // tag filter
      if (item.tag && Array.isArray(item.tag) && item.tag.length) {
        const tags = item.tag;
        const tagFilterArr = ['5', '6', '7', '9'];
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i].id;
          if (tagFilterArr.includes(tag)) {
            return;
          }
        }
      }

      feed.addItem({
        title: item.rich_text,
        id: item.id,
        link: item.docurl,
        content: '',
        date: new Date(item.create_time + '+08:00'),
      });
      
      addedCount++;
    });
    
    console.log(`✅ 生成RSS Feed，包含 ${addedCount} 条新闻`);

    try {
      await fs.access('./dist', fs.constants.R_OK | fs.constants.W_OK);
      await fs.rm('./dist', { recursive: true });
      console.log(`✅ 清理旧的dist目录`);
    } catch {
      // 目录不存在，无需处理
    }

    await fs.mkdir('./dist');
    console.log(`✅ 创建dist目录`);

    await fs.writeFile('./dist/rss.json', feed.json1());
    console.log(`✅ 生成rss.json`);

    await fs.writeFile('./dist/rss.xml', feed.rss2());
    console.log(`✅ 生成rss.xml`);

    await fs.copyFile('./template/index.html', `./dist/index.html`);
    console.log(`✅ 复制HTML模板`);

    console.log(`🎉 所有文件已成功生成！`);
    console.log(`📊 总计新闻: ${addedCount} 条`);
    console.log(`⏰ 生成时间: ${new Date().toLocaleString('zh-CN')}`);

}

main()
.catch(err => {
  console.log('❌ 处理失败:', err);
  process.exit(1);
})
.finally(() => {
  clearTimeout(timeout);
});

