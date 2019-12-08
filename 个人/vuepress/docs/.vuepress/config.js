module.exports = {
  title: '小奶鑫的主页', 
  description: '冀光鑫的博客',
  // 其它配置
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    search: true,
    searchMaxSuggestions: 10,
    nav: [
      { text: '首页', link: '/' },
      { text:'面试基础',link:'/Interview/' },
      { text: '前端三剑客', items: [
        { text: 'HTML', link: '/HTML/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' }
      ]},
      { text: '计算机基础', items:[
        { text: '编译原理', link: '/EditPrinciple/' },
        { text: 'http原理', link: '/Http/' },
        { text: '设计模式', link: '/DesignModle/' }
      ]},
      { text:'数据结构和算法',items:[
        { text: '手写前端方法', link: '/HandFunction/' },
        { text: '数据结构', link: '/DataStructure/' },
        { text: '算法', link: '/algorithm/' }
       ]},
      { text:'运行环境',items:[
        { text: '浏览器的API', link: '/BrowserApi/' },
        { text: '浏览器的缓存原理', link: '/BrowserPrinciple/' },
        { text: 'Node', link: '/Node/' }
      ]},
      { text:'框架和类库',items:[
        { text: 'react', link: '/React/' },
        { text: 'vue', link: '/Vue/' },
        { text: '多端开发', link: '/MoreDevelopment/' },
        { text: 'ES6', link: '/ES6/' },
        { text: '开发和调试', link: '/DeBugs/' }
      ]},
      { text:'前端工程',items:[
        { text: 'webpack', link: '/webpack/' },
        { text: 'Git', link: '/Git/' },
        { text: 'nginx', link: '/nginx/' },
        { text: '性能提升', link: '/UpPerformance/' },
      ]},
      { text:'前端安全',items:[
        { text: 'xss', link: '/Xss/' },
        { text: 'csrf', link: '/Csrf/' },
        { text: 'http劫持', link: '/HttpAttack/' },
      ]},
    ],
    sidebar: {
      '/Interview/': [
        '',      /* /bar/ */
        'optimize',      
      ],
      '/HTML/': [
        '',     /* /foo/ */
      ],

      '/CSS/': [
        '',      /* /bar/ */
      ],
      '/JavaScript/': [
        '',      /* /bar/ */
        'a', /* /bar/three.html */
      ],
      '/EditPrinciple/': [
        '',     /* /foo/ */
      ],

      '/Http/': [
        '',      /* /bar/ */
      ],
      '/Http/': [
        '',      /* /bar/ */
        'httpInterview'
      ],
      '/DesignModle/': [
        '',      /* /bar/ */
      ],
      '/HandFunction/': [
        '',     /* /foo/ */
      ],

      '/DataStructure/': [
        '',      /* /bar/ */
      ],
      '/algorithm/': [
        '',      /* /bar/ */
      ],
      '/BrowserApi/': [
        '',     /* /foo/ */
      ],

      '/BrowserPrinciple/': [
        '',      /* /bar/ */
      ],
      '/Node/': [
        '',      /* /bar/ */
      ],
      '/React/': [
        '',     /* /foo/ */
      ],
      '/Vue/': [
        '',      /* /bar/ */
        'vueOne'
      ],
      '/MoreDevelopment/': [
        '',      /* /bar/ */
      ],
      '/ES6/': [
        '',      /* /bar/ */
      ],
      '/DeBugs/': [
        '',      /* /bar/ */
      ],
      '/webpack/': [
        '',      /* /bar/ */
      ],
      '/Git/': [
        '',      /* /bar/ */
      ],
      '/nginx/': [
        '',      /* /bar/ */
      ],
      '/UpPerformance/': [
        '',      /* /bar/ */
      ],
      '/Xss/': [
        '',      /* /bar/ */
      ],
      '/Csrf/': [
        '',      /* /bar/ */
      ],
      '/HttpAttack/': [
        '',      /* /bar/ */
      ],
    }
  }
}