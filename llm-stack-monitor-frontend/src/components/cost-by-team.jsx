import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const teamData = [
  {
    team: "Engineering",
    currentCost: 1850.75,
    previousCost: 1720.5,
    change: 7.6,
    models: ["GPT-4o", "Claude 3", "Mistral"],
    status: "increase",
  },
  {
    team: "Product",
    currentCost: 950.25,
    previousCost: 880.3,
    change: 7.9,
    models: ["GPT-4o", "GPT-3.5"],
    status: "increase",
  },
  {
    team: "Marketing",
    currentCost: 450.5,
    previousCost: 520.8,
    change: -13.5,
    models: ["GPT-3.5"],
    status: "decrease",
  },
  {
    team: "Customer Support",
    currentCost: 180.4,
    previousCost: 150.2,
    change: 20.1,
    models: ["GPT-3.5", "Mistral"],
    status: "increase",
  },
  {
    team: "Research",
    currentCost: 320.6,
    previousCost: 290.4,
    change: 10.4,
    models: ["GPT-4o", "Claude 3"],
    status: "increase",
  },
]

export function CostByTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost By Team</CardTitle>
        <CardDescription>LLM spending breakdown by team with month-over-month comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Current Month</TableHead>
              <TableHead>Previous Month</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Models Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamData.map((team) => (
              <TableRow key={team.team}>
                <TableCell className="font-medium">{team.team}</TableCell>
                <TableCell>${team.currentCost.toFixed(2)}</TableCell>
                <TableCell>${team.previousCost.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {team.status === "increase" ? (
                      <ArrowUpRight className="w-4 h-4 mr-1 text-red-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1 text-emerald-500" />
                    )}
                    <span className={team.status === "increase" ? "text-red-500" : "text-emerald-500"}>
                      {team.change}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {team.models.map((model) => (
                      <Badge key={model} variant="outline">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
