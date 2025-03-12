"use client";

import * as React from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { CampaignPanel } from 'components/ui/campaign-panel';
import { cn } from 'lib/utils';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type PdfOption = 'Player' | 'Monster' | 'Master';
interface PdfReaderProps extends React.HTMLAttributes<HTMLDivElement> {
  pdfName?: PdfOption;
}

const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  ({ className, pdfName = 'Player', ...props }, ref) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    const fileUrl = `/pdf/${pdfName}.pdf`;

    return (
      <CampaignPanel 
        ref={ref}
        className={cn("flex flex-col items-center p-4", className)}
        {...props}
      >
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