import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { useEffect, useState } from "react"

// Mock data for the chart
const dailyData = [
  { date: "Apr 01", cost: 124.5 },
  { date: "Apr 02", cost: 135.2 },
  { date: "Apr 03", cost: 147.8 },
  { date: "Apr 04", cost: 160.3 },
  { date: "Apr 05", cost: 152.9 },
  { date: "Apr 06", cost: 140.6 },
  { date: "Apr 07", cost: 130.4 },
  { date: "Apr 08", cost: 145.7 },
  { date: "Apr 09", cost: 170.2 },
  { date: "Apr 10", cost: 180.5 },
  { date: "Apr 11", cost: 175.3 },
  { date: "Apr 12", cost: 165.8 },
  { date: "Apr 13", cost: 158.4 },
  { date: "Apr 14", cost: 170.9 },
]

const weeklyData = [
  { date: "Week 1", cost: 850.2 },
  { date: "Week 2", cost: 920.7 },
  { date: "Week 3", cost: 1050.4 },
  { date: "Week 4", cost: 1180.6 },
]

const monthlyData = [
  { date: "Jan", cost: 3200.8 },
  { date: "Feb", cost: 3800.5 },
  { date: "Mar", cost: 4200.3 },
  { date: "Apr", cost: 4000.9 },
]

export function CostTrends() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")
  const [chartData, setChartData] = useState(dailyData)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    switch (activeTab) {
      case "daily":
        setChartData(dailyData)
        break
      case "weekly":
        setChartData(weeklyData)
        break
      case "monthly":
        setChartData(monthlyData)
        break
      default:
        setChartData(dailyData)
    }
  }, [activeTab])

  if (!mounted) {
    return null
  }

  // Find max value for scaling
  const maxValue = Math.max(...chartData.map((item) => item.cost))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Trends</CardTitle>
        <CardDescription>LLM spending over time</CardDescription>
        <Tabs defaultValue="daily" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-2">
          <div className="flex items-end h-full gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="relative flex flex-col justify-end w-full h-full">
                <div
                  className="w-full transition-all bg-blue-400 rounded-md hover:bg-blue-700"
                  style={{ height: `${(item.cost / maxValue) * 100}%` }}
                >
                  <div className="absolute w-full text-xs text-center -top-6">${item.cost.toFixed(2)}</div>
                </div>
                <div className="mt-2 text-xs text-center origin-left">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
