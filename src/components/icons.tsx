
import type { SVGProps } from "react";

export function WanderwiseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <span className="font-headline text-xl font-bold">
        WanderWise
      </span>
      <span className="text-xs font-semibold bg-gray-800 text-white px-2 py-0.5 rounded-full">
        AI
      </span>
    </div>
  );
}
