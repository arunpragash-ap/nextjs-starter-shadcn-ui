"use client";
import AppLayout from "@/components/layout/app-layout";
import OptionsForm from "@/components/options/options-form";
import { OptionsSidebar } from "@/components/options/options-sidebar";
import OptionsTable from "@/components/options/options-table";


import { Card, CardContent } from "@/components/ui/card";
import { Banknote, Home, Leaf } from "lucide-react";
import { useState } from "react";

const Options = () => {
    const [activeMenu, setActiveMenu] = useState("kizhangu_type")

    const menus = [
        { name: "Kizhangu Type", value: "kizhangu_type", icon: Leaf },
        { name: "Bank", value: "bank", icon: Banknote },
        { name: "Home", value: "home", icon: Home },
    ]
    return (
        <AppLayout >
            <div className="flex gap-2 h-full w-full">
                <OptionsSidebar
                    menuItems={menus}
                    activeValue={activeMenu}
                    onSelect={setActiveMenu}
                />
                <div className="w-9/11 md:w-3/4 lg:w-5/6">
                    <Card className="dark:bg-slate-800 h-full">
                        <CardContent className="p-4 space-y-4">
                            <OptionsForm type={activeMenu} />
                            <OptionsTable type={activeMenu} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}

export default Options;