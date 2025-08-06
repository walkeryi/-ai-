import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Brain, Send, Mic, Download, TrendingUp, BarChart3, MessageSquare, Lightbulb } from 'lucide-react'

const AIAnalysis = () => {
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      content: '您好！我是AI分析助手，可以帮您分析武汉大学图书馆事件的各个方面。您可以询问事件脉络、法律分析、舆情变化等任何相关问题。',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions = [
    '事件的关键转折点是什么？',
    '法院判决的法律依据有哪些？',
    '网络舆情是如何变化的？',
    '校方处理存在哪些问题？',
    '如何预防类似事件发生？',
    '诬告的法律后果是什么？'
  ]

  const analysisReports = [
    {
      id: 'timeline-analysis',
      title: '事件脉络分析',
      description: 'AI深度梳理事件发展的关键节点和因果关系',
      type: 'timeline',
      status: 'completed',
      insights: 8,
      lastUpdated: '2小时前'
    },
    {
      id: 'sentiment-analysis',
      title: '舆情变化分析',
      description: '分析网络舆论的演变趋势和关键转折点',
      type: 'sentiment',
      status: 'completed',
      insights: 12,
      lastUpdated: '1小时前'
    },
    {
      id: 'legal-analysis',
      title: '法律争议分析',
      description: '解析性骚扰认定、诬告责任等法律问题',
      type: 'legal',
      status: 'completed',
      insights: 15,
      lastUpdated: '30分钟前'
    },
    {
      id: 'stakeholder-analysis',
      title: '利益相关方分析',
      description: '分析各方立场、动机和相互关系',
      type: 'stakeholder',
      status: 'processing',
      insights: 6,
      lastUpdated: '正在更新'
    }
  ]

  const trendingTopics = [
    { keyword: '程序正义', mentions: 15420, trend: 'up', change: '+23%' },
    { keyword: '网络暴力', mentions: 12890, trend: 'up', change: '+18%' },
    { keyword: '诬告成本', mentions: 11567, trend: 'up', change: '+31%' },
    { keyword: '学术诚信', mentions: 8934, trend: 'up', change: '+45%' },
    { keyword: '性别议题', mentions: 7821, trend: 'down', change: '-12%' },
    { keyword: '司法公正', mentions: 6745, trend: 'up', change: '+8%' }
  ]

  const handleSendMessage = async () => {
    if (!query.trim()) return

    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    }

    setChatHistory(prev => [...prev, userMessage])
    setIsLoading(true)
    setQuery('')

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: generateAIResponse(query),
        timestamp: new Date().toLocaleTimeString()
      }
      setChatHistory(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question) => {
    const responses = {
      '事件的关键转折点': '根据分析，事件有三个关键转折点：1）2023年7月的初始冲突和校方快速处分；2）2025年7月25日的法院判决，彻底反转事件定性；3）杨某某败诉后的高调回应，引发新一轮舆论风暴。每个转折点都显著改变了公众认知和各方立场。',
      '法院判决的法律依据': '法院判决主要基于《民法典》第1010条性骚扰构成要件：1）行为必须具有"性"属性；2）必须针对特定对象；3）必须违背受害人意愿。医学证据证明肖某某的动作系皮肤病引发的生理反应，不具备性意图，且双方无交流互动，不符合性骚扰的法律要件。',
      '网络舆情': '舆情经历了三个阶段：初期"未审先判"阶段，公众倾向支持杨某某；司法反转期，舆论开始质疑校方处理；制度反思期，讨论转向系统性问题。AI分析显示，舆情转折与关键事件高度相关，体现了网络舆论的易变性和复杂性。'
    }

    // 简单的关键词匹配
    for (const [key, response] of Object.entries(responses)) {
      if (question.includes(key)) {
        return response
      }
    }

    return '这是一个很好的问题。基于现有资料分析，该事件涉及多个复杂层面，包括法律程序、教育管理、网络治理等。建议您查看具体的分析报告获取更详细的信息，或者提出更具体的问题，我可以为您提供更精准的分析。'
  }

  const handleQuickQuestion = (question) => {
    setQuery(question)
  }

  const getReportIcon = (type) => {
    const icons = {
      timeline: BarChart3,
      sentiment: TrendingUp,
      legal: Brain,
      stakeholder: MessageSquare
    }
    return icons[type] || Brain
  }

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
           status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
           'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <section id="ai-analysis" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">AI智能分析</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            运用人工智能技术深度分析事件脉络、舆情变化和争议焦点，为您提供客观理性的洞察
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  AI智能问答
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-80">
                {/* Chat History */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatHistory.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    placeholder="输入您的问题..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6"
            >
              <h3 className="font-semibold mb-3">快速提问</h3>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Analysis Reports */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">分析报告</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {React.createElement(getReportIcon(report.type), { className: 'w-4 h-4 text-blue-500' })}
                        <span className="font-medium text-sm">{report.title}</span>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status === 'completed' ? '已完成' : '处理中'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        {report.insights} 个洞察
                      </span>
                      <span className="text-muted-foreground">{report.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">热门话题</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">{topic.keyword}</span>
                      <div className="text-xs text-muted-foreground">
                        {topic.mentions.toLocaleString()} 次提及
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        topic.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {topic.change}
                      </span>
                      <TrendingUp className={`w-4 h-4 ${
                        topic.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
                      }`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">AI核心洞察</h3>
                <p className="text-muted-foreground">基于大数据分析的关键发现</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">程序正义缺失</h4>
                  <p className="text-sm text-muted-foreground">
                    校方在缺乏充分调查的情况下匆忙处分，体现了程序正义的重要性
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">舆论易变性</h4>
                  <p className="text-sm text-muted-foreground">
                    网络舆论在不同阶段呈现截然不同的态度，反映了信息传播的复杂性
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">制度改革契机</h4>
                  <p className="text-sm text-muted-foreground">
                    事件暴露的问题为高校治理和网络治理提供了改革思路
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Download className="w-4 h-4 mr-2" />
                  下载完整分析报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default AIAnalysis

