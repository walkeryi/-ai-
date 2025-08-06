import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Filter, 
  Download, 
  Bookmark, 
  Calendar,
  Gavel,
  Newspaper,
  MessageSquare,
  BarChart3,
  Star
} from 'lucide-react'

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [bookmarked, setBookmarked] = useState(new Set())

  const resources = {
    official: [
      {
        id: 'court-verdict',
        title: '武汉市经开区法院一审判决书',
        description: '法院对肖某某诉杨某某性骚扰案的完整判决文书',
        type: 'legal',
        date: '2025-07-25',
        source: '武汉市经开区法院',
        url: '#',
        importance: 'critical',
        tags: ['司法判决', '性骚扰', '证据认定']
      },
      {
        id: 'school-notice',
        title: '武汉大学关于肖某某处分的通报',
        description: '校方对肖某某"不雅行为"的处分决定通报',
        type: 'official',
        date: '2023-07-27',
        source: '武汉大学',
        url: '#',
        importance: 'high',
        tags: ['校方通报', '纪律处分', '学生管理']
      },
      {
        id: 'workgroup-announcement',
        title: '武汉大学工作专班成立公告',
        description: '校方宣布组建专班复核肖某某处分和杨某某论文问题',
        type: 'official',
        date: '2025-08-01',
        source: '武汉大学',
        url: '#',
        importance: 'high',
        tags: ['工作专班', '复核调查', '学术诚信']
      }
    ],
    media: [
      {
        id: 'huxijin-comment',
        title: '胡锡进：武汉大学应该勇敢纠错',
        description: '知名媒体人胡锡进对事件的评论和建议',
        type: 'opinion',
        date: '2025-07-26',
        source: '胡锡进微博',
        url: '#',
        importance: 'medium',
        tags: ['媒体评论', '纠错建议', '公信力']
      },
      {
        id: 'youth-daily',
        title: '中国青年报：程序正义何在？',
        description: '官方媒体对校方处理程序的质疑',
        type: 'news',
        date: '2025-07-27',
        source: '中国青年报',
        url: '#',
        importance: 'high',
        tags: ['程序正义', '媒体监督', '教育治理']
      },
      {
        id: 'legal-analysis',
        title: '法律专家解读：性骚扰认定的法律标准',
        description: '专业人士对案件涉及法律问题的深度分析',
        type: 'analysis',
        date: '2025-07-28',
        source: '法制日报',
        url: '#',
        importance: 'high',
        tags: ['法律解读', '专家观点', '性骚扰认定']
      }
    ],
    social: [
      {
        id: 'weibo-trending',
        title: '微博热搜话题汇总',
        description: '事件相关的微博热搜话题和讨论摘要',
        type: 'social',
        date: '2025-07-25',
        source: '微博',
        url: '#',
        importance: 'medium',
        tags: ['社交媒体', '热搜话题', '网络讨论']
      },
      {
        id: 'zhihu-discussion',
        title: '知乎高赞回答精选',
        description: '知乎平台上关于事件的高质量讨论和分析',
        type: 'discussion',
        date: '2025-07-26',
        source: '知乎',
        url: '#',
        importance: 'medium',
        tags: ['深度讨论', '理性分析', '多元观点']
      },
      {
        id: 'alumni-petition',
        title: '武大校友联名信',
        description: '3000余名校友要求校方纠错的联名信',
        type: 'petition',
        date: '2025-07-30',
        source: '武大校友会',
        url: '#',
        importance: 'high',
        tags: ['校友联名', '施压纠错', '学校声誉']
      }
    ],
    data: [
      {
        id: 'sentiment-chart',
        title: '舆情变化趋势图',
        description: '事件发生以来网络舆情的变化趋势分析',
        type: 'chart',
        date: '2025-08-01',
        source: 'AI分析系统',
        url: '#',
        importance: 'medium',
        tags: ['数据可视化', '舆情分析', '趋势变化']
      },
      {
        id: 'keyword-cloud',
        title: '关键词词云图',
        description: '事件讨论中的高频关键词可视化',
        type: 'visualization',
        date: '2025-08-01',
        source: 'AI分析系统',
        url: '#',
        importance: 'medium',
        tags: ['词云分析', '关键词', '话题热度']
      },
      {
        id: 'timeline-data',
        title: '事件时间线数据',
        description: '完整的事件发展时间线和关键节点数据',
        type: 'dataset',
        date: '2025-08-01',
        source: '综合整理',
        url: '#',
        importance: 'high',
        tags: ['时间线', '事件节点', '数据整理']
      }
    ]
  }

  const categories = [
    { id: 'all', label: '全部资料', icon: FileText },
    { id: 'official', label: '官方文件', icon: Gavel },
    { id: 'media', label: '媒体报道', icon: Newspaper },
    { id: 'social', label: '网络讨论', icon: MessageSquare },
    { id: 'data', label: '数据图表', icon: BarChart3 }
  ]

  const getAllResources = () => {
    return Object.values(resources).flat()
  }

  const getFilteredResources = () => {
    let filtered = selectedCategory === 'all' 
      ? getAllResources() 
      : resources[selectedCategory] || []

    if (searchQuery) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered
  }

  const getImportanceColor = (importance) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
    return colors[importance] || colors.medium
  }

  const getTypeIcon = (type) => {
    const icons = {
      legal: Gavel,
      official: FileText,
      news: Newspaper,
      opinion: MessageSquare,
      analysis: BarChart3,
      social: MessageSquare,
      discussion: MessageSquare,
      petition: FileText,
      chart: BarChart3,
      visualization: BarChart3,
      dataset: FileText
    }
    return icons[type] || FileText
  }

  const toggleBookmark = (resourceId) => {
    setBookmarked(prev => {
      const newSet = new Set(prev)
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId)
      } else {
        newSet.add(resourceId)
      }
      return newSet
    })
  }

  const filteredResources = getFilteredResources()

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">资料库</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            收录事件相关的官方文件、媒体报道、网络讨论和数据分析，为深入了解提供全面资料
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜索资料标题、内容或标签..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    批量下载
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {React.createElement(category.icon, { className: 'w-4 h-4' })}
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {React.createElement(getTypeIcon(resource.type), { className: 'w-4 h-4 text-blue-500' })}
                            <Badge className={getImportanceColor(resource.importance)}>
                              {resource.importance === 'critical' ? '关键' :
                               resource.importance === 'high' ? '重要' : '一般'}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleBookmark(resource.id)}
                            className="w-8 h-8"
                          >
                            <Bookmark 
                              className={`w-4 h-4 ${
                                bookmarked.has(resource.id) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                        </div>
                        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                          <Calendar className="w-3 h-3" />
                          <span>{resource.date}</span>
                          <span>•</span>
                          <span>{resource.source}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            查看
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">没有找到匹配的资料</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    尝试调整搜索关键词或选择其他分类
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Resource Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>资料库统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {resources.official.length}
                  </div>
                  <div className="text-sm text-muted-foreground">官方文件</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {resources.media.length}
                  </div>
                  <div className="text-sm text-muted-foreground">媒体报道</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {resources.social.length}
                  </div>
                  <div className="text-sm text-muted-foreground">网络讨论</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {resources.data.length}
                  </div>
                  <div className="text-sm text-muted-foreground">数据图表</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  资料库持续更新中，如有重要资料遗漏，欢迎提供线索
                </p>
                <Button variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  推荐资料
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default ResourceLibrary

