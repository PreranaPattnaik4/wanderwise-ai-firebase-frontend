import type { SVGProps } from "react";

export function WanderwiseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      width="150"
      height="30"
      {...props}
    >
      <text
        x="0"
        y="15"
        fontFamily="var(--font-playfair-display), serif"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
        className="font-headline"
      >
        WanderWise AI
      </text>
    </svg>
  );
}
