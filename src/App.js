import React from 'react'
import AdminView from './components/AdminComponent/AdminView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SelectionViewPage from './components/SelectViewPage/SelectionViewPage'
import UserView from './components/UserComponent/UserView'
import ScoreProvider from './components/ScoreComponents/ScoreContext'
import Layout from './components/LayoutComponent/Layout'
export default function App() {
  return (
    <div>
      {/* <AdminView /> */}
      {/* <SelectionViewPage /> */}
      {/* <Layout> */}
        <ScoreProvider>
          <Router>
            <Routes>
              <Route path='/' element={<SelectionViewPage />} />
              <Route path='/admin' element={<AdminView />} />
              <Route path='/user' element={<UserView />} />
            </Routes>
          </Router>
        </ScoreProvider>
      {/* </Layout> */}
     
      
    </div>
  )
}
