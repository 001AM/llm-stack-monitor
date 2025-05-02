import { CostByTeam } from '@/src/components/cost-by-team'
import { CostTrends } from '@/src/components/costtrends'
import { ExpenseChart } from '@/src/components/expensechart'
import React from 'react'

function CostAnaylsis() {
  return (
    <div className="p-4">
        <div className="grid items-center justify-center grid-cols-4 gap-4">
            <div className='col-span-3'>
              <CostTrends/>
            </div>
            <div className='col-span-1'>
              <ExpenseChart/>
            </div>
        </div>
        <div className='mt-4'>
          <CostByTeam />
        </div>
      
    </div>
  )
}

export default CostAnaylsis
