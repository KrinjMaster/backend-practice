import { IUserInfo } from '@/interface/IUserInfo'
import Image from 'next/image'

export const MiniProfile = (user: IUserInfo) => {
    return (
        <div>
            <Image src={user.profileImage} width={30} height={30} alt='userImage' className='absolute right-2 top-2 w-16 h-16 rounded-lg'/>
        </div>
    )
}