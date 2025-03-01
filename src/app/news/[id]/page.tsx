import {notFound} from "next/navigation";
import {getNewsArticle} from "@/api";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import VotesCounter from "@/components/std/votes";
import {auth} from "@/auth";
import {User, Vote} from "@/db";

type Params = Promise<{ id: string }>

export default async function NewsArticleViewPage({ params }: {params: Params}) {
  const {id} = await params;

  const newsArticle = await getNewsArticle(id);
  if (!newsArticle) {
    notFound();
  }

  async function votesChange(state: "positive" | "negative" | "neutral") {
    "use server";

    const user = await auth();
    if (user === null) {
      return;
    }
    const userId = user.user?.id;
    if (userId === undefined) {
      return;
    }

    const [vote, created] = await Vote.findOrBuild(
      {
        where: {targetId: newsArticle.id},
        include: {
          model: User,
          where: {
            id: userId
          },
        }
      }
    );
    vote.update({
      userId,
      targetId: newsArticle.id,
      positive: state === "positive"
    })


  }

  return <>
    <div className="articlecontainer flex flex-col gap-4">
      <img src={newsArticle.image} alt={newsArticle.title} className="w-full rounded-xl" />
      <h1 className="font-bold text-2xl">{newsArticle.title}</h1>
    </div>
    <div className="articlecontainer unreset" dangerouslySetInnerHTML={{__html: newsArticle.content}} />
    <div className="articlecontainer flex h-fit">
      <VotesCounter votes={newsArticle.votes} onChange={votesChange} />
    </div>
  </>
}