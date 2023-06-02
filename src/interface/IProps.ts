import { IPost } from './IPost'

export interface IProps {
  profileImage: string
  post: IPost
  isCurrentUser: boolean
  index: number
}
