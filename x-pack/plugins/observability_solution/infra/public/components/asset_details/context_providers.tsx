/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { SearchSessionProvider } from '../../hooks/use_search_session';
import { AssetDetailsRenderPropsProvider } from './hooks/use_asset_details_render_props';
import { DatePickerProvider } from './hooks/use_date_picker';
import { LoadingStateProvider } from './hooks/use_loading_state';
import { MetadataStateProvider } from './hooks/use_metadata_state';
import type { AssetDetailsProps, RenderMode } from './types';

const RenderWithOptionalSearchSessionProvider = ({
  renderMode,
  children,
}: {
  renderMode: RenderMode;
  children: React.ReactNode;
}) => {
  if (renderMode.mode === 'flyout') {
    // flyout mode requires its own search session so that it doesn't interfere with the main page
    return <SearchSessionProvider>{children}</SearchSessionProvider>;
  }
  return <>{children}</>;
};

export const ContextProviders = ({
  children,
  ...props
}: Omit<AssetDetailsProps, 'links' | 'tabs' | 'activeTabId' | 'metricsIndexPattern'> & {
  children: React.ReactNode;
}) => {
  const {
    assetId,
    assetName,
    autoRefresh,
    dateRange,
    overrides,
    assetType = 'host',
    renderMode,
  } = props;

  return (
    <RenderWithOptionalSearchSessionProvider renderMode={renderMode}>
      <DatePickerProvider dateRange={dateRange} autoRefresh={autoRefresh}>
        <LoadingStateProvider>
          <MetadataStateProvider assetId={assetId} assetType={assetType}>
            <AssetDetailsRenderPropsProvider
              assetId={assetId}
              assetName={assetName}
              assetType={assetType}
              overrides={overrides}
              renderMode={renderMode}
            >
              {children}
            </AssetDetailsRenderPropsProvider>
          </MetadataStateProvider>
        </LoadingStateProvider>
      </DatePickerProvider>
    </RenderWithOptionalSearchSessionProvider>
  );
};
