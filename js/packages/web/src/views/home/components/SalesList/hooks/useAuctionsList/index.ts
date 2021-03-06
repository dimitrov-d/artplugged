import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import * as _ from 'lodash';
import { useAuctions, AuctionView } from '../../../../../../hooks';

import { LiveAuctionViewState, SortOptions } from '../..';
import { getFilterFunction, resaleAuctionsFilter } from './utils';

export const useAuctionsList = (
  activeKey: LiveAuctionViewState,
  sortBy: SortOptions,
): {
  auctions: AuctionView[];
  hasResaleAuctions: boolean;
  firstFiveAuctions: AuctionView[];
} => {
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
  const hasResaleAuctions = useMemo(
    () => auctions.some(auction => resaleAuctionsFilter(auction)),
    [auctions],
  );
  const firstFiveAuctions = useMemo(
    () =>
      _.take(
        _.reverse(
          _.sortBy(auctions, auction =>
            auction?.auction?.info?.endedAt?.toNumber(),
          ),
        ),
        5,
      ),
    [auctions],
  );

  return { auctions: filteredAuctions, hasResaleAuctions, firstFiveAuctions };
};
