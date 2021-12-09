import Feed from "./Feed";

type FeedQuery = {
  getFeed : {
    item: Feed[];
    hasNextPage: boolean;
  };
};

export default Feed;
