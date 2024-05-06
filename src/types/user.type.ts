interface User {
  id?: number
  userName?: string
  userAvatar?: string
  age?: number,
  userRole?: RoleType[]
}

type RoleType = 'admin' | 'user';
