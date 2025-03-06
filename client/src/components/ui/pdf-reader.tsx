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

const PdfReader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
                    fileUrl="https://pdfobject.com/pdf/pdf_open_parameters_acro8.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
      </div>
    </CampaignPanel>
  );
});

PdfReader.displayName = 'PdfReader';

export { PdfReader };