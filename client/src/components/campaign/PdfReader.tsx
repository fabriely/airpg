"use client";

import * as React from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { CampaignPanel } from 'components/campaign/CampaignPanel';
import { cn } from 'lib/utils';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ToolbarProps } from '@react-pdf-viewer/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

type PdfOption = { label: string; value: string };

const pdfOptions: PdfOption[] = [
  { label: "Player's Handbook", value: 'Player' },
  { label: "Monster Manual", value: 'Monster' },
  { label: "Dungeon Master's Guide", value: 'Master' },
];

interface PdfReaderProps extends React.HTMLAttributes<HTMLDivElement> {
  master?: boolean;
}


const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  ({ className, master = false, ...props }, ref) => {
    const [selectedPdf, setSelectedPdf] = React.useState<PdfOption>({ label: "Player's Handbook", value: 'Player' });
    console.log(master)
    
    const fileUrl = master ? `/pdf/${selectedPdf.value}.pdf` : '/pdf/Player.pdf';

    const renderToolbar = (Toolbar: React.ComponentType<ToolbarProps>) => (
      <>
        <Toolbar />
      </>
    );
  
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
      renderToolbar,
    });

    return (
      <CampaignPanel 
        ref={ref}
        className={cn("flex flex-col items-center p-1 gap-16", className)}
        {...props}
      >
        
        <div className="w-full h-[600px] overflow mb-2">
          <div className="w-full h-full">

              {master && (
                  <div className="w-full flex mb-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="px-2 py-1 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors">
                        {selectedPdf.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {pdfOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.label}
                            onSelect={() => setSelectedPdf(option)}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
                  <Viewer 
                      fileUrl={fileUrl}
                      plugins={[defaultLayoutPluginInstance]}
                  />
              </Worker>
          </div>
        </div>
      </CampaignPanel>
    );
  }
);

PdfReader.displayName = 'PdfReader';

export { PdfReader };