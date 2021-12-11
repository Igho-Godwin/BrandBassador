import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_MISSION_FEEDS } from "../graphQL/queries";

import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import LoadingIcon from "../images/loading.svg";
import { useTranslation } from "react-i18next";

import FeedItemSection from "./FeedItemSection";
import Feed from "../types/Feed";
import FeedQuery from "../types/FeedQuery";
import useLoadMetaTags from "../hooks/useLoadMetaTags";

function MissionFeeds() {
  const [, i18n] = useTranslation("common");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [language, setLanguage] = useState("en-GB");
  const { data, fetchMore } = useQuery<FeedQuery>(LOAD_MISSION_FEEDS, {
    variables: {
      input: {
        limit: 4,
        offset: 0,
      },
    },
  });

  useEffect(() => {
    if (data) {
      document.title = "BrandBassador Feed Explorer";
      console.log(data.getFeed.items);
      setFeeds(data.getFeed.items);
      setHasMore(data.getFeed.hasNextPage);
    }
  }, [data]);

  useLoadMetaTags(feeds);

  const changeLanguage = (lang: string) => {
    let langData = "";
    if (lang === "en") {
      i18n.changeLanguage("en");
      langData = "en-GB";
    } else {
      i18n.changeLanguage("es");
      langData = "es";
    }
    setLanguage(langData);
  };

  const fetchMoreFeedData = async () => {
    let initialFeeds = [...feeds];
    const { data: feedData } = await fetchMore({
      variables: {
        input: {
          limit: 4,
          offset: initialFeeds.length,
        },
      },
    });
    setHasMore(feedData.getFeed.hasNextPage);
    const newFeed = [...initialFeeds, ...feedData.getFeed.items];
    setFeeds(newFeed);
  };
  let key = 0;
  return (
    <Container data-testid="mission-feeds-container" fluid>
      <Row className="margin-top-20">
        <Col sm={12}>
          <div>
            <Button
              className="btn-language"
              onClick={() => changeLanguage("en")}
              as={"a"}
            >
              English
            </Button>
            <Button
              className="margin-left-20 btn-language"
              onClick={() => changeLanguage("es")}
              as={"a"}
            >
              Spanish
            </Button>
          </div>
          <div className="margin-top-20">
            <InfiniteScroll
              dataLength={feeds.length} //This is important field to render the next data
              next={fetchMoreFeedData}
              hasMore={hasMore}
              height={800}
              loader={
                <div className="text-center">
                  <Image
                    src={LoadingIcon}
                    alt={"loading"}
                    width={32}
                    height={32}
                  />
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {feeds &&
                feeds.map((item: Feed) => {
                  key++;
                  return (
                    <FeedItemSection
                      key={key}
                      language={language}
                      item={item}
                    />
                  );
                })}
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MissionFeeds;
