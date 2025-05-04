import IntergrationStatusHeader from '@/src/components/integration-status-header'
import { PlusCircleIcon } from 'lucide-react'
import { RefreshCwIcon } from 'lucide-react'
import React from 'react'

function Integration() {
  return (
    <div className='flex flex-col w-full h-full p-4'>
        <div className='flex flex-row items-center justify-between mt-2'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-semibold'>Integration Center</h2>
                <span className='font-light tex-sm'>Connect your LLM Stack Monitor with AI models, data sources, and third-party services</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <RefreshCwIcon className='p-3 rounded-md border-1 w-11 h-11 border-accent-foreground md:w-10 md:h-10'/>
                <button className='flex flex-row items-center gap-5 p-2 px-3 bg-blue-500 border-2 rounded-md md:gap-2'> 
                    <PlusCircleIcon className='w-4 h-4'/>
                    <span className='text-md'>Add Integration</span>
                </button>
            </div>
        </div>
        <IntergrationStatusHeader className="mt-4"/>
      
    </div>
  )
}

export default Integration
