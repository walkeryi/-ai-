import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Vote, TrendingUp, Users, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react'

const VotingSection = () => {
  const [userVotes, setUserVotes] = useState({})
  const [showResults, setShowResults] = useState({})

  const votingTopics = [
    {
      id: 'school-handling',
      title: '你认为校方的处理方式如何？',
      description: '武汉大学在48小时内对肖某某作出记过处分，司法判决后才组建专班复核',
      options: [
        { id: 'appropriate', label: '处理得当，及时回应舆论', votes: 1234, color: 'bg-green-500' },
        { id: 'hasty', label: '过于匆忙，缺乏充分调查', votes: 8765, color: 'bg-red-500' },
        { id: 'delayed', label: '纠错太慢，损害公信力', votes: 5432, color: 'bg-orange-500' },
        { id: 'neutral', label: '情况复杂，可以理解', votes: 2109, color: 'bg-gray-500' }
      ],
      totalVotes: 17540,
      category: 'institutional'
    },
    {
      id: 'court-verdict',
      title: '对法院判决结果的看法？',
      description: '武汉市经开区法院认定肖某某行为不构成性骚扰，驳回杨某某诉讼请求',
      options: [
        { id: 'fair', label: '公正合理，基于事实证据', votes: 12456, color: 'bg-green-500' },
        { id: 'questionable', label: '存在争议，需要上诉', votes: 2134, color: 'bg-yellow-500' },
        { id: 'biased', label: '偏向男性，忽视女性权益', votes: 1876, color: 'bg-red-500' },
        { id: 'complex', label: '案情复杂，难以判断', votes: 3210, color: 'bg-gray-500' }
      ],
      totalVotes: 19676,
      category: 'legal'
    },
    {
      id: 'main-concern',
      title: '你最关注的争议点是什么？',
      description: '这个事件涉及多个层面的问题和争议',
      options: [
        { id: 'false-accusation', label: '诬告成本过低', votes: 6789, color: 'bg-purple-500' },
        { id: 'cyber-violence', label: '网络暴力危害', votes: 5432, color: 'bg-red-500' },
        { id: 'procedure-justice', label: '程序正义缺失', votes: 4321, color: 'bg-blue-500' },
        { id: 'gender-issues', label: '性别议题对立', votes: 3456, color: 'bg-pink-500' },
        { id: 'academic-integrity', label: '学术诚信问题', votes: 2987, color: 'bg-orange-500' }
      ],
      totalVotes: 22985,
      category: 'social'
    },
    {
      id: 'prevention-measures',
      title: '如何预防类似事件发生？',
      description: '从制度和社会层面思考预防措施',
      options: [
        { id: 'education', label: '加强法律和性别教育', votes: 8765, color: 'bg-green-500' },
        { id: 'procedure', label: '完善校园纠纷处理程序', votes: 7654, color: 'bg-blue-500' },
        { id: 'platform', label: '规范网络平台管理', votes: 5432, color: 'bg-orange-500' },
        { id: 'legislation', label: '完善相关法律法规', votes: 6543, color: 'bg-purple-500' },
        { id: 'media', label: '提升媒体素养', votes: 4321, color: 'bg-cyan-500' }
      ],
      totalVotes: 32715,
      category: 'prevention'
    }
  ]

  const handleVote = (topicId, optionId) => {
    setUserVotes(prev => ({
      ...prev,
      [topicId]: optionId
    }))
    setShowResults(prev => ({
      ...prev,
      [topicId]: true
    }))
  }

  const getOptionPercentage = (votes, totalVotes) => {
    return ((votes / totalVotes) * 100).toFixed(1)
  }

  const getCategoryIcon = (category) => {
    const icons = {
      institutional: Users,
      legal: Vote,
      social: MessageSquare,
      prevention: TrendingUp
    }
    return icons[category] || Vote
  }

  const getCategoryColor = (category) => {
    const colors = {
      institutional: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      legal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      prevention: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section id="voting" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">投票站队</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            参与话题讨论，表达你的观点和立场。所有投票均为匿名，结果实时更新
          </p>
        </motion.div>

        {/* Voting Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <Vote className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">92,916</div>
              <div className="text-sm text-muted-foreground">总投票数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">45,678</div>
              <div className="text-sm text-muted-foreground">参与人数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">12,345</div>
              <div className="text-sm text-muted-foreground">讨论评论</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">参与率</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voting Topics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {votingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(topic.category)}>
                      {React.createElement(getCategoryIcon(topic.category), { className: 'w-4 h-4 mr-1' })}
                      {topic.category === 'institutional' ? '机构处理' :
                       topic.category === 'legal' ? '司法判决' :
                       topic.category === 'social' ? '社会争议' : '预防措施'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {topic.totalVotes.toLocaleString()} 票
                    </span>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topic.options.map((option) => {
                      const percentage = getOptionPercentage(option.votes, topic.totalVotes)
                      const isVoted = userVotes[topic.id] === option.id
                      const showResult = showResults[topic.id]
                      
                      return (
                        <div key={option.id} className="space-y-2">
                          <Button
                            variant={isVoted ? 'default' : 'outline'}
                            className={`w-full justify-start h-auto p-3 ${
                              isVoted ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => handleVote(topic.id, option.id)}
                            disabled={showResult}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-left">{option.label}</span>
                              {showResult && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold">{percentage}%</span>
                                  {isVoted && <ThumbsUp className="w-4 h-4" />}
                                </div>
                              )}
                            </div>
                          </Button>
                          
                          {showResult && (
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              transition={{ duration: 0.5 }}
                              className="relative"
                            >
                              <Progress 
                                value={parseFloat(percentage)} 
                                className="h-2"
                              />
                              <div 
                                className={`absolute top-0 left-0 h-2 rounded-full ${option.color} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              />
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  {showResults[topic.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>感谢您的参与！</span>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          查看讨论
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">参与更多讨论</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                您的观点很重要！加入我们的社区讨论，与其他用户分享您的看法，
                共同推动理性对话和社会进步。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  加入讨论社区
                </Button>
                <Button size="lg" variant="outline">
                  分享投票结果
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default VotingSection

