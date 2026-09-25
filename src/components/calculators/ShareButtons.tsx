"use client";

import { Share2, MessageCircle, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
        <Share2 className="w-4 h-4 mr-1" />
        Share
      </span>
      <Button variant="outline" size="icon" asChild>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z" />
          </svg>
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <MessageCircle className="w-4 h-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="w-4 h-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Link">
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
