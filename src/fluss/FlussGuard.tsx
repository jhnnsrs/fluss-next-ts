import React from "react";
import { useFluss } from "./FlussContext";

export const FlussGuard: React.FC<{
  key?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ key, children, fallback }) => {
  const { client } = useFluss();

  if (client) return <>{children}</>;

  return <>{fallback || `Not yet with Fluss`}</>;
};

export const flussGuarded = <T extends {}>(
  Child: React.ComponentType<T>,
  fallback?: React.ReactNode
) => {
  return (props: any) => (
    <FlussGuard fallback={fallback}>
      <Child {...props} />
    </FlussGuard>
  );
};
