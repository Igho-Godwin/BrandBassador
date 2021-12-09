import React, { useEffect } from "react";
import feed from "../types/feed";
export default function LoadMetaTags(feeds:feed) {

  useEffect(() => {
    if (feeds.length > 0) {
      let initialFeed = feeds[feeds.length - 1];
      console.log(initialFeed);
      let twitterTitle = document.querySelector(
        'meta[name="twitter:title"]'
      ) as any;
      let twitterDescription = document.querySelector(
        'meta[name="twitter:title"]'
      ) as any;
      let twitterImage = document.querySelector(
        'meta[name="twitter:image"]'
      ) as any;

      //let x =   document.getElementsByTagName("twitter:card") as  any;
      twitterTitle.setAttribute("content", initialFeed.title);
      twitterDescription.setAttribute("content", initialFeed.title);
      if (initialFeed.image.src) {
        twitterImage.setAttribute("content", initialFeed.image.src);
      } else {
        twitterImage.setAttribute("content", initialFeed.video.src);
      }
    }
  }, [feeds]);

}
