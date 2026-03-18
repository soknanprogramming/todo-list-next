import UserReaction from "@/components/tags/UserReaction";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import TagItem from "@/components/tags/TagItem";

export default async function Tags() {
  const session = await auth();
  if (!session) return <>You must sign first!</>;
  let tags = [];
  try {
    tags = await prisma.tag.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return <div>Error fetching tags</div>;
  }

  return (
    <div>
      <UserReaction />
      <div className="grid 2xl:grid-cols-4 gap-1 mt-2">
        {tags.map((tag) => (
          <TagItem className="rounded-sm" key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
