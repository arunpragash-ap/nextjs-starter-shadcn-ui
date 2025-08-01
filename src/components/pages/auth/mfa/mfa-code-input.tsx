import React, { useRef } from "react";

interface MfaCodeInputProps {
  values: string[];
  onChange: (values: string[]) => void;
}

export default function MfaCodeInput({ values, onChange }: MfaCodeInputProps) {
  const inputs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (idx: number, val: string) => {
    const newVals = [...values];
    newVals[idx] = val.replace(/[^0-9]/, "").slice(0, 1);
    onChange(newVals);
    if (val && idx < 5) inputs[idx + 1].current?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((v, idx) => (
        <input
          key={idx}
          ref={inputs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(idx, e.target.value)}
          className="w-10 h-12 text-center border rounded text-lg font-mono"
        />
      ))}
    </div>
  );
}
