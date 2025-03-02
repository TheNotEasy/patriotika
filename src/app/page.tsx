"use server";

import {greetings} from "@/app/test";
import Article from "@/components/std/article";

import test from "@public/articletest.jpg"
import Link from "next/link";
import {connection} from "next/server";
import {InfoArticle, NewsArticle} from "@/db";

export default async function Home() {
  await connection();
  const articles = await NewsArticle.findAll({limit: 5});
  const info = await InfoArticle.findAll({limit: 5})

  return <>
    <div className="stdcontainer flex flex-col gap-5 overflow-visible">
      <div className="overflow-x-auto w-full flex flex-col gap-3.5">
        <div className="flex gap-4">
        <p className="font-bold">Новости</p>
        <Link href='/news'>
          <p className='underline'>Архив</p>
        </Link>
      </div>
        <div className="flex gap-5 w-max sm:grid sm:w-full grid-cols-autofill">
          {articles.map((model: any) =>
            <Link href={`/news/${model.id}`} key={model.id}>
              <Article title={model.title} img={{src: model.image, alt: model.title}} createdAt={model.createdAt} />
            </Link>)}
        </div>
      </div>
      <div className="overflow-x-auto w-full flex flex-col gap-3.5">
        <div className="flex gap-4">
          <p className="font-bold">Статьи</p>
          <Link href='/info/page/1'>
            <p className='underline'>Архив</p>
          </Link>
        </div>
        <div className="flex gap-5 w-max sm:grid sm:w-full grid-cols-autofill">
          {info.map((model: any) =>
            <Link href={`/info/${model.id}`} key={model.id}>
              <Article title={model.title} img={{src: model.image, alt: model.title}} createdAt={model.createdAt} />
            </Link>
          )}
        </div>
      </div>
    </div>
  </>
}
