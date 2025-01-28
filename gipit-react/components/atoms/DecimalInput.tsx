import { forwardRef } from 'react';

interface DecimalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isEvaluationPage?: boolean;
}

const DecimalInput = forwardRef<HTMLInputElement, DecimalInputProps>(
  ({ label, isEvaluationPage, ...props }, ref) => {
    return (
      <label>
        <div>{label}</div>
        <input
          ref={ref}
          type="number"
          step="0.1"
          min={0}
          max={7}
          {...props}
          style={isEvaluationPage ? { border: '2px solid blue' } : {}}
        />
      </label>
    );
  }
);

DecimalInput.displayName = 'DecimalInput';

export default DecimalInput;
