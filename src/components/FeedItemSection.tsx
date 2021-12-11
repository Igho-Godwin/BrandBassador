import React, { FC } from "react";

import { Image } from "react-bootstrap";
import giftBoxIcon from "../images/giftBoxIcon.png";
import Feed from "../types/Feed";

import { useTranslation } from "react-i18next";

type FeedItemSectionProps = {
  item: Feed;
  language: string;
};

const FeedItemSection: FC<FeedItemSectionProps> = ({ item, language }) => {
  const [t] = useTranslation("common");

  const formatDate = (date: string) => {
    const dateFormat = new Date(date);

    if (language !== "en-GB") {
      var months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      return (
        dateFormat.getDate() +
        " " +
        months[dateFormat.getMonth()] +
        " " +
        dateFormat.getFullYear()
      );
    }

    const newDate = dateFormat.toLocaleString(language, {
      year: "numeric",
      day: "numeric",
      month: "long",
    });

    return newDate;
  };

  return (
    <div className="margin-bottom-20 " data-testid="feed-item-container">
      {item.date && (
        <div className="margin-bottom-10 font-16">{formatDate(item.date)}</div>
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
        <div className="margin-bottom-10">{item.title && item.title}</div>
        <div className="text-center margin-bottom-5">
          <button className="reward-Button">
            <Image src={giftBoxIcon} alt="rewardIcon" /> {t("reward.title")} ${" "}
            {item.cashReward}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedItemSection;
