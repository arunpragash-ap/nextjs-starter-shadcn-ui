import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MfaQrStepProps {
  qrCode: string;
  secret: string;
  loading: boolean;
  onContinue: () => void;
}

export default function MfaQrStep({ qrCode, secret, loading, onContinue }: MfaQrStepProps) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        {qrCode ? (
          <div className="relative w-56 h-56">
            <Image src={qrCode} alt="MFA QR" fill className="object-contain" />
          </div>
        ) : (
          <div className="w-56 h-56 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Loading QR code...</span>
          </div>
        )}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Scan this QR code with your authenticator app.
          </p>
          <div className="text-xs p-2 bg-muted rounded-md font-mono">{secret}</div>
        </div>
      </div>
      <Button onClick={onContinue} className="w-full" disabled={loading || !qrCode}>
        Continue
      </Button>
    </>
  );
}
