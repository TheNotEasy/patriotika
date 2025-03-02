"use server";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {PaginationWarpPopover} from "@/app/news/page/[page]/warp";
import {NewsArticle} from "@/db";
import Article from "@/components/std/article";
import Link from "next/link";
import {Suspense} from "react";
import LoadingSkeleton from "@/app/loading";

type Params = Promise<{
  page: string
}>

export default async function NewsPage({ params }: { params: Params }) {
  const { page } = await params;

  const newsCount = await NewsArticle.count();
  const perPage = 5;
  const news = await NewsArticle.findAll({limit: perPage, offset: (+page-1)*perPage})
  const articles = news.map((model: any) => <Link href={`/news/${model.id}`} key={model.id}>
    <Article variant="vertical" img={{src: model.image, alt: model.title}} title={model.title} createdAt={model.createdAt} />
  </Link>)
  const maxPagination = Math.ceil(newsCount / perPage);

  const min = (x: number, y: number) => x < y ? x : y;
  const max = (x: number, y: number) => x < y ? y : x;

  const paginationList = [];
  paginationList.push(<PaginationItem key={1}>
    <PaginationLink href={String(1)} isActive={page === '1'}>{1}</PaginationLink>
  </PaginationItem>)
  if (max(+page-1, 2) !== 2) {
    paginationList.push(
      <PaginationWarpPopover key={'1...'} max={maxPagination}>
        <PaginationItem>
          <PaginationEllipsis></PaginationEllipsis>
        </PaginationItem>
      </PaginationWarpPopover>
      );
  }
  for (let i= max(+page-1-(+(+page == maxPagination)), 2); i <= min(1+(+page)+(+(+page == 1)), maxPagination); i++) {
    paginationList.push(<PaginationItem key={i}>
      <PaginationLink href={String(i)} isActive={i === +page}>{i}</PaginationLink>
    </PaginationItem>)
  }
  if (+(paginationList.at(-1)!.key!) !== maxPagination) {
    paginationList.push(
      <PaginationWarpPopover key={'2...'} max={maxPagination}>
        <PaginationItem>
          <PaginationEllipsis></PaginationEllipsis>
        </PaginationItem>
      </PaginationWarpPopover>
    )
    paginationList.push(<PaginationItem key={maxPagination}>
      <PaginationLink href={String(maxPagination)}>{maxPagination}</PaginationLink>
    </PaginationItem>)
  }

  return <>
    <div className="stdcontainer grid grid-cols-autofill gap-5">
      {articles}
    </div>
    <Pagination>
      <PaginationContent>
        {+page !== 1 && <PaginationItem>
          <PaginationPrevious href={String(+page - 1)}/>
        </PaginationItem>}
        {paginationList}
        {+page !== maxPagination && <PaginationItem>
          <PaginationNext href={String(+page + 1)}/>
        </PaginationItem>}
      </PaginationContent>
    </Pagination>
  </>
}