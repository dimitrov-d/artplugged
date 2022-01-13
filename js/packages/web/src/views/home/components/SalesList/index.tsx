import {
  PageHeader,
  Space,
  Row,
  Col,
  Select,
  SelectProps,
  Layout,
} from 'antd'; import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';
import styled from 'styled-components';
import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';
import { SelectValue } from 'antd/lib/select';
const { Content } = Layout;

const Option = Select.Option;
export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export enum SortOptions {
  New = 'New',
  LowToHigh = 'lowToHigh',
  HighToLow = 'highToLow',
}

const ListingsHeader = styled(PageHeader)`
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
  width: calc(100% + 60px);
  margin-left: -30px;
  padding: 12px 30px;
  backdrop-filter: blur(10px);
  h3 {
    &.ant-typography {
      margin: 0;
    }
  }
`;

interface SelectInlineProps extends SelectProps<SelectValue> {
  label: string;
}

const SelectInline = styled(Select) <SelectInlineProps>`
  width: 190px;
  font-size: 12px;
  line-height: 12px;
  .ant-select-selection-item {
    &:before {
      color: rgba(255, 255, 255, 0.6);
      content: '${({ label }) => label}:';
      display: block;
      font-size: 14px;
      color: grey;
      display: inline-block;
      padding: 0 12px 0 0;
    }
  }
`;

const sortOptions = [
  {
    label: 'New',
    key: SortOptions.New,
  },
  {
    label: 'Low to high',
    key: SortOptions.LowToHigh,
  },
  {
    label: 'High to low',
    key: SortOptions.HighToLow,
  }
];

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.New);
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey, sortBy);
  // const [filterBy] = useState<LiveAuctionViewState>(LiveAuctionViewState.All);
  return (
    <>
      <Banner
        src="/main-banner.svg"
        headingText="Discover, Collect NFT Artworks."
        subHeadingText="Buy exclusive Art Plugged Network curated NFTs"
        actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
        useBannerBg
      />
      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              <ListingsHeader
                ghost={false}
                title={<span>Current listings</span>}
                extra={[
                  <Space key="options" direction="horizontal">
                    <SelectInline
                      value={activeKey}
                      dropdownClassName="select-inline-dropdown"
                      label="Filter"
                      onChange={(nextActiveKey) => setActiveKey(nextActiveKey)}
                    >
                      <Option value={LiveAuctionViewState.All}> <span className="live"></span> Live</Option>
                      {hasResaleAuctions && (
                        <Option value={LiveAuctionViewState.Resale}>Secondary</Option>
                      )}
                      <Option value={LiveAuctionViewState.Ended}>Ended</Option>
                      <Option value={LiveAuctionViewState.Participated}>Participated</Option>
                    </SelectInline>
                    <SelectInline
                      label="Sort"
                      dropdownClassName="select-inline-dropdown"
                      value={sortBy}
                      onChange={(nextSortBy) => setSortBy(nextSortBy)}
                    >
                      {sortOptions.map(({ label, key }) => (
                        <Option key={key} value={key}>
                          {label}
                        </Option>
                      ))}
                    </SelectInline>
                  </Space>,
                ]}
              />
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  auctions.map(auction => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
