import React from 'react';
import { AuctionView } from '../../hooks';
import { CardProps } from 'antd';
import { useTokenList } from '../../contexts/tokenList';
import { useAuctionStatus } from '../AuctionRenderCard/hooks/useAuctionStatus';
import { AmountLabel } from '../AmountLabel';

export interface AuctionCard extends CardProps {
    auction: AuctionView;
}

export function ListingPrice(props: AuctionCard) {
    const { auction } = props;

    const tokenInfo = useTokenList().mainnetTokens.filter(m => m.address == auction.auction.info.tokenMint)[0]
    const { amount } = useAuctionStatus(auction);
    return (<AmountLabel
        containerStyle={{ flexDirection: 'row' }}
        displayUSD={true}
        amount={amount}
        iconSize={25}
        tokenInfo={tokenInfo}
    />);
}
