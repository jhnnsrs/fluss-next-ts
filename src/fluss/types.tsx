import {
  ApolloClient,
  NormalizedCacheObject,
  PossibleTypesMap,
} from "@apollo/client";

export type FlussConfig = {
  endpointUrl: string;
  wsEndpointUrl: string;
  secure: boolean;
  retrieveToken: () => string;
  possibleTypes?: PossibleTypesMap;
};

export type FlussState = {
  config?: FlussConfig;
  client?: FlussClient;
};

export type FlussContextType = FlussState & {
  configure: (config?: FlussConfig) => void;
};

export type FlussClient = ApolloClient<NormalizedCacheObject>;
