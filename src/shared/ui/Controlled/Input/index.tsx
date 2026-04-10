import { Input as AntdInput } from "antd";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

import cls from "./index.module.scss";

export interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  type: "text" | "email" | "password" | "search";
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  variant?: "outlined" | "borderless" | "filled" | "underlined" | undefined;
  inputClassName?: string;
  labelClassName?: string;
}

export const Input = ({
  name,
  label,
  placeholder,
  type,
  variant,
  suffix,
  prefix,
  inputClassName,
  labelClassName,
}: Props) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const InputElement = type === "password" ? AntdInput.Password : AntdInput;

  return (
    <>
      <label className={clsx(labelClassName)} htmlFor={name}>
        {label} {label ? <span className={cls.required}>*</span> : ""}
      </label>
      <InputElement
        {...field}
        className={clsx(inputClassName)}
        type={type}
        placeholder={placeholder}
        variant={variant}
        suffix={suffix}
        prefix={prefix}
        status={`${error ? "error" : ""}`}
      />
      {error && <span className={cls.errorMessage}>{error?.message}</span>}
    </>
  );
};
