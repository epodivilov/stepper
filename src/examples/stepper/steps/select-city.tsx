import { Picker, Item, Button, Flex, View } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import { useEffect, useState } from "react";
import { ErrorComponent, LoadingComponent } from "../components";

type SelectCityProps = {
  cities: string[];
  selectedCity?: string;
  onNext: (selectedCity: string) => void;
  onBack: () => void;
};

const SelectCityView = ({ cities, selectedCity, onNext, onBack }: SelectCityProps) => {
  const [value, setValue] = useState<string>(selectedCity || "");

  useEffect(() => {
    setValue(selectedCity || "");
  }, [selectedCity]);

  return (
    <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
      <Flex direction="column" alignItems="center" width="size-3000" gap="size-100">
        <Picker label="Select city" selectedKey={value} onSelectionChange={(key) => setValue(String(key))} width="100%">
          {cities.map((city) => (
            <Item key={city}>{city}</Item>
          ))}
        </Picker>
        <Flex gap="size-100" marginTop="size-200">
          <Button variant="secondary" onPress={() => onBack()}>
            Back
          </Button>
          <Button variant="cta" onPress={() => onNext(value)}>
            Next
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export function SelectCity() {
  const { loading, error, data, nextStep, prevStep, setError } = useStepper<Data>();

  const handleNext = (selectedCity: string) => {
    if (selectedCity.length === 0) {
      return setError(new Error("Select city"));
    }

    nextStep({ ...(data || {}), selectedCity });
  };

  return (
    <>
      <SelectCityView
        cities={data?.cities || []}
        selectedCity={data?.selectedCity}
        onNext={handleNext}
        onBack={prevStep}
      />
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
}
