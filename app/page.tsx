"use client"

import { useState } from "react"
import { Plus, Flame, Timer, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { QuickRecordModal } from "@/components/quick-record-modal"

const todayWorkouts = [
  { name: "俯卧撑", sets: 3, reps: 15, icon: "💪" },
  { name: "深蹲", sets: 4, reps: 20, icon: "🦵" },
  { name: "平板支撑", sets: 3, reps: 60, unit: "秒", icon: "🧘" },
]

const stats = [
  { label: "本周训练", value: "5", unit: "天", icon: Flame, color: "text-orange-500" },
  { label: "今日时长", value: "45", unit: "分钟", icon: Timer, color: "text-primary" },
  { label: "完成目标", value: "85", unit: "%", icon: Target, color: "text-green-500" },
  { label: "连续打卡", value: "12", unit: "天", icon: TrendingUp, color: "text-primary" },
]

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary px-4 pb-8 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold">AI健身助手</h1>
          <p className="mt-1 text-primary-foreground/80">今天也要加油运动哦</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="mx-auto max-w-lg px-4">
        <div className="-mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-md">
              <CardContent className="flex flex-col items-center p-4">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                </div>
                <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Training */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">今日训练</CardTitle>
            <span className="text-sm text-muted-foreground">
              已完成 2/{todayWorkouts.length}
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayWorkouts.map((workout, index) => (
              <div
                key={workout.name}
                className={`flex items-center justify-between rounded-xl p-4 transition-colors ${
                  index < 2 ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{workout.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {workout.sets}组 x {workout.reps}
                      {workout.unit || "个"}
                    </p>
                  </div>
                </div>
                <div
                  className={`h-6 w-6 rounded-full border-2 ${
                    index < 2
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  } flex items-center justify-center`}
                >
                  {index < 2 && (
                    <svg
                      className="h-4 w-4 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Record Button */}
        <Button
          onClick={() => setModalOpen(true)}
          size="lg"
          className="mt-6 w-full gap-2 rounded-xl py-6 text-base font-semibold shadow-lg"
        >
          <Plus className="h-5 w-5" />
          快速记录
        </Button>
      </div>

      <QuickRecordModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <BottomNav />
    </main>
  )
}
