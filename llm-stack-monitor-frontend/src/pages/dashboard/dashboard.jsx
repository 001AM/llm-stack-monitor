import { ChartAreaInteractive } from "@/src/components/timeline-usage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Clock } from "lucide-react";
import { DollarSign } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Zap } from "lucide-react";
import React from "react";
import { ExpenseChart } from "@/src/components/expensechart";
import { ModelPerformance } from "@/src/components/model-performance";

function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="p-1 font-medium text-md">
              Total Requests
            </CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-4xl font-bold">142,857</div>
            <p className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="w-4 h-4 mr-1 text-emerald-500" />
              <span className="font-medium text-emerald-500">+12.5% </span> from
              last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="p-1 font-medium text-md">
              Total Cost
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-4xl font-bold">$3,427.89</div>
            <p className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="w-4 h-4 mr-1 text-emerald-500" />
              <span className="font-medium text-emerald-500">+7.2% </span> from
              last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="p-1 font-medium text-md">
              Avg. Response Time
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-4xl font-bold">842ms</div>
            <p className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowDownRight className="w-4 h-4 mr-1 text-emerald-500" />
              <span className="font-medium text-emerald-500">-18.3% </span> from
              last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="p-1 font-medium text-md">
              Active Prompts
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-4xl font-bold">78</div>
            <p className="flex items-center mt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="w-4 h-4 mr-1 text-emerald-500" />
              <span className="font-medium text-emerald-500">+4 </span> new this
              month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <ChartAreaInteractive  className="col-span-3"/>
        <ExpenseChart />
      </div>
      <div className="mt-4">
        <ModelPerformance />
      </div>
    </div>
  );
}

export default Dashboard;
