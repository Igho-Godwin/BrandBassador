import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_MISSION_FEEDS } from "../graphQL/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import LoadingIcon from "../images/loading.svg";
import {useTranslation} from "react-i18next";
import FeedItemComp from "./FeedItemComp";
import FeedItems from "../types/FeedItems";
import LoadMetaTags from "../hooks/hooks";

function MissionFeeds() {
  const [, i18n] = useTranslation('common');
  const [feeds, setFeeds] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const {  data, fetchMore } = useQuery(LOAD_MISSION_FEEDS, {
    variables: {
      input: {
        limit: 4,
        offset: 0,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setFeeds(data.getFeed.items);
      setHasMore(data.getFeed.hasNextPage);
    }
  }, [data]);

  LoadMetaTags(feeds);



  

  const fetchData = async () => {
    let initialFeeds = [...feeds];
    const { data: data2 }: any = await fetchMore({
      variables: {
        input: {
          limit: 4,
          offset: initialFeeds.length,
        },
      },
    });
    setHasMore(data2.getFeed.hasNextPage);
    setFeeds([...initialFeeds, ...data2.getFeed.items]);
  }


  return (
    
    <Container  data-testid="mission-feeds-container" fluid>
      <Row className="margin-top-20">
        <Col sm={12}>
          <div>
            <Button className="btn-language" onClick={() => i18n.changeLanguage('en')}>English</Button>
            <Button className="margin-left-20 btn-language" onClick={() => i18n.changeLanguage('es')}>Spanish</Button>
          </div>
          <div className="margin-top-20">
            <InfiniteScroll
              dataLength={feeds.length} //This is important field to render the next data
              next={fetchData}
              hasMore={hasMore}
              height={800}
              loader={ <div className="text-center"><Image
                src={LoadingIcon}
                alt={"loading"}
                width={32}
                height={32}
              /></div>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {feeds &&
                feeds.map((item: FeedItems) => {
                  return (
                    <FeedItemComp item={item} />
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
