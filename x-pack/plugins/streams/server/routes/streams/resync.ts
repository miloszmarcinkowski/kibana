/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { z } from '@kbn/zod';
import { createServerRoute } from '../create_server_route';
import { syncStream, readStream, listStreams } from '../../lib/streams/stream_crud';

export const resyncStreamsRoute = createServerRoute({
  endpoint: 'POST /api/streams/_resync 2023-10-31',
  options: {
    access: 'public',
    availability: {
      stability: 'experimental',
    },
    security: {
      authz: {
        enabled: false,
        reason:
          'This API delegates security to the currently logged in user and their Elasticsearch permissions.',
      },
    },
  },
  params: z.object({}),
  handler: async ({ response, logger, request, getScopedClients }) => {
    const { scopedClusterClient } = await getScopedClients({ request });

    const streams = await listStreams({ scopedClusterClient });

    for (const stream of streams) {
      const { definition } = await readStream({
        scopedClusterClient,
        id: stream.id[0],
      });
      await syncStream({
        scopedClusterClient,
        definition,
        logger,
      });
    }

    return response.ok({});
  },
});
