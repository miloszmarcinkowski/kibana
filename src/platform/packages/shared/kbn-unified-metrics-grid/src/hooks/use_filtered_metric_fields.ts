/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { useMemo, useEffect, useState } from 'react';
import type { MetricField, Dimension } from '@kbn/metrics-experience-plugin/common/types';

export const useFilteredMetricFields = ({
  allFields,
  isFieldsLoading,
  dimensions,
  searchTerm,
  onFilterComplete,
}: {
  allFields: MetricField[];
  isFieldsLoading: boolean;
  dimensions: Dimension[];
  searchTerm: string;
  onFilterComplete?: () => void;
}) => {
  const [filteredFields, setFilteredFields] = useState<MetricField[]>(allFields);

  // Client-side filtering by dimensions and search term
  const dimensionFieldNamesSet = useMemo(
    () => new Set(dimensions.map((d) => d.name)),
    [dimensions]
  );
  const searchTermLower = useMemo(() => searchTerm?.toLowerCase(), [searchTerm]);

  useEffect(() => {
    if (isFieldsLoading) {
      return;
    }

    const hasClientFilters = dimensionFieldNamesSet.size > 0 || searchTermLower?.length > 0;

    if (!hasClientFilters) {
      setFilteredFields(allFields);
      onFilterComplete?.();
      return;
    }

    setFilteredFields(
      allFields.filter((field) => {
        if (searchTermLower && !field.name.toLowerCase().includes(searchTermLower)) {
          return false;
        }
        if (dimensionFieldNamesSet.size > 0) {
          return field.dimensions.some((d) => dimensionFieldNamesSet.has(d.name));
        }

        return true;
      })
    );
    onFilterComplete?.();
  }, [isFieldsLoading, allFields, searchTermLower, dimensionFieldNamesSet, onFilterComplete]);

  return {
    fields: filteredFields,
  };
};
