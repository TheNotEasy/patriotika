"use client";

import Editor, {ContentEditableEvent} from "react-simple-wysiwyg";
import React from "react";
import {addNews} from "@/api";
import {useRouter} from "next/navigation";
import {AdaptiveEditor} from "@/components/std/editor";

type WriteArticlePageProps = {
  defaultHtml?: string;
  action?: (formData: FormData) => any;
}

export function WriteArticlePage({defaultHtml, action}: WriteArticlePageProps) {
  const [html, setHtml] = React.useState(defaultHtml ?? 'Привет, <b>мир!</b>');
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  return (<>
    <form action={async (formData) => {
      setUploading(true);
      await (action ? async () => await action(formData) : (async () => {
        const newsArticle = await addNews(formData);
        router.push(newsArticle.id);
      }))();
    }} className="contents">
      <div className="stdcontainer">
        <label htmlFor="title">Заголовок</label>
        <input type="text" className="stdcontainer bg-emerald-100 p-2 rounded-2xl" id="title" name="title" />
      </div>
      <div className="stdcontainer">
        <label htmlFor="image">Изображение</label>
        <input type="file" className="stdcontainer bg-emerald-100 p-2 rounded-2xl" id="image" name="image" />
      </div>
      <input type="hidden" name="content" value={html} />
      <AdaptiveEditor value={html} onChange={onChange} />
      <button className="button flex mx-auto" disabled={uploading}>{uploading ? "Подождите" : "Выложить"}</button>
    </form>

  </>)
}