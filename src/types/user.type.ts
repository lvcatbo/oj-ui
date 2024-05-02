interface User {
  id?: number
  userName?: string
  userAvatar?: string
  age?: number
}

type RoleType = '' | '*' | 'admin' | 'user';
