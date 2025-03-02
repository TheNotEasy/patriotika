"use server";

import {notFound} from "next/navigation";
import VotesCounter from "@/components/std/votes";
import {auth} from "@/auth";
import {User, Vote, NewsArticle} from "@/db";

type Params = Promise<{ id: string }>

export default async function NewsArticleViewPage({ params }: {params: Params}) {
  const {id} = await params;

  const newsArticle = await NewsArticle.findByPk(id);
  const model: any = newsArticle;
  if (newsArticle === null) {
    notFound();
  }

  const positive = ((await Vote.findOne({
    where: {
      targetId: id
    }
  })) as unknown as {positive: boolean} | undefined)?.positive
  const state = positive === undefined ? 'neutral' : (positive ? 'positive' : 'negative');

  async function votesChange(state: "positive" | "negative" | "neutral") {
    "use server";

    const newsArticle = await NewsArticle.findByPk(id);
    const model: any = newsArticle;
    if (newsArticle === null) {
      notFound();
    }

    const user = await auth();
    if (user === null) {
      return;
    }
    const userId = user.user?.id;
    if (userId === undefined) {
      return;
    }
    if (newsArticle === null) return;

    const [vote, created] = await Vote.findOrBuild(
      {
        where: {targetId: model.id},
        include: {
          model: User,
          where: {
            id: userId
          },
        }
      }
    );
    let offset: number;
    if (!created) {
      const prevState = (vote as any).positive ? "positive" : "negative";
      if (state === "neutral") {
        await vote.destroy();
        offset = prevState === "positive" ? -1 : 1;
      } else {
        offset = prevState === "positive" ? -2 : 2;
      }
    } else {
      offset = state === "positive" ? 1 : -1;
      void vote.update({
        userId,
        targetId: model.id,
        positive: state === "positive"
      });
    }
    console.log(newsArticle);
    void newsArticle.increment("votes", { by: offset });
  }

  return <>
    <div className="articlecontainer flex flex-col gap-4">
      <img src={model.image} alt={model.title} className="w-full rounded-xl" />
      <h1 className="font-bold text-2xl">{model.title}</h1>
    </div>
    <div className="articlecontainer unreset" dangerouslySetInnerHTML={{__html: model.content}} />
    {/*<div className="articlecontainer flex h-fit">*/}
    {/*  <VotesCounter votes={model.votes} onChange={votesChange} state={state} />*/}
    {/*</div>*/}
  </>
}