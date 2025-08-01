import React from "react";

interface VerificationCodeInputProps {
  values: string[];
  inputs: React.RefObject<HTMLInputElement | null>[];
  onChange: (idx: number, val: string) => void;
  onKeyDown: (idx: number, key: string) => void;
  onPaste: (text: string) => void;
}

export function VerificationCodeInput({
  values,
  inputs,
  onChange,
  onKeyDown,
  onPaste,
}: VerificationCodeInputProps) {
  return (
    <div className="flex gap-2 justify-center">
      {values.map((v, idx) => (
        <input
          key={idx}
          ref={inputs[idx]}
          type="text"
          maxLength={1}
          value={v}
          onChange={(e) => onChange(idx, e.target.value)}
          onKeyDown={(e) => onKeyDown(idx, e.key)}
          onPaste={(e) => {
            onPaste(e.clipboardData.getData("text"));
            e.preventDefault();
          }}
          className="w-10 h-12 text-center border rounded text-lg font-mono"
        />
      ))}
    </div>
  );
}
