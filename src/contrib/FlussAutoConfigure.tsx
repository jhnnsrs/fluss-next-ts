import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import result from "../api/lok/fragments";
import { useFluss } from "../fluss";

export const FlussAutoConfigure: React.FC<{}> = (props) => {
  const { configure } = useFluss();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token) {
      configure({
        secure: false,
        wsEndpointUrl: "ws://localhost:8234/graphql",
        endpointUrl: "http://localhost:8234/graphql",
        possibleTypes: result.possibleTypes,
        retrieveToken: () => token,
      });
    }
  }, [token, fakts]);

  return <> </>;
};
