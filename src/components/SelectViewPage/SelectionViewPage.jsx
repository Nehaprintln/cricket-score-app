import React from 'react'
import './select.css';
import {Navigate, useNavigate} from 'react-router-dom';

export default function SelectionViewPage() {
    const navigate = useNavigate();

    const handleSelect = (viewPage)=> {
        navigate(`/${viewPage}`)
    }
  return (
    <div className='select-container'>
      <div className='select-div'>
        <div className='text-content'>
          <h2>Select Roll</h2>
          <div>
            <div className='role-option' onClick={()=> handleSelect('admin')}>Admin</div>
            <div className='role-option' onClick={()=> handleSelect('user')}>User</div>
          </div>
        </div>
        
      </div>
        
    </div>
  )
}
