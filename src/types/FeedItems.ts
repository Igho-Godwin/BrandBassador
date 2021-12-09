type FeedItems = {
    title: string;
    date: string;
    video: {
      alt: string;
      src: string;
    };
    image: {
      alt: string;
      src: string;
    };
    cashReward: number;
};

export default FeedItems;
