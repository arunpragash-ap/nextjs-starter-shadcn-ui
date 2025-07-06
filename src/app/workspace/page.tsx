'use client'

import AppLayout from "@/components/layout/app-layout";
import { WorkspaceModal } from "./workspace-modal";
export default function Workspace() {

    return (
        <AppLayout>
            <div className="flex flex-row-reverse">
                <WorkspaceModal />
            </div>
        </AppLayout>
    )
}