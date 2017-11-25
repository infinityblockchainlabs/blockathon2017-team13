import React from 'react'
import { Button } from 'antd-mobile'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <Button onClick={(event) => onLogoutUserClick(event)}>Logout</Button>
  )
}

export default LogoutButton
