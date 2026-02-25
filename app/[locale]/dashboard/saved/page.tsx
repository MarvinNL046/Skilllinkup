'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ItemTypeIcon({ itemType }: { itemType: string }) {
  const icons: Record<string, string> = {
    gig: 'flaticon-presentation',
    freelancer: 'flaticon-user',
    project: 'flaticon-content',
  };
  return <i className={`${icons[itemType] ?? 'flaticon-like'} fz20`} />;
}

function ItemTypeBadge({ itemType }: { itemType: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    gig: { label: 'Service', cls: 'text-thm' },
    freelancer: { label: 'Freelancer', cls: 'text-success' },
    project: { label: 'Project', cls: 'text-info' },
  };
  const { label, cls } = map[itemType] ?? { label: itemType, cls: 'text-muted' };
  return <span className={`fz12 fw500 ${cls}`}>{label}</span>;
}

function SavedItemCard({
  item,
  onRemove,
}: {
  item: {
    _id: string;
    itemType: string;
    itemId: string;
    itemTitle?: string;
    itemImage?: string;
    itemUrl?: string;
    createdAt: number;
  };
  onRemove: (itemId: string) => void;
}) {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="ps-widget bgc-white bdrs4 p25 mb30 overflow-hidden position-relative">
        {/* Thumbnail */}
        <div
          className="mb20 bdrs4 overflow-hidden d-flex align-items-center justify-content-center bgc-light"
          style={{ height: 140 }}
        >
          {item.itemImage ? (
            <img
              src={item.itemImage}
              alt={item.itemTitle ?? 'Saved item'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <ItemTypeIcon itemType={item.itemType} />
          )}
        </div>

        {/* Content */}
        <div className="d-flex align-items-start justify-content-between">
          <div className="flex-grow-1 mr10">
            <ItemTypeBadge itemType={item.itemType} />
            <h6 className="mb5 mt5 fw600 fz15">
              {item.itemTitle ?? 'Untitled'}
            </h6>
            <p className="mb0 fz12 text-muted">Saved {formatDate(item.createdAt)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center justify-content-between mt15">
          {item.itemUrl ? (
            <Link href={item.itemUrl} className="ud-btn btn-thm2 bdrs4 fz13 py5 px15">
              View
            </Link>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => onRemove(item.itemId)}
            className="ud-btn btn-light-thm bdrs4 fz13 py5 px15 text-danger border-0 bg-transparent"
            title="Remove from saved"
          >
            <i className="flaticon-delete fz14 mr5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SavedPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const locale = useLocale();

  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  const savedItems = useQuery(
    api.marketplace.savedItems.list,
    convexUser?._id ? { userId: convexUser._id as Id<'users'> } : 'skip'
  );

  const removeMutation = useMutation(api.marketplace.savedItems.remove);

  const loading =
    !isLoaded || convexUser === undefined || savedItems === undefined;

  async function handleRemove(itemId: string) {
    if (!convexUser?._id) return;
    await removeMutation({
      userId: convexUser._id as Id<'users'>,
      itemId,
    });
  }

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Saved Items</h2>
              <p className="text">
                {loading
                  ? 'Loading...'
                  : `${savedItems?.length ?? 0} saved item${(savedItems?.length ?? 0) !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="row">
            <div className="col-lg-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
                <div className="spinner-border text-thm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt20 mb0 fz15">Loading saved items...</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && savedItems && savedItems.length === 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
                <span className="flaticon-like fz60 text-muted mb20 d-block" />
                <h4>No Saved Items Yet</h4>
                <p className="text mb30">
                  You haven&apos;t saved any items yet. Browse services and freelancers
                  to save your favorites.
                </p>
                <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                  <Link
                    href={`/${locale}/marketplace`}
                    className="ud-btn btn-thm2 bdrs4"
                  >
                    <i className="flaticon-presentation mr10" />
                    Browse Services
                  </Link>
                  <Link
                    href={`/${locale}/marketplace/freelancers`}
                    className="ud-btn btn-white bdrs4"
                  >
                    <i className="flaticon-user mr10" />
                    Find Freelancers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved items grid */}
        {!loading && savedItems && savedItems.length > 0 && (
          <div className="row">
            {savedItems.map((item) => (
              <SavedItemCard
                key={item._id}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
