import React from 'react';
import { Skeleton, Row } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { ListingPreviewContainer, NFTPreview, Square, StyledSkeletonImage } from '../Banner/styled';
import { AuctionCountdown } from '../AuctionNumbers';
import { AuctionView, useArt, useCreators } from '../../hooks';


// function calculateTimeLeft(endTime: string) {
//     let now = DateTime.local();
//     let end = DateTime.fromISO(endTime);

//     return Duration.fromObject(end.diff(now).toObject());
// }

// function Countdown(props: { endTime: string }) {
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.endTime));

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setTimeLeft(calculateTimeLeft(props.endTime));
//         }, 1000);
//         // Clear timeout if the component is unmounted
//         return () => clearTimeout(timer);
//     });

//     if (timeLeft.valueOf() < 0) return <span></span>;

//     const format = timeLeft.toFormat('hh:mm:ss');

//     return <span>{format}</span>;
// }

// function AuctionCountdown(props: { endTime: string }) {
//     const timeDiffMs = DateTime.fromISO(props.endTime).toMillis() - Date.now();
//     const lessThanADay = timeDiffMs < 86400000; // one day in ms

//     if (lessThanADay) {
//         // only return the "expensive" Countdown component if required
//         return <Countdown endTime={props.endTime} />;
//     } else {
//         const timeLeft = calculateTimeLeft(props.endTime).toFormat('dd:hh:mm:ss');

//         const daysLeft2 = Number(timeLeft.slice(0, 2));

//         return (
//             <span>
//                 Ends in {daysLeft2} day{daysLeft2 > 1 && 's'}
//             </span>
//         );
//     }
// }

// adds the active loading animation to the antd skeleton image


export function generateListingShell(id: number): any {
    const now = new Date().toISOString();
    const nextWeek = new Date(now).toISOString();

    return {
        listingAddress: id + '',
        highestBid: 0,
        lastBidTime: null,
        priceFloor: 0,
        instantSalePrice: 0,
        totalUncancelledBids: 0,
        ended: false,
        items: [
            {
                metadataAddress: '',
                name: '',
                uri: '',
            },
        ],
        createdAt: now,
        endsAt: nextWeek,
        subdomain: '',
        storeTitle: '',
    };
}
export interface Creator {
    address: string;
    verified?: boolean;
    share: number;
}
export interface NFTMetadata {
    description: string;
    external_url: string;
    image: string; // url to image, often ipfs, sometimes arweave
    name: string;
    seller_fee_basis_points: number; // in thousands. Prbably need to divide by 100
    symbol: string;
    properties: {
        category: 'image' | string;
        creators: Creator[];
        files: {
            type: 'image/gif' | string;
            uri: string; // arweave URI
        }[];
    };
}

// Going with a full replace of the listing during loading for now, but might revert to swapping individual parts of the component below with its loading state. (as done in a previous commit)
export function SkeletonListing() {
    return (
        <ListingPreviewContainer>
            <Square>
                <StyledSkeletonImage style={{ borderRadius: '8px', width: '100%', height: '100%' }} />
            </Square>
            <Row justify="space-between">
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
            </Row>
            {/* Without this height: 22 there is an annoying height difference between Skeleton and real listing */}
            {/* style={{ height: 22 }} */}
            {/* Well, now it worked again. Maybe it'sa  browser thing */}
            <Row justify="space-between">
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
            </Row>
        </ListingPreviewContainer>
    );
}

const CustomImageMask = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 72px;
  height: 72px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    position absolute;
    right: 24px;
    bottom: 24px;

  }
`;

// const captureCid = /https:\/\/(.*).ipfs.dweb.*$/;
// const maybeCDN = (uri: string) => {
//     const cdnURI = uri.replace(captureCid, `${process.env.NEXT_PUBLIC_IPFS_CDN_HOST}/$1`);
//     return cdnURI ?? uri;
// };

// export function getListingPrice(listing: Listing) {
//     return (
//         (listing.highestBid
//             ? listing.highestBid
//             : listing.priceFloor
//                 ? listing.priceFloor
//                 : listing.instantSalePrice) || 0
//     );
// }

// export function getFormatedListingPrice(listing: Listing) {
//     return Number((getListingPrice(listing) * 0.000000001).toFixed(2));
// }

export function lamportToSolIsh(lamports: number | null) {
    if (!lamports) return null;
    return Number((lamports * 0.000000001).toFixed(2));
}

export interface AuctionViewInt {
    auction: AuctionView;
}

export const ListingPreview = (props: AuctionViewInt) => {
    // const id = auctionView.thumbnail.metadata.pubkey;
    // setTimeout(() => {

    //     const art = useArt(id);
    //     const creators = useCreators(auctionView);
    //     const name = art?.title || ' ';
    // }, 3000)
    // const storeHref = `https://${listing?.subdomain}.holaplex.com/listings/${listing.listingAddress}`;

    // const cardRef = useRef(null);
    // const { inViewport } = useInViewport(cardRef);
    const [cardRef, inView] = useInView({
        threshold: 0,
    });

    const [showArtPreview, setShowArtPreview] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nft, setNFT] = useState<NFTMetadata | null>(null);

    useEffect(() => {
        async function fetchAuctionData() {
            if (!props.auction) return;
            const res = await fetch(props.auction.thumbnail.metadata.info.data.uri);
            if (res.ok) {
                const nftJson: NFTMetadata = await res.json();
                setNFT(nftJson);
                setLoading(false);
            }

        }

        fetchAuctionData();
        // async function fetchNFTDataFromIPFS() {
        //     const res = await fetch(maybeCDN(nftMetadata.uri));

        //     if (res.ok) {
        //         const nftJson: NFTMetadata = await res.json();
        //

        //     }
        // }
        // if (!nftMetadata?.uri) {
        //     return;
        // }

        // fetchNFTDataFromIPFS();
    }, [props.auction]);

    // shows up to 2 decimals, but removes pointless 0s
    // const displayPrice = getFormatedListingPrice(listing);

    // no subdomain means it's a shell/skeleton
    if (loading) {
        return <SkeletonListing />;
    }

    return (
        <div
            ref={cardRef}
        >
            <a rel="nofollow noreferrer" target="_blank">
                <ListingPreviewContainer>
                    <Square>
                        <NFTPreview
                            $show={inView}
                            src={(nft as any)?.image}
                            preview={{
                                visible: showArtPreview,
                                mask: (
                                    <CustomImageMask
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setShowArtPreview(true);
                                        }}
                                    >
                                        <CustomExpandIcon />
                                    </CustomImageMask>
                                ),
                                onVisibleChange: (visible, prevVisible) => {
                                    prevVisible && setShowArtPreview(visible);
                                },
                                destroyOnClose: true,
                            }}
                        />
                        {/* <AuctionCountdown auctionView={props.auctions[0]} labels={false} /> */}

                    </Square>
                    {/* <Row justify="space-between" align="middle" wrap={false}>
                        <ListingTitle level={3} ellipsis={{ tooltip: nftMetadata?.name }}>
                            {nftMetadata?.name}
                        </ListingTitle>
                        <h3 className={listing.endsAt && !listing.totalUncancelledBids ? 'no_bids' : ''}>
                            <Price size={18} price={displayPrice} />
                        </h3>
                    </Row>
                    <Row justify="space-between">
                        <ListingSubTitle ellipsis={{ tooltip: listing.storeTitle }}>
                            {listing.storeTitle}
                        </ListingSubTitle>
                        {listing.endsAt ? <AuctionCountdown endTime={listing.endsAt} /> : <span>Buy now</span>}
                    </Row>
                    {isDev && (
                        <Row justify="space-between" wrap={false}>
                            <span
                                style={{
                                    fontSize: 14,
                                    opacity: 0.6,
                                }}
                            >
                                Listed {listing.createdAt.slice(5, 16)}
                            </span>
                            <span
                                style={{
                                    fontSize: 14,
                                    opacity: 0.6,
                                }}
                            >
                                Bids: {listing.totalUncancelledBids}, ({listing.lastBidTime?.slice(5, 16)})
                            </span>
                        </Row>
                    )} */}
                </ListingPreviewContainer>
            </a>
        </div>
    );
}

const CustomExpandIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#f4f4f4" />
        <path
            d="M13.75 6.75H17.25V10.25"
            stroke="#161616"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10.25 17.25H6.75V13.75"
            stroke="#161616"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.25 6.75L13.1667 10.8333"
            stroke="#161616"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6.75 17.25L10.8333 13.1667"
            stroke="#161616"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
