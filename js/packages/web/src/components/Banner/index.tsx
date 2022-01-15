import React from 'react';
import { useEffect } from 'react';
import { AuctionView } from '../../hooks';
import { Typography } from 'antd';
const { Text } = Typography;
import { HeroCarousel } from './styled';
import { ListingPreview, SkeletonListing } from '../ListingPreview/ListingPreview';
export const Banner = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
  auctions: AuctionView[];
  isLoading: boolean;
}) => {
  useEffect(() => {
    const mainBg = document.getElementById('main-bg');
    const gradient = document.getElementById('bg-gradient');
    if (mainBg && props.useBannerBg) {
      mainBg.style.backgroundImage = `url(${props.src})`;
      mainBg.style.display = 'inline-block';
      if (gradient) {
        gradient.style.display = 'inline-block';
      }
    }

    return () => {
      const mainBg = document.getElementById('main-bg');
      const gradient = document.getElementById('bg-gradient');
      if (mainBg && props.useBannerBg) {
        mainBg.style.backgroundImage = '';
        mainBg.style.display = 'none';
      }
      if (gradient) gradient.style.display = 'none';
    };
  }, [props.src, props.useBannerBg, props.auctions, props.isLoading]);

  return (
    <>
      <div id="mobile-banner">
        <img className="banner-img" src={props.src} />
        <div className="banner-content">
          <div id={'main-heading'}>{props.headingText}</div>
          <div id={'sub-heading'}>{props.subHeadingText}</div>
          {props.actionComponent}
        </div>
      </div>
      <div id={'current-banner'}>
        <div id="artwork">
          <Text strong style={{ fontSize: '20px' }}>Latest Listings</Text>
          {props.isLoading && <SkeletonListing />}
          {!props.isLoading &&
            <HeroCarousel autoplay={true} dots={{ className: 'carousel-dots' }} dotPosition="top">
              {props.auctions.map((auction, idx) =>
                <ListingPreview
                  key={idx}
                  auction={auction}
                />
              )}
              {/* <ListingPreview
              key={0}
              auction={props.auctions[0]}
            /> */}
            </HeroCarousel>
          }
        </div>
        <div id="banner-inner">
          <div id={'message-container'}>
            <div id={'main-heading'}>{props.headingText}</div>
            <div id={'sub-heading'}>{props.subHeadingText}</div>
            {props.actionComponent}
            {/* <div className="powered-by">
              <span>
                POWERED BY <b>METAPLEX AND SOLANA</b>
              </span>
            </div> */}
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};
