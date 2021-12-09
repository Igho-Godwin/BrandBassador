import { gql } from "@apollo/client";

export const LOAD_MISSION_FEEDS = gql`
  query ($input: GetFeedInput!) {
    getFeed(input: $input) {
      items {
        __typename
        ... on IGStoryMission {
          title
          date
          video {
            src
            alt
          }
          cashReward
        }
        ... on FBPostMission {
          title
          date
          image {
            src
            alt
          }
          cashReward
        }
      }
      hasNextPage
    }
  }
`;
