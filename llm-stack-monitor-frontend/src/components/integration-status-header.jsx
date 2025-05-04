import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

function IntegrationStatusHeader({className}) {
  return (
    <Card className={className}>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 lg:grid-cols-4 lg:grid-rows-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-md">Integration Status</span>
            <span>67% Complete</span>
          </div>
          <Progress value={67} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-md">Active Integrations</span>
          <span className="text-xl font-semibold">8/12</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-md">Last Synced</span>
          <span className="text-xl font-semibold">5m ago</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-md">Health Status</span>
          <span className="text-xl font-semibold">All Systems Operational</span>
        </div>
      </div>
    </Card>
  );
}

export default IntegrationStatusHeader;
