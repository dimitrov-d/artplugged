import styled from 'styled-components';
import { Carousel, Card, Row, Image, Typography, Skeleton } from 'antd';
export const { Title, Text } = Typography;

export const HeroCarousel = styled(Carousel)`
  .carousel-dots {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -24px;
    margin-right: 0px;
    justify-content: flex-end;
  }

  .carousel-dots > li > button {
    opacity: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 100%;
  }

  .slick-dots li {
    > button {
      display: block;
      width: 100%;
      color: white;
      font-size: 0;
      background: #222;
      border: 1px solid grey;
      border-radius: 1px;
      outline: none;
      cursor: pointer;
      opacity: 1;
    }

    &.slick-active {
      > button {
        background: #f4f4f4;
        width: 24px;
      }
    }
  }
`;

export const ListingPreviewContainer = styled(Card)`
  background: white !important;
  border: none;
  border-radius: 5px !important;
  height: 500px;
  > .ant-card-body {
    padding: 0;
  }

  .no_bids {
    opacity: 0.6;
  }
`;

export const Square = styled(Row)`
  position: relative;
  flex-basis: calc(33.333% - 10px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  margin-bottom: 13px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .ant-image-mask {
    background: rgba(0, 0, 0, 0) !important;
  }
`;

export const NFTPreview = styled(Image)<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  border: solid 1px black !important;
`;

export const ListingTitle = styled(Title)`
  margin-bottom: 4px !important;
  font-size: 18px !important;
  flex-grow: 1;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* width: 14rem; No longer needed because of flex grow, i think */

  + h3 {
    color: black !important;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    font-size: 18px;
  }
`;

export const ListingSubTitle = styled(Text)`
  font-size: 14px;
  opacity: 0.6;
  flex-grow: 1;
  max-width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* width: 14rem; No longer needed because of flex grow, i think */

  + span {
    font-size: 14px;
    flex-shrink: 0;
    opacity: 0.6;
  }
`;

export const StyledSkeletonImage = styled(Skeleton.Image)`
  background: linear-gradient(
    90deg,
    rgba(34, 34, 34, 0.2) 25%,
    rgba(255, 255, 255, 0.16) 37%,
    rgba(34, 34, 34, 0.2) 63%
  );
  background-size: 400% 100%;
  animation: ant-skeleton-loading 1.4s ease infinite;
  border-radius: 8px;

  > .ant-skeleton-image > svg {
    display: none;
  }
`;
