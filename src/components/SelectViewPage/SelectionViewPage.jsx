import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom';

export default function SelectionViewPage() {
    const navigate = useNavigate();

    const handleSelect = (viewPage)=> {
        navigate(`/${viewPage}`)
    }
  return (
    <div>
        <h2>Select Roll</h2>
        <div></div>
        <div className='role-option' onClick={()=> handleSelect('admin')}>Admin</div>
        <div className='role-option' onClick={()=> handleSelect('user')}>User</div>
    </div>
  )
}
