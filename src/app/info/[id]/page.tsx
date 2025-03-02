"use server";

import {notFound} from "next/navigation";
import VotesCounter from "@/components/std/votes";
import {auth} from "@/auth";
import {User, Vote, NewsArticle, InfoArticle} from "@/db";

type Params = Promise<{ id: string }>

export default async function NewsArticleViewPage({ params }: {params: Params}) {
  const {id} = await params;

  const newsArticle = await InfoArticle.findByPk(id);
  const model: any = newsArticle;
  if (newsArticle === null) {
    notFound();
  }

  return <>
    <div className="articlecontainer flex flex-col gap-4">
      <img src={model.image} alt={model.title} className="w-full rounded-xl" />
      <h1 className="font-bold text-2xl">{model.title}</h1>
    </div>
    <div className="articlecontainer unreset" dangerouslySetInnerHTML={{__html: model.content}} />
  </>
}