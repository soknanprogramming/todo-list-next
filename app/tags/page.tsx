import UserReaction from "@/components/tags/UserReaction"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import TagItem from "@/components/tags/TagItem"

export default async function Tags(){
    const session = await auth()
    if (! session) return <>You must sign first!</>
    const tags = await prisma.tag.findMany({
        orderBy: {
            id: 'desc'
        }
    })

    return (
        <div>
            <UserReaction />
            <div>
                {tags.map((tag) => (
                    <TagItem key={tag.id} tag={tag} />
                ))}
            </div>
        </div>
    )
}