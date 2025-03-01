import {notFound} from "next/navigation";
import {getNewsArticle} from "@/api";
import Article from "@/components/std/article";
import Link from "next/link";

type Params = Promise<{ id: string }>

export default async function NewsArticleViewPage({ params }: {params: Params}) {
  const {id} = await params;

  const newsArticle = await getNewsArticle(id);
  if (!newsArticle) {
    notFound();
  }

  return <>
    <div className="stdcontainer">
      <Article title={newsArticle.title} img={{src: newsArticle.image, alt: newsArticle.title}} variant="horizontal" className="w-full" />
    </div>
    <div className="stdcontainer unreset" dangerouslySetInnerHTML={{__html: newsArticle.content}} />
    <div className="stdcontainer">
      {/*<Link href={`${id}/edit`}>*/}
      {/*  <button className="button mx-auto flex">*/}
      {/*    Редактировать*/}
      {/*  </button>*/}
      {/*</Link>*/}
    </div>
  </>
}