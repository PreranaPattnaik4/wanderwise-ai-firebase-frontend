import type {SVGProps} from 'react';

export function WanderwiseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <span className="font-headline text-2xl font-bold tracking-tight">
        <span className="text-primary">Wander</span>
        <span className="text-foreground">Wise</span>
      </span>
      <span className="text-xs font-semibold bg-secondary/60 text-foreground px-1.5 py-0.5 rounded-full -ml-1">
        AI
      </span>
    </div>
  );
}
