"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { AddExerciseModal } from "@/components/add-exercise-modal"

const exercises = [
  {
    id: 1,
    name: "俯卧撑",
    category: "上肢",
    muscle: "胸部、三头肌",
    animation: "push-up",
  },
  {
    id: 2,
    name: "深蹲",
    category: "下肢",
    muscle: "股四头肌、臀部",
    animation: "squat",
  },
  {
    id: 3,
    name: "引体向上",
    category: "上肢",
    muscle: "背部、二头肌",
    animation: "pull-up",
  },
  {
    id: 4,
    name: "仰卧起坐",
    category: "核心",
    muscle: "腹肌",
    animation: "sit-up",
  },
  {
    id: 5,
    name: "平板支撑",
    category: "核心",
    muscle: "核心肌群",
    animation: "plank",
  },
  {
    id: 6,
    name: "哑铃弯举",
    category: "上肢",
    muscle: "二头肌",
    animation: "curl",
  },
  {
    id: 7,
    name: "跑步",
    category: "有氧",
    muscle: "全身",
    animation: "running",
  },
  {
    id: 8,
    name: "跳绳",
    category: "有氧",
    muscle: "全身、小腿",
    animation: "jump-rope",
  },
  {
    id: 9,
    name: "波比跳",
    category: "有氧",
    muscle: "全身",
    animation: "burpee",
  },
]

function ExerciseAnimation({ type }: { type: string }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
      <div className="animate-pulse">
        {type === "push-up" && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <circle cx="20" cy="8" r="5" fill="currentColor" />
            <rect x="18" y="13" width="4" height="12" rx="2" fill="currentColor" />
            <rect x="8" y="15" width="10" height="3" rx="1.5" fill="currentColor" transform="rotate(-20 13 16.5)" />
            <rect x="22" y="15" width="10" height="3" rx="1.5" fill="currentColor" transform="rotate(20 27 16.5)" />
            <rect x="15" y="25" width="4" height="10" rx="2" fill="currentColor" transform="rotate(-10 17 30)" />
            <rect x="21" y="25" width="4" height="10" rx="2" fill="currentColor" transform="rotate(10 23 30)" />
          </svg>
        )}
        {type === "squat" && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <circle cx="20" cy="6" r="4" fill="currentColor" />
            <rect x="17" y="10" width="6" height="10" rx="2" fill="currentColor" />
            <rect x="12" y="20" width="7" height="4" rx="2" fill="currentColor" />
            <rect x="21" y="20" width="7" height="4" rx="2" fill="currentColor" />
            <rect x="12" y="24" width="4" height="10" rx="2" fill="currentColor" />
            <rect x="24" y="24" width="4" height="10" rx="2" fill="currentColor" />
          </svg>
        )}
        {type === "pull-up" && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <rect x="5" y="2" width="30" height="3" rx="1.5" fill="currentColor" />
            <circle cx="20" cy="12" r="4" fill="currentColor" />
            <rect x="17" y="16" width="6" height="12" rx="2" fill="currentColor" />
            <rect x="10" y="6" width="3" height="8" rx="1.5" fill="currentColor" />
            <rect x="27" y="6" width="3" height="8" rx="1.5" fill="currentColor" />
            <rect x="15" y="28" width="4" height="8" rx="2" fill="currentColor" />
            <rect x="21" y="28" width="4" height="8" rx="2" fill="currentColor" />
          </svg>
        )}
        {(type === "sit-up" || type === "plank") && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <circle cx="10" cy="15" r="4" fill="currentColor" />
            <rect x="12" y="12" width="16" height="5" rx="2" fill="currentColor" />
            <rect x="28" y="14" width="8" height="4" rx="2" fill="currentColor" />
          </svg>
        )}
        {type === "curl" && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <circle cx="20" cy="8" r="5" fill="currentColor" />
            <rect x="18" y="13" width="4" height="14" rx="2" fill="currentColor" />
            <rect x="10" y="13" width="6" height="3" rx="1.5" fill="currentColor" />
            <rect x="8" y="16" width="3" height="8" rx="1.5" fill="currentColor" />
            <rect x="24" y="13" width="6" height="3" rx="1.5" fill="currentColor" />
            <rect x="29" y="16" width="3" height="8" rx="1.5" fill="currentColor" />
            <rect x="15" y="27" width="4" height="10" rx="2" fill="currentColor" />
            <rect x="21" y="27" width="4" height="10" rx="2" fill="currentColor" />
          </svg>
        )}
        {(type === "running" || type === "jump-rope" || type === "burpee") && (
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-primary">
            <circle cx="22" cy="6" r="4" fill="currentColor" />
            <rect x="19" y="10" width="6" height="12" rx="2" fill="currentColor" />
            <rect x="12" y="22" width="5" height="4" rx="2" fill="currentColor" transform="rotate(-45 14.5 24)" />
            <rect x="24" y="22" width="5" height="4" rx="2" fill="currentColor" transform="rotate(45 26.5 24)" />
            <rect x="10" y="12" width="8" height="3" rx="1.5" fill="currentColor" transform="rotate(-30 14 13.5)" />
            <rect x="24" y="10" width="8" height="3" rx="1.5" fill="currentColor" transform="rotate(30 28 11.5)" />
          </svg>
        )}
      </div>
    </div>
  )
}

export default function ExercisePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const filteredExercises = exercises.filter(
    (ex) =>
      ex.name.includes(searchQuery) ||
      ex.category.includes(searchQuery) ||
      ex.muscle.includes(searchQuery)
  )

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary px-4 pb-6 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">运动项目</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 transition-colors hover:bg-primary-foreground/30"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4">
        {/* Search */}
        <div className="relative -mt-5">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索运动项目..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 rounded-xl border-0 bg-card pl-12 shadow-md"
          />
        </div>

        {/* Categories */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {["全部", "上肢", "下肢", "核心", "有氧"].map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercise List */}
        <div className="mt-6 space-y-3">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="border-0 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <ExerciseAnimation type={exercise.animation} />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{exercise.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.category} · {exercise.muscle}
                  </p>
                </div>
                <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                  添加
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">未找到相关运动</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-2 text-primary hover:underline"
            >
              添加新运动
            </button>
          </div>
        )}
      </div>

      <AddExerciseModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <BottomNav />
    </main>
  )
}
