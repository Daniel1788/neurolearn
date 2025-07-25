"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ActivityChartProps {
  data: {
    date: string
    count: number
  }[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1)

  return (
    <Card className="border-2 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>Activitate zilnică</CardTitle>
        <CardDescription>Numărul de lecții finalizate în ultimele 7 zile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, maxCount > 3 ? maxCount : 3]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Ziua</span>
                            <span className="font-bold text-xs">{payload[0].payload.date}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Lecții</span>
                            <span className="font-bold text-xs">{payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} className="fill-accent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
