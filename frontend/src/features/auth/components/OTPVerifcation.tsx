import { useEffect, useRef, useState } from "react";

type Props = {
  length?: number; // number of OTP inputs (default 6)
  inputWidth?: number; // width of each input in px (default 48)
  inputHeight?: number; // height of each input in px (default 56)
  autoFocus?: boolean; // focus first input on mount
  isDisabled?: boolean; // disable inputs & actions
  className?: string;
  inputClassName?: string;
  // callbacks
  onChange?: (otp: string) => void; // called on every change
  onComplete?: (otp: string) => void; // called when all inputs are filled
  // resend config
  enableResend?: boolean;
  resendTimeout?: number; // seconds until resend enabled (default 60)
  onResend?: () => Promise<void> | void;
  placeholderChar?: string;
};

export default function OTPVerification({
  length = 6,
  inputWidth = 48,
  inputHeight = 56,
  autoFocus = true,
  isDisabled = false,
  className = "",
  inputClassName = "",
  onChange,
  onComplete,
  enableResend = true,
  resendTimeout = 60,
  onResend,
  placeholderChar = "",
}: Props) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(resendTimeout);
  const [isCounting, setIsCounting] = useState<boolean>(enableResend);

  // start countdown when component mounts or resend triggered
  useEffect(() => {
    if (!enableResend) return;
    setSecondsLeft(resendTimeout);
    setIsCounting(resendTimeout > 0);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setIsCounting(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendTimeout, enableResend]);

  useEffect(() => {
    // If all filled, call onComplete
    const otp = values.join("");
    onChange?.(otp);
    if (otp.length === length && values.every((v) => v !== "")) {
      onComplete?.(otp);
    }
  }, [values, length, onChange, onComplete]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
      inputsRef.current[0].select?.();
    }
  }, [autoFocus]);

  const setValueAt = (index: number, val: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const raw = e.target.value;
    // accept only digits
    const val = raw.replace(/\D/g, "");
    if (!val) {
      setValueAt(idx, "");
      return;
    }

    // if user types multiple chars (like fast paste), put them across inputs
    const chars = val.split("");
    let i = idx;
    chars.forEach((ch) => {
      if (i < length) {
        setValueAt(i, ch);
        i++;
      }
    });

    // focus next empty
    const nextIdx = Math.min(length - 1, idx + chars.length);
    const nextInput = inputsRef.current[nextIdx];
    if (nextInput) {
      nextInput.focus();
      nextInput.select?.();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      if (values[idx]) {
        // clear current
        setValueAt(idx, "");
      } else {
        // move to previous
        const prev = idx - 1;
        if (prev >= 0) {
          inputsRef.current[prev]?.focus();
          setValueAt(prev, "");
        }
      }
      return;
    }

    if (key === "ArrowLeft") {
      const prev = idx - 1;
      if (prev >= 0) inputsRef.current[prev]?.focus();
      return;
    }

    if (key === "ArrowRight") {
      const next = idx + 1;
      if (next < length) inputsRef.current[next]?.focus();
      return;
    }

    // Prevent non-digit input
    if (!/^[0-9]$/.test(key) && key.length === 1) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("Text").replace(/\D/g, "");
    if (!paste) return;
    const chars = paste.split("").slice(0, length);
    const next = Array(length).fill("");
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setValues(next);
    // focus next input (or last)
    const focusIndex = Math.min(chars.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    if (isCounting || isDisabled) return;
    setIsCounting(true);
    setSecondsLeft(resendTimeout);
    try {
      await onResend?.();
    } catch (err) {
      // swallow; caller may show toast
      console.error("resend error:", err);
    }
    // start countdown again
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setIsCounting(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex gap-3">
        {Array.from({ length }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={values[idx]}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            disabled={isDisabled}
            aria-label={`OTP digit ${idx + 1}`}
            className={`text-center border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FF9A00] ${inputClassName}`}
            style={{
              width: inputWidth,
              height: inputHeight,
              fontSize: Math.max(16, Math.floor(inputHeight / 2.5)),
            }}
            placeholder={placeholderChar}
          />
        ))}
      </div>

      {enableResend && (
        <div className="mt-3 text-sm text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={isCounting || isDisabled}
            className={`mt-2 text-sm font-medium px-3 py-1 rounded ${
              isCounting || isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#FF9A00] hover:underline"
            }`}
          >
            {isCounting ? `Resend available in ${secondsLeft}s` : "Resend code"}
          </button>
        </div>
      )}
    </div>
  );
}
