import {LoaderCircleIcon} from "lucide-react";

export default function LoadingSkeleton() {
  return (
    <div className="m-auto">
      <LoaderCircleIcon className="animate-spin"></LoaderCircleIcon>
    </div>
  )
}