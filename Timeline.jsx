import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ExternalLink, MessageCircle, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react'

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [filter, setFilter] = useState('all')

  const timelineEvents = [
    {
      id: 1,
      date: '2023年7月',
      title: '图书馆冲突事件发生',
      type: 'incident',
      importance: 'high',
      summary: '杨某某在武汉大学图书馆拍摄肖某某抓挠视频，指控其进行"隔空性骚扰"',
      details: '女生杨某某在图书馆自习期间，拍摄了对面男生肖某某抓挠大腿根部的视频片段，随后指控其进行"隔空性骚扰"，并要求肖某某当场写下道歉信。',
      sources: ['武汉大学官网', '当事人社交媒体'],
      reactions: { likes: 1200, comments: 856, shares: 432 }
    },
    {
      id: 2,
      date: '2023年7月（48小时后）',
      title: '校方快速处分决定',
      type: 'official',
      importance: 'high',
      summary: '武汉大学在舆论压力下对肖某某作出记过处分',
      details: '在舆论压力下，武汉大学校方仅用48小时就作出行政决定，以"存在不雅行为"为由对肖某某处以记过处分，处分通报在官网点击量超过12万次。',
      sources: ['武汉大学官方通报'],
      reactions: { likes: 890, comments: 1234, shares: 567 }
    },
    {
      id: 3,
      date: '2023年10月',
      title: '保研资格被取消',
      type: 'consequence',
      importance: 'high',
      summary: '肖某某因处分被取消保研及法考资格',
      details: '肖某某因处分被取消保研及法考资格，遭受网络暴力导致确诊创伤后应激障碍（临床评估自杀风险达80%）。网暴波及家人，其祖父因受刺激离世，外公成为植物人。',
      sources: ['医院诊断证明', '家属证言'],
      reactions: { likes: 2340, comments: 1876, shares: 1123 }
    },
    {
      id: 4,
      date: '2025年7月25日',
      title: '法院一审判决',
      type: 'legal',
      importance: 'critical',
      summary: '武汉市经开区法院判决肖某某行为不构成性骚扰',
      details: '武汉市经开区法院对该案作出一审判决，彻底反转事件定性。法院基于医学证据认定：肖某某的动作系因"特异性皮炎湿疹"引发的生理性抓痒，无任何性意图；驳回杨某某的全部诉讼请求。',
      sources: ['法院判决书', '医学证据'],
      reactions: { likes: 5670, comments: 3421, shares: 2890 }
    },
    {
      id: 5,
      date: '2025年8月1日',
      title: '校方组建工作专班',
      type: 'official',
      importance: 'medium',
      summary: '武汉大学宣布组建工作专班复核事件',
      details: '在胡锡进等公众人物及3000余名校友联名施压下，校方宣布组建工作专班，复核两项内容：①肖某某纪律处分的合理性；②杨某某硕士论文的学术不端嫌疑。',
      sources: ['武汉大学官方声明'],
      reactions: { likes: 3450, comments: 2100, shares: 1567 }
    }
  ]

  const eventTypes = [
    { id: 'all', label: '全部事件', color: 'bg-gray-500' },
    { id: 'incident', label: '事件发生', color: 'bg-red-500' },
    { id: 'official', label: '官方回应', color: 'bg-blue-500' },
    { id: 'legal', label: '司法程序', color: 'bg-green-500' },
    { id: 'consequence', label: '后续影响', color: 'bg-purple-500' }
  ]

  const filteredEvents = filter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.type === filter)

  const getEventColor = (type) => {
    const colors = {
      incident: 'border-red-500 bg-red-50 dark:bg-red-950',
      official: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
      legal: 'border-green-500 bg-green-50 dark:bg-green-950',
      consequence: 'border-purple-500 bg-purple-50 dark:bg-purple-950'
    }
    return colors[type] || 'border-gray-500 bg-gray-50 dark:bg-gray-950'
  }

  const getImportanceBadge = (importance) => {
    const variants = {
      critical: 'destructive',
      high: 'default',
      medium: 'secondary'
    }
    const labels = {
      critical: '关键',
      high: '重要',
      medium: '一般'
    }
    return { variant: variants[importance], label: labels[importance] }
  }

  return (
    <section id="timeline" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">事件时间线</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            完整梳理武汉大学图书馆事件的发展脉络，从最初的冲突到最终的司法判决
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {eventTypes.map((type) => (
            <Button
              key={type.id}
              variant={filter === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type.id)}
              className="flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
              {type.label}
            </Button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>

          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-background transform md:-translate-x-1/2 ${
                event.type === 'critical' ? 'bg-red-500' :
                event.type === 'legal' ? 'bg-green-500' :
                event.type === 'official' ? 'bg-blue-500' :
                event.type === 'incident' ? 'bg-red-500' : 'bg-purple-500'
              }`}></div>

              <Card className={`ml-12 md:ml-0 md:w-96 ${getEventColor(event.type)} border-l-4`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <Badge {...getImportanceBadge(event.importance)}>
                      {getImportanceBadge(event.importance).label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.summary}</p>
                  
                  {expandedEvent === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-sm leading-relaxed">{event.details}</p>
                      
                      <div>
                        <h4 className="font-semibold mb-2">信息来源：</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.sources.map((source, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {event.reactions.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {event.reactions.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {event.reactions.shares}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedEvent(
                        expandedEvent === event.id ? null : event.id
                      )}
                    >
                      {expandedEvent === event.id ? (
                        <>收起 <ChevronUp className="w-4 h-4 ml-1" /></>
                      ) : (
                        <>详情 <ChevronDown className="w-4 h-4 ml-1" /></>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

