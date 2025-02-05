import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './button'

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const { _createdAt, _id, description, category, image, author: { _id: authorID, name, }, title, views } = post
    return (
        <li className='startup-card group'>
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${authorID}`}>
                        <p className="text-16-medium line-clamp-1">
                            {name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${authorID}`}>
                    <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className='rounded-full' />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>
                <Image src='/unsplash.jpg' alt="" width={500} height={208} className="startup-card_img" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">
                        {category.toLowerCase()}
                    </p>
                </Link>
                <Button asChild={true}  >
                    <Link href={`/startup/${_id}`} className="startup-card_btn ">
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard