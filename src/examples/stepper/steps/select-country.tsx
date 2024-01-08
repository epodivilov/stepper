import { Picker, Item, Button, Flex, View } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import { useEffect, useState } from "react";
import { LoadingComponent, ErrorComponent } from "../components";

type Props = { countries: string[]; selectedCountry?: string; onNext: (selectedCountry: string) => void };
const SelectCountryView = ({ countries, selectedCountry, onNext }: Props) => {
  const [value, setValue] = useState<string>(selectedCountry || "");

  useEffect(() => {
    setValue(selectedCountry || "");
  }, [selectedCountry]);

  return (
    <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
      <Flex direction="column" alignItems="center" width="size-3000" gap="size-100">
        <Picker
          label="Select country"
          selectedKey={value}
          onSelectionChange={(key) => setValue(String(key))}
          width="100%"
        >
          {countries.map((country) => (
            <Item key={country}>{country}</Item>
          ))}
        </Picker>
        <Flex gap="size-100" marginTop="size-200">
          <Button variant="cta" onPress={() => onNext(value)}>
            Next
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export function SelectCountry() {
  const { loading, data, error, nextStep, setError } = useStepper<Data>();

  const handleNext = (selectedCountry: string) => {
    if (selectedCountry.length === 0) {
      return setError(new Error("Select country"));
    }

    nextStep({ ...(data || {}), selectedCountry });
  };

  return (
    <>
      <SelectCountryView
        countries={data?.countries || []}
        selectedCountry={data?.selectedCountry}
        onNext={handleNext}
      />
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
}
