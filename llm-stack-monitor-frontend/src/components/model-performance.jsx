import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"

const models = [
  {
    name: "GPT-4o",
    avgResponseTime: 842,
    successRate: 99.7,
    costPerToken: 0.00025,
    status: "Operational",
  },
  {
    name: "GPT-3.5 Turbo",
    avgResponseTime: 320,
    successRate: 99.9,
    costPerToken: 0.00005,
    status: "Operational",
  },
  {
    name: "Claude 3 Opus",
    avgResponseTime: 950,
    successRate: 99.5,
    costPerToken: 0.0003,
    status: "Operational",
  },
  {
    name: "Mistral Large",
    avgResponseTime: 480,
    successRate: 98.9,
    costPerToken: 0.00008,
    status: "Degraded",
  },
]

export function ModelPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>Response times, success rates, and costs by model</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {models.map((model) => (
            <div key={model.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{model.name}</h3>
                  <Badge variant={model.status === "Operational" ? "outline" : "destructive"}>{model.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">${model.costPerToken.toFixed(5)}/token</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>Response Time</span>
                    <span>{model.avgResponseTime}ms</span>
                  </div>
                  <Progress value={100 - model.avgResponseTime / 10} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>Success Rate</span>
                    <span>{model.successRate}%</span>
                  </div>
                  <Progress value={model.successRate} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
