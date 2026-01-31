import { Suspense, type ComponentType, type ReactNode } from "react";

const Suspend = <P extends object>(
  Component: ComponentType<P>,
  fallback: ReactNode = <div>Loading...</div>,
) => {
  const SuspendedComponent = (props: P) => {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  SuspendedComponent.displayName = `Suspend(${Component.displayName || Component.name || "Component"})`;

  return SuspendedComponent;
};

export default Suspend;
