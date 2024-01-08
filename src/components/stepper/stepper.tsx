import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

type ContextType<T> = {
  goToStep: (stepId: string, state?: T | null) => Promise<void>;
  nextStep: (data?: T | null) => void;
  prevStep: (data?: T | null) => void;
  currentStepId: string;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
  data: T | null;
  setData: (data: T | null) => void;

  onSubmit?: (data?: T) => void;
  onCancel?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepperContext = createContext<ContextType<any>>({
  goToStep: async () => {},
  nextStep: () => {},
  prevStep: () => {},

  currentStepId: "",
  hasNextStep: false,
  hasPrevStep: false,

  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  data: null,
  setData: () => {},

  onSubmit: () => {},
  onCancel: () => {},
});

export function useStepper<T>() {
  return useContext<ContextType<T>>(StepperContext);
}

type StepperProps<T> = PropsWithChildren<{
  initialStepId: string;
  initialData?: T;
  onSubmit?: () => void;
  onCancel?: () => void;
  onChange?: (nextStepId: string, prevStepId: string, state: T | null) => Promise<T | null>;
}>;

export const Stepper = <T,>({ children, initialStepId, onSubmit, onCancel, onChange }: StepperProps<T>) => {
  const [currentStepId, setCurrentStepId] = useState(initialStepId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const stepIds = React.Children.map(children, (child) => (React.isValidElement(child) ? child.props.id : null)) || [];
  const currentIndex = stepIds.indexOf(currentStepId);
  const hasNextStep = currentIndex < stepIds.length - 1;
  const hasPrevStep = currentIndex > 0;

  const goToStep = async (stepId: string, state?: T | null) => {
    if (!stepIds.includes(stepId)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (typeof onChange === "function") {
        const res = await onChange(stepId, currentStepId, state !== undefined ? state : data);

        setData((s) => {
          if (s == null) {
            return res;
          }

          if (res == null) {
            return s;
          }

          return res;
        });
      }

      setCurrentStepId(stepId);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async (state?: T | null) => {
    if (currentIndex >= 0 && hasNextStep) {
      await goToStep(stepIds[currentIndex + 1], state);
    }
  };

  const prevStep = async (state?: T | null) => {
    if (hasPrevStep) {
      await goToStep(stepIds[currentIndex - 1], state);
    }
  };

  const renderCurrentStep = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.props.id === currentStepId) {
        return child;
      }

      return null;
    });
  };

  const contextValue = useMemo(
    () => ({
      goToStep,
      nextStep,
      prevStep,
      currentStepId,
      hasNextStep,
      hasPrevStep,
      loading,
      setLoading,
      error,
      setError,
      onSubmit,
      onCancel,

      data,
      setData,
    }),
    [currentStepId, error, loading, onSubmit, onCancel, data]
  );

  useEffect(() => {
    goToStep(initialStepId);
  }, [initialStepId]);

  return <StepperContext.Provider value={contextValue}>{renderCurrentStep()}</StepperContext.Provider>;
};

type StepProps = PropsWithChildren<{
  id: string;
}>;
export const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};
