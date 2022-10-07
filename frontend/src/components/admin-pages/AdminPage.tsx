import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import UserList from './UserList'
import { PostList, PostEdit, PostCreate } from './Posts'
import PostIcon from '@mui/icons-material/Book'
import UserIcon from '@mui/icons-material/Group'
import authProvider from './authProvider'
import Dashboard from './Dashboard'

const dataProvider = jsonServerProvider(
  'https://jsonplaceholder.typicode.com'
)

const AdminPage = () => {
  return (
    <Admin
      basename='/admin'
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}>
      <Resource
        name='posts'
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
      <Resource
        name='users'
        list={UserList}
        recordRepresentation='name'
        icon={UserIcon}
      />
    </Admin>
  )
}

export default AdminPage
