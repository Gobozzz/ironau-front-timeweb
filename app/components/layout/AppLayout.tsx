import type {PropsWithChildren} from "react";
import {ArrowUp} from '@components/ui/ArrowUp/ArrowUp';

export default function AppLayout({children}: PropsWithChildren<unknown>) {
    return (
        <>
            {children}
            <ArrowUp/>
        </>
    );
}
