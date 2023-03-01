import type { ReactNode } from "react";

export function withContextProvider<
T extends React.PropsWithChildren
>(
    Component: React.FC<T>,
    ContextProvider: React.FC<{ children: ReactNode }>
) {
    return (props: T) => (
        <ContextProvider>
            <Component {...props} />
        </ContextProvider>
    )
}