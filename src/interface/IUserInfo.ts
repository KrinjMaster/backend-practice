export interface IPost {
  user: string
  date: number
  body: string
  rating: number
}
export interface IUserInfo {
  username: string
  password: string
  posts: IPost[] | []
}
export interface Target {
  username: HTMLInputElement
  password1: HTMLInputElement
  password2: HTMLInputElement
}
