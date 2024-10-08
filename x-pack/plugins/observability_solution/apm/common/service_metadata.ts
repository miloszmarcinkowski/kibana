/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import {
  CLOUD_AVAILABILITY_ZONE,
  CLOUD_INSTANCE_ID,
  CLOUD_INSTANCE_NAME,
  CLOUD_MACHINE_TYPE,
  CLOUD_PROVIDER,
  CONTAINER_ID,
  HOST_NAME,
  KUBERNETES_CONTAINER_NAME,
  KUBERNETES_NAMESPACE_NAME,
  KUBERNETES_DEPLOYMENT_NAME,
  KUBERNETES_POD_NAME,
  KUBERNETES_POD_UID,
  KUBERNETES_REPLICASET_NAME,
  SERVICE_NODE_NAME,
  SERVICE_RUNTIME_NAME,
  SERVICE_RUNTIME_VERSION,
  SERVICE_VERSION,
} from './es_fields/apm';
import { asMutableArray } from './utils/as_mutable_array';

export const SERVICE_METADATA_SERVICE_KEYS = asMutableArray([
  SERVICE_NODE_NAME,
  SERVICE_VERSION,
  SERVICE_RUNTIME_NAME,
  SERVICE_RUNTIME_VERSION,
] as const);

export const SERVICE_METADATA_CONTAINER_KEYS = asMutableArray([
  CONTAINER_ID,
  HOST_NAME,
  KUBERNETES_POD_UID,
  KUBERNETES_POD_NAME,
] as const);

export const SERVICE_METADATA_INFRA_METRICS_KEYS = asMutableArray([
  KUBERNETES_CONTAINER_NAME,
  KUBERNETES_NAMESPACE_NAME,
  KUBERNETES_REPLICASET_NAME,
  KUBERNETES_DEPLOYMENT_NAME,
] as const);

export const SERVICE_METADATA_CLOUD_KEYS = asMutableArray([
  CLOUD_AVAILABILITY_ZONE,
  CLOUD_INSTANCE_ID,
  CLOUD_INSTANCE_NAME,
  CLOUD_MACHINE_TYPE,
  CLOUD_PROVIDER,
] as const);

export type ContainerType = 'Kubernetes' | 'Docker' | undefined;
