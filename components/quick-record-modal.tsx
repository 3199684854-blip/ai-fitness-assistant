"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface QuickRecordModalProps {
  open: boolean
  onClose: () => void
}

interface WorkoutRecord {
  id: string
  exercise: string
  sets: number
  reps: number
  minutes: number
  seconds: number
  date: string
}

const exercises = [
  "俯卧撑",
  "深蹲",
  "引体向上",
  "仰卧起坐",
  "平板支撑",
  "哑铃弯举",
  "跑步",
  "跳绳",
  "开合跳",
  "波比跳",
]

export function QuickRecordModal({ open, onClose }: QuickRecordModalProps) {
  const [exercise, setExercise] = useState("")
  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setExercise("")
      setSets("")
      setReps("")
      setMinutes("")
      setSeconds("")
      setShowSuccess(false)
    }
  }, [open])

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create record object
    const record: WorkoutRecord = {
      id: Date.now().toString(),
      exercise,
      sets: parseInt(sets) || 0,
      reps: parseInt(reps) || 0,
      minutes: parseInt(minutes) || 0,
      seconds: parseInt(seconds) || 0,
      date: new Date().toISOString().split("T")[0],
    }

    // Get existing records from localStorage
    const existingRecords = JSON.parse(localStorage.getItem("workoutRecords") || "[]")
    
    // Add new record
    const updatedRecords = [...existingRecords, record]
    localStorage.setItem("workoutRecords", JSON.stringify(updatedRecords))

    console.log("保存记录:", record)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <button
              onClick={handleSuccessClose}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-foreground">添加成功</h2>
            <p className="mt-2 text-sm text-muted-foreground">训练记录已保存</p>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-xl font-semibold text-foreground">快速记录</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="exercise">运动名称</Label>
                <Select value={exercise} onValueChange={setExercise} required>
                  <SelectTrigger id="exercise">
                    <SelectValue placeholder="选择运动项目" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map((ex) => (
                      <SelectItem key={ex} value={ex}>
                        {ex}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sets">组数</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="sets"
                      type="number"
                      min="1"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      placeholder="0"
                      className="text-center"
                    />
                    <span className="text-sm text-muted-foreground">组</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reps">数量</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="reps"
                      type="number"
                      min="1"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      placeholder="0"
                      className="text-center"
                    />
                    <span className="text-sm text-muted-foreground">个</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>时长</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="0"
                    className="text-center"
                  />
                  <span className="text-sm text-muted-foreground">分</span>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    placeholder="0"
                    className="text-center"
                  />
                  <span className="text-sm text-muted-foreground">秒</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  取消
                </Button>
                <Button type="submit" className="flex-1">
                  保存
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
