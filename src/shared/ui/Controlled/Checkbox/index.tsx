import { useState } from "react";

import {
  Checkbox as AntdCheckBox,
  type CheckboxProps as AntdCheckboxProps,
} from "antd";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

export interface Props extends AntdCheckboxProps {
  name: string;
  className?: string;
  children?: React.ReactNode;
}

export const Checkbox = ({ name, children, className }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <AntdCheckBox
      className={clsx(className)}
      {...field}
      checked={checked}
      onClick={() => setChecked((prev) => !prev)}
    >
      {children}
    </AntdCheckBox>
  );
};
