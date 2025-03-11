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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

type PdfOption = 'Player' | 'Monster' | 'Master';
interface PdfReaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  ({ className, ...props }, ref) => {
    const [selectedPdf, setSelectedPdf] = React.useState<PdfOption>('Player');
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    const fileUrl = `/pdf/${selectedPdf}.pdf`;

    return (
      <CampaignPanel 
        ref={ref}
        className={cn("flex flex-col items-center p-4 gap-4", className)}
        {...props}
      >
        <div className="w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors">
              Selecionar PDF ({selectedPdf})
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(['Player', 'Monster', 'Master'] as PdfOption[]).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => setSelectedPdf(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full h-[600px] overflow-auto">
          <div className="w-full h-full">
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