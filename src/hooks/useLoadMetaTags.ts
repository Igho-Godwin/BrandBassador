import React, { useEffect } from "react";
import Feed from "../types/Feed";

export default function useLoadMetaTags(feeds: Feed[]) {
  useEffect(() => {
    if (feeds.length > 0) {
      const initialFeed = feeds[feeds.length - 1];

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector(
        'meta[name="twitter:title"]'
      );
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      twitterTitle?.setAttribute("content", initialFeed.title);
      twitterDescription?.setAttribute("content", initialFeed.title);
      if (initialFeed.image.src) {
        twitterImage?.setAttribute("content", initialFeed.image.src);
      } else {
        twitterImage?.setAttribute("content", initialFeed.video.src);
      }
    }
  }, [feeds]);
}
