import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

function CounsellorLayout() {
  const {auth} = useOutletContext()
  
  return <Outlet
  context={{
      auth
  }}
  />
}

export default CounsellorLayout