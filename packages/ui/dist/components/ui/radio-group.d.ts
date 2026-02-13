import * as React from "react";
interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onValueChange'> {
    value?: string;
    onValueChange?: (value: string) => void;
    name?: string;
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    value: string;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLInputElement>>;
export { RadioGroup, RadioGroupItem };
//# sourceMappingURL=radio-group.d.ts.map