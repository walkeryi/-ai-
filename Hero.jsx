import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Users, Vote, Brain } from 'lucide-react'
import wuhanCampusImage from '../assets/search_images/2ZyUAdQa0RS8.jpeg'

const Hero = () => {
  const stats = [
    { icon: Calendar, label: '事件天数', value: '730+', color: 'text-blue-500' },
    { icon: Users, label: '关注人数', value: '100万+', color: 'text-green-500' },
    { icon: Vote, label: '参与投票', value: '50万+', color: 'text-purple-500' },
    { icon: Brain, label: 'AI分析', value: '24/7', color: 'text-orange-500' }
  ]

  const quickActions = [
    {
      title: '事件时间线',
      description: '完整梳理事件发展脉络',
      icon: Calendar,
      href: '#timeline',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: '人物关系图',
      description: '可视化展示关键人物关系',
      icon: Users,
      href: '#relationships',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: '投票站队',
      description: '参与话题讨论和观点投票',
      icon: Vote,
      href: '#voting',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wuhanCampusImage})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            武汉大学图书馆事件
          </h1>
          <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6">
            完整追踪 · 深度分析 · 理性讨论
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            从2023年7月的图书馆冲突到2025年7月的司法判决，全景展现事件发展脉络，
            理性分析争议焦点，促进社会深度思考
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-300 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3"
          >
            开始探索事件
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
          >
            查看最新进展
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

