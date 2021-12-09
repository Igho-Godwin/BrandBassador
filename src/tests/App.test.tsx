import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MissionFeeds from "../components/MissionFeeds";
import FeedItemComp from "../components/FeedItemSection";
import { ApolloProvider } from "@apollo/client";
import { I18nextProvider } from "react-i18next";
import i18next from "../translation";
import client from "../apollo-client";

Enzyme.configure({ adapter: new Adapter() });

describe("Test Case For App", () => {
  it("should render mission feeds component", () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
          <MissionFeeds />
        </I18nextProvider>
      </ApolloProvider>
    );
    const comp = wrapper.find('[data-testid="mission-feeds-container"]');
    expect(comp.exists()).toBeTruthy();
  });

  it("should render Feed Item component", () => {
    const item = {
      title: "title",
      date: "date",
      video: {
        alt: "alt",
        src: "SRC",
      },
      image: {
        alt: "alt",
        src: "SRC",
      },
      cashReward: 5,
    };
    const wrapper = mount(
      <I18nextProvider i18n={i18next}>
        <FeedItemComp item={item} />
      </I18nextProvider>
    );
    const comp = wrapper.find('[data-testid="feed-item-container"]');
    expect(comp.exists()).toBeTruthy();
  });
});
