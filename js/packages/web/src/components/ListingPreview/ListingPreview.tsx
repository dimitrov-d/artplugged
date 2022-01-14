import React from 'react';
import { Skeleton, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CustomImageMask, ListingPreviewContainer, ListingTitle, NFTPreview, Square, StyledSkeletonImage } from '../Banner/styled';
import { AuctionCountdown } from '../AuctionNumbers';
import { AuctionView } from '../../hooks';

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

export function lamportToSolIsh(lamports: number | null) {
    if (!lamports) return null;
    return Number((lamports * 0.000000001).toFixed(2));
}

export const ListingPreview = (props: { auction: AuctionView }) => {
    const [cardRef, inView] = useInView({ threshold: 0 });

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
    }, [props.auction]);

    return loading ? <SkeletonListing /> : (
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
                    </Square>
                    <Row justify="space-between" align="middle" wrap={false}>
                        <ListingTitle level={3} ellipsis={{ tooltip: nft?.name }}>
                            {nft?.name}
                        </ListingTitle>
                        <h3>
                            price
                        </h3>
                    </Row>
                    <AuctionCountdown auctionView={props.auction} labels={false} black={true} />
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
