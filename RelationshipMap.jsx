import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, School, Gavel, Users, Filter, Search } from 'lucide-react'

const RelationshipMap = () => {
  const [selectedNode, setSelectedNode] = useState(null)
  const [filter, setFilter] = useState('all')
  const canvasRef = useRef(null)

  const characters = [
    {
      id: 'xiaomou',
      name: '肖某某',
      role: '当事人（被指控方）',
      type: 'student',
      position: { x: 400, y: 300 },
      description: '武汉大学学生，因皮肤病在图书馆抓挠被误解为性骚扰',
      status: '受害者',
      details: '患有特异性皮炎湿疹五年以上，事发时因病情发作进行无意识抓挠。后被取消保研资格，遭受网络暴力，确诊创伤后应激障碍。',
      connections: ['yangmou', 'wuhan-univ', 'court', 'family']
    },
    {
      id: 'yangmou',
      name: '杨某某',
      role: '当事人（指控方）',
      type: 'student',
      position: { x: 200, y: 300 },
      description: '武汉大学学生，拍摄视频并指控肖某某性骚扰',
      status: '指控方',
      details: '在图书馆拍摄肖某某视频并指控其性骚扰，败诉后仍获得保研资格和香港浸会大学博士录取。硕士论文被质疑存在学术不端。',
      connections: ['xiaomou', 'wuhan-univ', 'court', 'hkbu']
    },
    {
      id: 'wuhan-univ',
      name: '武汉大学',
      role: '教育机构',
      type: 'institution',
      position: { x: 300, y: 150 },
      description: '事件发生地和处理机构',
      status: '处理方',
      details: '在舆论压力下48小时内对肖某某作出记过处分，司法判决后组建工作专班复核事件。校长张平文曾表示需"等上级安排"。',
      connections: ['xiaomou', 'yangmou', 'media', 'alumni']
    },
    {
      id: 'court',
      name: '武汉市经开区法院',
      role: '司法机关',
      type: 'legal',
      position: { x: 500, y: 150 },
      description: '审理案件的司法机关',
      status: '判决方',
      details: '2025年7月25日作出一审判决，认定肖某某行为不构成性骚扰，驳回杨某某全部诉讼请求。判决基于医学证据和客观事实。',
      connections: ['xiaomou', 'yangmou', 'legal-experts']
    },
    {
      id: 'media',
      name: '媒体舆论',
      role: '舆论监督',
      type: 'media',
      position: { x: 150, y: 450 },
      description: '报道和评论事件的媒体',
      status: '观察方',
      details: '包括胡锡进、中国青年报等媒体人和机构，在不同阶段发声。初期多支持杨某某，司法判决后转向批评校方处理不当。',
      connections: ['wuhan-univ', 'public', 'legal-experts']
    },
    {
      id: 'family',
      name: '肖某某家属',
      role: '受影响家庭',
      type: 'family',
      position: { x: 600, y: 400 },
      description: '受网络暴力波及的家庭成员',
      status: '受害方',
      details: '祖父因受刺激离世，外公成为植物人。家庭遭受毁灭性打击，成为网络暴力的直接受害者。',
      connections: ['xiaomou', 'public']
    },
    {
      id: 'alumni',
      name: '武大校友',
      role: '关注群体',
      type: 'community',
      position: { x: 100, y: 200 },
      description: '关注事件的武汉大学校友',
      status: '施压方',
      details: '3000余名校友联名要求校方纠错，对学校声誉和处理方式表达不满，推动了工作专班的成立。',
      connections: ['wuhan-univ', 'media']
    },
    {
      id: 'legal-experts',
      name: '法律专家',
      role: '专业解读',
      type: 'expert',
      position: { x: 650, y: 200 },
      description: '提供法律分析的专业人士',
      status: '分析方',
      details: '分析性骚扰构成要件、诬告责任、程序正义等法律问题，为公众理解案件提供专业视角。',
      connections: ['court', 'media', 'public']
    },
    {
      id: 'public',
      name: '网络公众',
      role: '参与讨论',
      type: 'public',
      position: { x: 350, y: 500 },
      description: '参与讨论的网民群体',
      status: '讨论方',
      details: '在不同阶段表现出不同态度，从初期的"网络定罪"到后期的反思网络暴力，体现了舆论的复杂性和易变性。',
      connections: ['media', 'family', 'legal-experts']
    },
    {
      id: 'hkbu',
      name: '香港浸会大学',
      role: '录取院校',
      type: 'institution',
      position: { x: 50, y: 350 },
      description: '杨某某的博士录取院校',
      status: '相关方',
      details: '在杨某某涉嫌诬告和学术造假背景下仍录取其为博士生，引发对精英阶层特权的质疑。回应称"按程序处理"。',
      connections: ['yangmou']
    }
  ]

  const nodeTypes = [
    { id: 'all', label: '全部', color: 'bg-gray-500' },
    { id: 'student', label: '学生', color: 'bg-blue-500' },
    { id: 'institution', label: '机构', color: 'bg-green-500' },
    { id: 'legal', label: '司法', color: 'bg-purple-500' },
    { id: 'media', label: '媒体', color: 'bg-orange-500' },
    { id: 'family', label: '家属', color: 'bg-red-500' },
    { id: 'community', label: '社群', color: 'bg-cyan-500' },
    { id: 'expert', label: '专家', color: 'bg-indigo-500' },
    { id: 'public', label: '公众', color: 'bg-pink-500' }
  ]

  const getNodeColor = (type) => {
    const colors = {
      student: '#3b82f6',
      institution: '#10b981',
      legal: '#8b5cf6',
      media: '#f97316',
      family: '#ef4444',
      community: '#06b6d4',
      expert: '#6366f1',
      public: '#ec4899'
    }
    return colors[type] || '#6b7280'
  }

  const getNodeIcon = (type) => {
    const icons = {
      student: User,
      institution: School,
      legal: Gavel,
      media: Users,
      family: User,
      community: Users,
      expert: User,
      public: Users
    }
    return icons[type] || User
  }

  const filteredCharacters = filter === 'all' 
    ? characters 
    : characters.filter(char => char.type === filter)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    
    filteredCharacters.forEach(char => {
      char.connections?.forEach(connectionId => {
        const target = characters.find(c => c.id === connectionId)
        if (target && filteredCharacters.includes(target)) {
          ctx.beginPath()
          ctx.moveTo(char.position.x, char.position.y)
          ctx.lineTo(target.position.x, target.position.y)
          ctx.stroke()
        }
      })
    })

    // Draw nodes
    filteredCharacters.forEach(char => {
      const isSelected = selectedNode?.id === char.id
      
      ctx.beginPath()
      ctx.arc(char.position.x, char.position.y, isSelected ? 25 : 20, 0, 2 * Math.PI)
      ctx.fillStyle = getNodeColor(char.type)
      ctx.fill()
      
      if (isSelected) {
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.stroke()
      }
    })
  }, [filteredCharacters, selectedNode])

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const clickedNode = filteredCharacters.find(char => {
      const distance = Math.sqrt(
        Math.pow(x - char.position.x, 2) + Math.pow(y - char.position.y, 2)
      )
      return distance <= 25
    })

    setSelectedNode(clickedNode || null)
  }

  return (
    <section id="relationships" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">人物关系图谱</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            可视化展示事件中各方人物的关系网络，点击节点查看详细信息
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {nodeTypes.map((type) => (
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Relationship Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  关系网络图
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <canvas
                  ref={canvasRef}
                  className="w-full h-80 cursor-pointer"
                  onClick={handleCanvasClick}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Character Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  人物详情
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedNode ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: getNodeColor(selectedNode.type) }}
                      >
                        {React.createElement(getNodeIcon(selectedNode.type), { className: 'w-6 h-6' })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedNode.role}</p>
                      </div>
                    </div>
                    
                    <Badge variant="outline">{selectedNode.status}</Badge>
                    
                    <p className="text-sm leading-relaxed">{selectedNode.details}</p>
                    
                    {selectedNode.connections && (
                      <div>
                        <h4 className="font-semibold mb-2">相关联系：</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedNode.connections.map(connId => {
                            const connChar = characters.find(c => c.id === connId)
                            return connChar ? (
                              <Badge key={connId} variant="secondary" className="text-xs">
                                {connChar.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>点击图中的节点查看人物详情</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>图例说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nodeTypes.slice(1).map((type) => (
                  <div key={type.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                    <span className="text-sm">{type.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                连线表示人物之间的关系或互动，节点大小表示在事件中的重要程度
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default RelationshipMap

