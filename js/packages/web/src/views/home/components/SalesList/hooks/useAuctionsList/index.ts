import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import * as _ from 'lodash';
import { useAuctions, AuctionView } from '../../../../../../hooks';

import { LiveAuctionViewState, SortOptions } from '../..';
import { getFilterFunction, resaleAuctionsFilter } from './utils';

export const useAuctionsList = (
  activeKey: LiveAuctionViewState,
  sortBy: SortOptions,
): { auctions: AuctionView[]; hasResaleAuctions: boolean } => {
  const { publicKey } = useWallet();
  const auctions = useAuctions();

  const filteredAuctions = useMemo(() => {
    const filterFn = getFilterFunction(activeKey);
    const filtered = auctions.filter(auction => filterFn(auction, publicKey));

    if (sortBy === SortOptions.New) {
      return _.sortBy(filtered, auction =>
        auction?.auction?.info?.endedAt?.toNumber(),
      );
    }

    if (sortBy === SortOptions.LowToHigh) {
      return _.sortBy(filtered, auction =>
        auction?.auction?.info?.priceFloor?.minPrice?.toNumber(),
      );
    }

    if (sortBy === SortOptions.HighToLow) {
      return _.reverse(
        _.sortBy(filtered, auction =>
          auction?.auction?.info?.priceFloor?.minPrice?.toNumber(),
        ),
      );
    }

    return filtered;
  }, [activeKey, sortBy, auctions, publicKey]);

  const hasResaleAuctions = useMemo(() => {
    return auctions.some(auction => resaleAuctionsFilter(auction));
  }, [auctions]);

  return { auctions: filteredAuctions, hasResaleAuctions };
};
