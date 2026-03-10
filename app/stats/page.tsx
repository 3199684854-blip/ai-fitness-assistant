"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { Sparkles, TrendingUp, Activity } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts"

const weeklyData = (() => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const data = []
  const exerciseNames = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + mondayOffset + i)

    // 不显示今天之后的数据
    if (date > today) {
      data.push({ name: exerciseNames[i], duration: 0, exercises: 0 })
      continue
    }

    // 用日期作为种子生成相对稳定的数据
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    const duration = (seed % 90) + 10
    const exercises = Math.floor(duration / 15) + 1

    data.push({ name: exerciseNames[i], duration, exercises })
  }

  return data
})()

const progressData = (() => {
  const today = new Date()
  const weeks: { week: string; pushups: number; squats: number; plank: number }[] = []

  // 计算过去6周的数据
  for (let i = 5; i >= 0; i--) {
    const weekEnd = new Date(today)
    weekEnd.setDate(today.getDate() - i * 7)
    const weekNum = 6 - i

    // 用周数作为种子
    const seed = weekNum * 7

    weeks.push({
      week: `第${weekNum}周`,
      pushups: 10 + seed + Math.floor(i / 2) * 2,
      squats: 15 + seed + Math.floor(i / 2) * 3,
      plank: 30 + seed * 2 + i * 5,
    })
  }

  return weeks
})()

const aiComments = [
  {
    title: "训练表现出色",
    content: "本周你的训练频率非常稳定，坚持了6天的锻炼计划。相比上周，总训练时长增加了15%，这是非常好的进步！",
  },
  {
    title: "力量提升建议",
    content: "根据数据分析，你的俯卧撑次数在过去6周内提升了100%。建议下周可以尝试增加组数或者尝试更有挑战性的变式动作。",
  },
  {
    title: "休息恢复提醒",
    content: "注意到你周三没有安排训练，这是很好的休息策略。建议保持每周1-2天的休息日，让肌肉得到充分恢复。",
  },
]

export default function StatsPage() {
  // 动态计算本周数据
  const weeklyTotal = weeklyData.reduce((sum, d) => sum + d.duration, 0)
  const lastWeekData = weeklyData.slice(0, 6).reduce((sum, d) => sum + d.duration, 0)
  const weekGrowth = lastWeekData > 0 ? Math.round(((weeklyTotal - lastWeekData) / lastWeekData) * 100) : 0
  const totalExercises = progressData.reduce((sum, w) => sum + w.pushups + w.squats, 0)
  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="bg-primary px-4 pb-6 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="text-xl font-bold">训练统计</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">
            数据驱动，科学健身
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4">
        <div className="-mt-4 grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Activity className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-2xl font-bold text-foreground">{weeklyTotal}</p>
              <p className="text-xs text-muted-foreground">本周时长(分)</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto h-6 w-6 text-green-500" />
              <p className="mt-2 text-2xl font-bold text-foreground">{weekGrowth > 0 ? '+' : ''}{weekGrowth}%</p>
              <p className="text-xs text-muted-foreground">周环比增长</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-orange-500" />
              <p className="mt-2 text-2xl font-bold text-foreground">{totalExercises}</p>
              <p className="text-xs text-muted-foreground">运动项目</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-0 shadow-md overflow-visible">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">训练概况</CardTitle>
          </CardHeader>
          <CardContent className="overflow-visible">
            <div className="h-48 overflow-visible">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                    wrapperStyle={{ position: "absolute", top: "0px" }}
                  />
                  <Bar
                    dataKey="duration"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="时长(分钟)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-0 shadow-md overflow-visible">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">进步曲线</CardTitle>
          </CardHeader>
          <CardContent className="overflow-visible">
            <div className="h-48 overflow-visible">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    cursor={{ stroke: "hsl(var(--muted-foreground))" }}
                    wrapperStyle={{ position: "absolute", top: "0px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pushups"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    name="俯卧撑(个)"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="squats"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", r: 4 }}
                    name="深蹲(个)"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="plank"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ fill: "#f97316", r: 4 }}
                    name="平板支撑(秒)"
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#8b5cf6]" />
                <span className="text-xs text-muted-foreground">俯卧撑</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#06b6d4]" />
                <span className="text-xs text-muted-foreground">深蹲</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#f97316]" />
                <span className="text-xs text-muted-foreground">平板支撑</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Sparkles className="h-5 w-5 text-primary" />
              AI点评
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiComments.map((comment, index) => (
              <div
                key={index}
                className="rounded-xl bg-primary/5 p-4"
              >
                <h4 className="font-medium text-foreground">{comment.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {comment.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </main>
  )
}
