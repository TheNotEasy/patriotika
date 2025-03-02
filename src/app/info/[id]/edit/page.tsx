import React from "react";
import {notFound} from "next/navigation";
import {WriteArticlePage} from "@/app/news/write/content";
import {amIAdmin, editNews, getNewsArticle} from "@/api";

type Params = Promise<{ id: string }>

export default async function NewsArticleEditPage({ params }: {params: Params}) {
  const {id} = await params;

  if (!(await amIAdmin())) {
    return <p>Недостаточно прав для просмотра этой страницы</p>
  }

  const newsArticle = await getNewsArticle(id);
  if (!newsArticle) {
    notFound();
  }

  return (
    <WriteArticlePage defaultHtml={newsArticle.content} action={async (formData) => {
      "use server";
      formData.set("id", id);
      await editNews(formData);
    }}></WriteArticlePage>
  )
}