import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart, 
  ExternalLink,
  Shield,
  Info,
  MessageCircle
} from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    about: [
      { label: '关于项目', href: '#' },
      { label: '数据来源', href: '#' },
      { label: '更新日志', href: '#' },
      { label: '联系我们', href: '#' }
    ],
    resources: [
      { label: '官方文件', href: '#resources' },
      { label: '媒体报道', href: '#resources' },
      { label: 'AI分析', href: '#ai-analysis' },
      { label: '数据下载', href: '#' }
    ],
    legal: [
      { label: '使用条款', href: '#' },
      { label: '隐私政策', href: '#' },
      { label: '免责声明', href: '#' },
      { label: '版权信息', href: '#' }
    ],
    social: [
      { label: '微博', href: '#', icon: Twitter },
      { label: '微信群', href: '#', icon: MessageCircle },
      { label: '邮箱', href: '#', icon: Mail },
      { label: 'GitHub', href: '#', icon: Github }
    ]
  }

  const stats = [
    { label: '总访问量', value: '1,234,567' },
    { label: '资料数量', value: '156' },
    { label: '参与讨论', value: '45,678' },
    { label: '最后更新', value: '2小时前' }
  ]

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">武</span>
              </div>
              关于项目
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              本项目致力于客观记录和分析武汉大学图书馆事件，
              通过数据可视化和AI技术，为公众提供理性思考的平台。
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>客观 · 理性 · 透明</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">快速导航</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">资源中心</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">联系我们</h3>
            <div className="space-y-3">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {React.createElement(social.icon, { className: 'w-4 h-4' })}
                  {social.label}
                </a>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-2">订阅更新通知</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="邮箱地址"
                  className="flex-1 px-2 py-1 text-xs border rounded"
                />
                <Button size="sm" className="text-xs">
                  订阅
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-muted/50">
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 武汉大学图书馆事件追踪</span>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              使用条款
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              隐私政策
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for truth and justice</span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t"
        >
          <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    免责声明
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                    本网站所有内容仅供信息参考，不构成法律建议。我们致力于提供客观、准确的信息，
                    但不对内容的完整性、准确性或时效性承担责任。所有观点和分析均基于公开资料，
                    不代表任何官方立场。如有错误或遗漏，欢迎指正。
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

