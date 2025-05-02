import { CostTrends } from '@/src/components/costtrends'
import React from 'react'

function CostAnaylsis() {
  return (
    <div className="">
        <div className="grid grid-cols-4">
            <div className='col-span-3'>
                <CostTrends/>
            </div>
        </div>
      
    </div>
  )
}

export default CostAnaylsis
