import React from 'react'
import './layout.css';

export default function Layout({children}) {
  return (
    <div className='layout-container'>
        <div className='page-content'>{children}</div>
    </div>
  )
}
