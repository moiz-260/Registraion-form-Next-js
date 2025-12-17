"use client";
import { useState, useEffect, useRef } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { FormData } from "@/components/types/form.type";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function FormSelect({
  name,
  register,
  error,
  options,
  placeholder = "Select an option",
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const { ref, onChange, name: fieldName } = register(name);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    // Notify react-hook-form of the change
    if (onChange) {
      onChange({ target: { name: fieldName, value } } as any);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="modern-custom-select"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className={selectedValue ? "text-slate-900" : "text-slate-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="modern-select-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`modern-select-option ${selectedValue === option.value ? "selected" : ""
                }`}
              onClick={() => {
                handleSelect(option.value);
              }}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      <input
        type="hidden"
        {...register(name)}
        ref={ref}
        value={selectedValue}
      />

      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
