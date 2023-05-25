export interface IPost {
  user: string
  date: number
  body: string
  rating: number
}

export interface IUserInfo {
  username: string
  password: string
  posts: IPost[]
}
