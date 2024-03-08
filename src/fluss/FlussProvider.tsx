import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React, { useState } from "react";
import { createFlussClient } from "./client";
import { FlussContext } from "./FlussContext";
import { FlussConfig, FlussState } from "./types";

export type FlussProps = {
  children: React.ReactNode;
  clientCreator?: (
    config: FlussConfig
  ) => ApolloClient<NormalizedCacheObject>;
};

export const FlussProvider: React.FC<FlussProps> = ({
  children,
  clientCreator = createFlussClient,
}) => {
  const [state, setState] = useState<FlussState>({
    config: undefined,
    client: undefined,
  });

  const configure = (config?: FlussConfig) => {
    if (!config) {
      setState({
        config: undefined,
        client: undefined,
      });
      return;
    }

    setState({ config: config, client: clientCreator(config) });
  };

  return (
    <FlussContext.Provider
      value={{
        configure: configure,
        ...state,
      }}
    >
      {children}
    </FlussContext.Provider>
  );
};
