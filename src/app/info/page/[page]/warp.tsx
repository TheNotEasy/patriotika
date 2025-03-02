"use client";

import {PropsWithChildren} from "react";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronRightIcon} from "lucide-react";

type PaginationWarpPopoverProps = PropsWithChildren<{
  max: number
}>

export function PaginationWarpPopover({children, max}: PaginationWarpPopoverProps) {
  const router = useRouter();

  return <Popover>
    <PopoverTrigger asChild>
      {children}
    </PopoverTrigger>
    <PopoverContent className="w-40">
      <div className="flex flex-col">
        <label htmlFor="warp">Перейти к</label>
        <div className="flex gap-2 w-full justify-between">
          <form action={async (form) => {
            const page = form.get('page')!.toString();
            if (page === '') return;
            router.push(page);
          }} className="contents">
            <input type="number" className="border-gray-500 border-2 p-2 rounded-xl w-full" min={1} max={max} name='page'/>
            <button type="submit" className="flex w-14 aspect-square bg-emerald-400 rounded-xl">
              <ChevronRightIcon className="m-auto text-white"/>
            </button>
          </form>
        </div>
      </div>
    </PopoverContent>
  </Popover>
}