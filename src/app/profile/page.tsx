"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/app-layout";
import { UserInfoCard } from "@/components/pages/profile/UserInfoCard";
import { SecuritySettings } from "@/components/pages/profile/SecuritySettings";
import { AppearanceSettings } from "@/components/pages/profile/AppearanceSettings";

export default function ProfilePage() {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "",
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserInfoCard {...userData} />

          <Card className="p-6 col-span-1 md:col-span-2">
            <Tabs defaultValue="security" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>

              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="appearance">
                <AppearanceSettings />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}