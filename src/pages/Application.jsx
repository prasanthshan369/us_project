import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import {data} from '../helpers/application'
import Table from '../components/Table'
const Application = () => {
  useEffect(()=>{
    console.log(data);
  },[])
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='p-2 w-full h-full'>   
        <Table/>
        </div>
    </div>
  )
}

export default Application