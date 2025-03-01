import {ComponentProps} from "react";
import {tw} from "@/app/utils";

type ArticleProps = {
  img: {
    src: string,
    alt: string,
  },
  title: string,
  variant?: 'horizontal' | 'vertical',
  createdAt: string
} & ComponentProps<'div'>

export default function Article({img, title, variant, createdAt, ...divProps}: ArticleProps) {
  const divClassName = divProps.className || '';
  delete divProps.className;
  variant = variant ?? 'vertical';
  const horizontal = variant == 'horizontal';
  const vertical = variant == 'vertical';
  return <div className={tw(`flex ${vertical && 'flex-col w-full max-w-28 sm:max-w-56 gap-1'} ${horizontal && 'gap-5'} `) + divClassName} {...divProps}>
    <div className={tw(`rounded-xl overflow-hidden aspect-[323/253] bg-gray-300 ${horizontal && 'h-full'} ${vertical && 'w-full'} relative`)}>
      <img {...img} className="w-full h-full" />
    </div>
    <p className={tw(`text-xs text-wrap font-semibold w-full ${horizontal && 'self-center sm:text-xl'}`)}>{title}</p>
  </div>
}