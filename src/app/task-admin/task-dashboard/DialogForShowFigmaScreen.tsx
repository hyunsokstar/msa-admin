import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  figmaUrl: string;
}

export function DialogForShowFigmaScreen({ isOpen, onClose, figmaUrl }: Props) {
  const handleOpenFigma = () => {
    window.open(figmaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>View Figma Design</DialogTitle>
          <DialogDescription>
            Due to security restrictions, the Figma design will open in a new tab.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Button 
            onClick={handleOpenFigma}
            className="flex items-center gap-2"
          >
            Open in Figma
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}