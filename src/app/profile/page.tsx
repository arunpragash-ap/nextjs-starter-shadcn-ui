"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setColorTheme, setThemeMode } from "@/store/theme/slice";
import { Moon, Sun, User } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import MfaSetupDialog from "@/components/mfa/MfaSetupDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaDialogOpen, setMfaDialogOpen] = useState(false);
  const [mfaMode, setMfaMode] = useState<"setup" | "disable">("setup");
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "",
  };
  const dispatch = useAppDispatch();
  const { colorTheme, mode } = useAppSelector((state) => state.theme);

  // Theme options
  const themes = [
    { label: "Orange", value: "orange-theme" },
    { label: "Blue", value: "blue-theme" },
    { label: "Red", value: "red-theme" },
    { label: "Violet", value: "violet-theme" },
    { label: "Green", value: "green-theme" },
    { label: "Rose", value: "rose-theme" },
    { label: "Yellow", value: "yellow-theme" },
    { label: "Default", value: "default-theme" },
  ];

  // Handle MFA toggle
  const handleMfaToggle = async () => {
    if (mfaEnabled) {
      // Open dialog to disable MFA
      setMfaMode("disable");
    } else {
      // Open dialog to enable MFA
      setMfaMode("setup");
    }
    setMfaDialogOpen(true);
  };

  // Handle successful MFA setup/disable
  const handleMfaSuccess = () => {
    setMfaEnabled((prev) => !prev);
  };

  // Redux theme handlers
  const handleColorThemeChange = (theme: string) => {
    dispatch(setColorTheme(theme));
  };
  const handleModeChange = (mode: 'light' | 'dark' ) => {
    dispatch(setThemeMode(mode));
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="p-6 col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                {userData.avatarUrl ? (
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                ) : (
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Settings Card */}
          <Card className="p-6 col-span-1 md:col-span-2">
            <Tabs defaultValue="security" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="mfa"
                      checked={mfaEnabled}
                      onCheckedChange={handleMfaToggle}
                    />
                  </div>

                  <MfaSetupDialog
                    open={mfaDialogOpen}
                    onOpenChangeAction={setMfaDialogOpen}
                    mode={mfaMode}
                    onSuccessAction={handleMfaSuccess}
                    trigger={<span></span>} // Empty trigger as we're controlling open state manually
                  />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Password</Label>
                      <p className="text-sm text-muted-foreground">
                        Change your password
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance Settings</h3>

                  {/* Color Theme Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="color-theme">Color Theme</Label>
                    <Select value={colorTheme} onValueChange={handleColorThemeChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {themes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dark/Light Mode Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="display-mode">Display Mode</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant={mode === "light" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handleModeChange("light")}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={mode === "dark" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handleModeChange("dark")}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
