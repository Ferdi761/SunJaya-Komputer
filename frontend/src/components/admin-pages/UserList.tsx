import React from 'react'
import { List, TextField, EmailField, UrlField } from 'react-admin'
import { MyDatagrid } from './MyDataGrid'

const UserList = () => {
  return (
    <List>
      <MyDatagrid rowClick='edit'>
        <TextField source='id' />
        <TextField source='name' />
        <EmailField source='email' />
        <TextField source='phone' />
        <UrlField source='website' />
        <TextField source='company.name' />
      </MyDatagrid>
    </List>
  )
}

export default UserList
