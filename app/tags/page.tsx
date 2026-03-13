import UserReaction from "@/components/tags/UserReaction"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export default async function Tags(){
    const session = await auth()
    if (! session) return <>You must sign first!</>
    const tags = await prisma.tag.findMany()

    return (
        <div>
            <UserReaction />
            <div>
                {tags.map((tag) => (
                    <div key={tag.id}>{tag.name}</div>
                ))}
            </div>
        </div>
    )
}