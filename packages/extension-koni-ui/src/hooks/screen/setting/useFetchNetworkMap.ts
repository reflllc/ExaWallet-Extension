// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useSelector } from 'react-redux';

import { NetworkJson } from '@polkadot/extension-base/background/KoniTypes';
import { RootState } from '@polkadot/extension-koni-ui/stores';

export default function useFetchNetworkMap () {
  const { currentAccount, networkMap } = useSelector((state: RootState) => state);
  const parsedNetworkMap: Record<string, NetworkJson> = {};
  let isEthereum = false;

  if (currentAccount?.account?.type === 'ethereum') {
    isEthereum = true;

    for (const [key, network] of Object.entries(networkMap)) {
      if (network.isEthereum && network.isEthereum) {
        parsedNetworkMap[key] = network;
      }
    }
  } else {
    for (const [key, network] of Object.entries(networkMap)) {
      if (!network.isEthereum || (network.isEthereum && !network.isEthereum)) {
        parsedNetworkMap[key] = network;
      }
    }
  }

  const sorted = Object.entries(parsedNetworkMap)
    .sort(([, networkMap], [, _networkMap]) => {
      if (networkMap.active && !_networkMap.active) {
        return -1;
      } else if (!networkMap.active && _networkMap.active) {
        return 1;
      }

      return 0;
    })
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}) as Record<string, NetworkJson>;

  return { parsedNetworkMap: sorted, isEthereum };
}