import React from 'react'
import {
  List,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
  useRecordContext,
} from 'react-admin'
import { MyDatagrid } from './MyDataGrid'

const postFilters = [
  <TextInput source='q' label='Search' alwaysOn key='' />,
  <ReferenceInput source='userId' label='User' reference='users' />,
]

export const PostList = () => {
  return (
    <List filters={postFilters}>
      <MyDatagrid>
        <TextField source='id' />
        <ReferenceField source='userId' reference='users' />
        <TextField source='title' />
        <EditButton />
      </MyDatagrid>
    </List>
  )
}

const PostTitle = () => {
  const record = useRecordContext()
  return <span>Post {record ? `"${record.title}"` : ''} </span>
}

export const PostEdit = () => {
  return (
    <Edit title={<PostTitle />}>
      <SimpleForm>
        <TextInput source='id' />
        <ReferenceInput source='userId' reference='users' />
        <TextInput source='title' />
        <TextInput multiline source='body' />
      </SimpleForm>
    </Edit>
  )
}

export const PostCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source='userId' reference='users' />
        <TextInput source='title' />
        <TextInput multiline source='body' />
      </SimpleForm>
    </Create>
  )
}
