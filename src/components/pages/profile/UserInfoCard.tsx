"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserInfoCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function UserInfoCard({ name, email, avatarUrl }: UserInfoCardProps) {
  return (
    <Card className="p-6 col-span-1">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}