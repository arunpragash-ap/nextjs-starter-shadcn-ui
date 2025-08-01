import { useRef, useState } from "react";

export function useVerificationCode(length = 6) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleChange = (idx: number, val: string) => {
    const newValues = [...values];
    newValues[idx] = val.slice(0, 1);
    setValues(newValues);
    if (val && idx < length - 1) {
      inputs[idx + 1].current?.focus();
    }
  };

  const handleKeyDown = (idx: number, key: string) => {
    if (key === "Backspace" && !values[idx] && idx > 0) {
      inputs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const chars = text.slice(0, length).split("");
    const newValues = Array(length).fill("");
    for (let i = 0; i < length; i++) {
      newValues[i] = chars[i] || "";
    }
    setValues(newValues);
    inputs[Math.min(chars.length - 1, length - 1)].current?.focus();
  };

  return {
    values,
    setValues,
    inputs,
    handleChange,
    handleKeyDown,
    handlePaste,
  };
}
