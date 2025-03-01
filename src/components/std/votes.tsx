"use client";

import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import {useState} from "react";

type VotesCounterProps = {
  votes: number,

  onChange?: (state: 'positive' | 'negative' | 'neutral') => any
}

export default function VotesCounter({ votes: defaultVotes, onChange }: VotesCounterProps) {
  const [votes, setVotes] = useState(defaultVotes);

  function handle(positive: boolean) {
    if (positive === (votes > defaultVotes) && !positive === (votes < defaultVotes)) {
      setVotes(defaultVotes);
      onChange?.('neutral');
      return;
    }
    setVotes(defaultVotes + (positive ? 1 : -1));
    onChange?.(positive ? 'positive' : 'negative');
  }

  return <div className="rounded-full py-1 px-5 border-2 border-gray-500 flex w-36 h-14 items-center justify-between -ml-2.5">
    <ChevronUpIcon onClick={() => handle(true)} />
    <span className="h-fit">{votes}</span>
    <ChevronDownIcon onClick={() => handle(false)} />
  </div>
}