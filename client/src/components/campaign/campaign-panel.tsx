import { cn } from 'lib/utils';
import * as React from 'react';

const CampaignPanel = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>
    >(({ className, ...props }, ref) => (
        <div 
            ref={ref}
            className={cn("p-8 rounded-lg bg-gradient-to-r from-[#B81414] to-[#8A0F0F]", className)}
            {...props}
        />            
    )
)
CampaignPanel.displayName = "CampaignPanel"

export { CampaignPanel };
