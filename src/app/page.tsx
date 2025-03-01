import {greetings} from "@/app/test";
import Article from "@/components/std/article";

import test from "@public/articletest.jpg"
import Link from "next/link";

export default function Home() {
  return <>
    <div className="stdcontainer flex flex-col gap-3.5">
      <p className="font-bold">Случайная статья</p>
      <Article variant='horizontal' title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
    </div>
    <div className="stdcontainer flex flex-col gap-3.5 overflow-visible">
      <div className="flex gap-4">
        <p className="font-bold">Новости</p>
        <Link href='/news'>
          <p className='underline'>Архив</p>
        </Link>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="flex gap-5 w-max sm:grid sm:w-full grid-cols-autofill">
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
          <Article title="Lorem ipsum asdas asd a das das das da asd asdas dsa d asd adasd asd asd as das" img={{src: test.src, alt: "test"}}></Article>
        </div>
      </div>
    </div>
  </>
}
