'use server';

import {NewsArticle, InfoArticle, UserAttributes, sequelize} from "@/db";
import {auth} from "@/auth";
import {put} from "@vercel/blob";
import {notFound} from "next/navigation";

export async function listNews(limit: number, offset: number) {
  return NewsArticle.findAll({limit, offset});
}

export async function getNewsArticle(id: string) {
  return (await NewsArticle.findByPk(id))?.toJSON();
}

export async function addNews(form: FormData) {
  const content = form.get("content")!.toString();
  const title = form.get("title")!.toString();
  const image = form.get("image")! as File;

  const { url } = await put(`newsarticles/${image.name}`, image, { access: 'public' });

  if (!(await amIAdmin())) {
    return {"error": "not an admin"};
  }

  return (await NewsArticle.create({content, title, image: url})).toJSON();
}

export async function editNews(form: FormData) {
  const content = form.get("content")?.toString();
  const title = form.get("title")?.toString();
  const image = form.get("image") as File | undefined;
  const id = form.get("id")!.toString();

  const mutations: Record<string, any> = {}
  if (content)
    mutations.content = content;
  if (title)
    mutations.title = title;
  if (image) {
    const { url } = await put(`newsarticles/${image.name}`, image, { access: 'public' });
    mutations.image = url;
  }

  if (!(await amIAdmin())) {
    return {"error": "not an admin"};
  }

  return (await NewsArticle.update(mutations, {where: {id}}));
}

export async function listArticles(limit: number, offset: number) {
  return (await InfoArticle.findAll({limit, offset})).map(model => model.toJSON());
}

export async function addArticle(form: FormData) {
  const content = form.get("content")!.toString();
  const title = form.get("title")!.toString();
  const image = form.get("image")! as File;

  const { url } = await put(`infoarticles/${image.name}`, image, { access: 'public' });

  if (!(await amIAdmin())) {
    return {"error": "not an admin"};
  }

  return (await InfoArticle.create({content, title, image: url})).toJSON();
}

export async function amIAdmin() {
  const user = await auth() as any;
  return Boolean(user?.user?.isAdmin);
}