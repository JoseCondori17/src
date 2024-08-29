"use client";
import { useReducer } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { formatCurrency } from "@/lib/formats";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  disabled: boolean;
};

export default function InputMoney(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? formatCurrency(props.form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return formatCurrency(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem className={'flex-grow space-y-0.5'}>
            <FormLabel className={'text-sm'}>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
                className={'h-9'}
                disabled={props.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}