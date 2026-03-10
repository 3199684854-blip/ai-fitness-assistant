"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

interface WorkoutRecord {
  id: string
  exercise: string
  sets: number
  reps: number
  minutes: number
  seconds: number
  date: string
}

const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function HistoryPage() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [records, setRecords] = useState<WorkoutRecord[]>([])

  // Load records from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("workoutRecords")
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    }
  }, [])

  // 只统计到今天为止的记录（有数据的日期最多到当日）
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  const recordsUpToToday = records.filter((r) => r.date <= todayStr)

  const workoutDays: Record<string, { count: number; duration: number }> = {}
  recordsUpToToday.forEach((record) => {
    if (!workoutDays[record.date]) {
      workoutDays[record.date] = { count: 0, duration: 0 }
    }
    workoutDays[record.date].count += 1
    workoutDays[record.date].duration += record.minutes + Math.floor(record.seconds / 60)
  })

  // Get records for selected date
  const selectedDateRecords = selectedDate
    ? records.filter((r) => r.date === selectedDate)
    : []

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const goToToday = () => {
    const now = new Date()
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    const now = new Date()
    const maxDate = new Date(now.getFullYear(), now.getMonth(), 1)
    const nextDate = new Date(year, month + 1, 1)
    // 不允许跳转到未来月份
    if (nextDate <= maxDate) {
      setCurrentDate(nextDate)
      setSelectedDate(null)
    }
  }

  const isCurrentMonth = () => {
    return today.getFullYear() === year && today.getMonth() === month
  }

  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(day)
    const hasWorkout = workoutDays[dateKey]
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    const isSelected = selectedDate === dateKey

    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(dateKey)}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors",
          isToday && "font-bold",
          isSelected
            ? "bg-primary text-primary-foreground"
            : hasWorkout
            ? "bg-primary/20 text-primary hover:bg-primary/30"
            : "text-foreground hover:bg-muted"
        )}
      >
        {day}
        {hasWorkout && !isSelected && (
          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
        )}
      </button>
    )
  }

  const selectedWorkout = selectedDate ? workoutDays[selectedDate] : null

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="bg-primary px-4 pb-6 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="text-xl font-bold">训练历史</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">
            查看你的运动记录
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4">
        <Card className="-mt-4 border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {year}年{month + 1}月
                {!isCurrentMonth() && (
                  <button
                    onClick={goToToday}
                    className="text-xs font-normal text-primary hover:underline"
                  >
                    今天
                  </button>
                )}
              </CardTitle>
              <button
                onClick={nextMonth}
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 justify-items-center">
              {days}
            </div>
          </CardContent>
        </Card>

          {selectedDate && (
          <Card className="mt-4 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Flame className={cn("h-5 w-5", selectedWorkout ? "text-orange-500" : "text-muted-foreground")} />
                {selectedDate.replace(/-/g, "/")} 训练详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateRecords.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-primary/10 p-4 text-center">
                      <p className="text-2xl font-bold text-primary">
                        {selectedDateRecords.length}
                      </p>
                      <p className="text-sm text-muted-foreground">运动项目</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-4 text-center">
                      <p className="text-2xl font-bold text-primary">
                        {selectedDateRecords.reduce((sum, r) => sum + r.minutes + Math.floor(r.seconds / 60), 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">分钟</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedDateRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                        <span className="text-foreground">{record.exercise}</span>
                        <span className="text-sm text-muted-foreground">
                          {record.sets > 0 && `${record.sets}组 x ${record.reps}个`}
                          {record.sets > 0 && record.minutes > 0 && " / "}
                          {record.minutes > 0 && `${record.minutes}分${record.seconds}秒`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">当天没有训练记录</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mt-4 border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">本月概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {Object.keys(workoutDays).filter((d) => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}
                </p>
                <p className="text-xs text-muted-foreground">训练天数</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {Object.entries(workoutDays)
                    .filter(([d]) => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
                    .reduce((sum, [, v]) => sum + v.count, 0)}
                </p>
                <p className="text-xs text-muted-foreground">运动项目</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {Object.entries(workoutDays)
                    .filter(([d]) => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
                    .reduce((sum, [, v]) => sum + v.duration, 0)}
                </p>
                <p className="text-xs text-muted-foreground">总时长(分)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </main>
  )
}
