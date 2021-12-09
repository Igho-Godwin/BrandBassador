import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_MISSION_FEEDS } from "../graphQL/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import giftBoxIcon from "../images/giftBoxIcon.png";
import LoadingIcon from "../images/loading.svg";
import {useTranslation} from "react-i18next";
type FeedItem = {
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

function MissionFeeds() {
  const [t, i18n] = useTranslation('common');
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

  useEffect(() => {
    if (feeds.length > 0) {
      let initialFeed = feeds[feeds.length-1];
      console.log(initialFeed);
     let twitterTitle = document.querySelector('meta[name="twitter:title"]') as any;
     let twitterDescription = document.querySelector('meta[name="twitter:title"]') as any;
     let twitterImage = document.querySelector('meta[name="twitter:image"]') as any;
     
     //let x =   document.getElementsByTagName("twitter:card") as  any;
     twitterTitle.setAttribute("content", initialFeed.title);
     twitterDescription.setAttribute("content", initialFeed.title);
     if(initialFeed.image.src){
         twitterImage.setAttribute("content", initialFeed.image.src);
     }
     else{
      twitterImage.setAttribute("content", initialFeed.video.src);
     }
    }
  });

  

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
  };

  const formatDate = (date: string) => {
    const dateFormat = new Date(date);
    const newDate = dateFormat
      .toLocaleDateString("en-GB", {
        year: "numeric",
        day: "numeric",
        month: "long",
      })
      .split(",");
    return newDate;
  };

  return (
    <Container fluid>
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
                feeds.map((item: FeedItem) => {
                  return (
                    <div className="margin-bottom-20 ">
                      {item.date && (
                        <div className="margin-bottom-10 font-16">
                          {formatDate(item.date)}
                        </div>
                      )}
                      <div className="grey-background padding-bottom-10">
                        {item.image && (
                          <div>
                            <Image
                              src={item.image.src}
                              alt={item.image.alt}
                              height={228}
                              width={343}
                            />
                          </div>
                        )}

                        {item.video && (
                          <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                              title={item.video.alt}
                              className="embed-responsive-item"
                              src={item.video.src}
                              height={228}
                              width={343}
                            ></iframe>
                          </div>
                        )}
                        <div className="margin-bottom-10">
                          {item.title && item.title}
                        </div>
                        <div className="text-center margin-bottom-5">
                          <button className="reward-Button">
                            <Image src={giftBoxIcon} /> {t('reward.title')} $ {item.cashReward}
                          </button>
                        </div>
                      </div>
                    </div>
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
