import React from 'react'

function Loader() {
  return (
    <div role="status" class="flex flex-col p-2 m-4  rounded shadow animate-pulse">
    <div class="md:h-64 md:w-64 h-32 w-32 object-cover object-center group-hover:opacity-75 bg-gray-400 rounded">  </div>
    <div class="h-4 w-24 bg-gray-400 mt-2"></div>
    <div class="h-4 w-24 bg-gray-400 mt-4"></div>
    <div class="h-6 bg-gray-400 mt-2"></div>
  
    
    <span class="sr-only">Loading...</span>
</div>
  )
}

export default Loader