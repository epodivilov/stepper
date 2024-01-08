import { TextField, Button, Flex, View } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import { useEffect, useState } from "react";
import { ErrorComponent, LoadingComponent } from "../components";

type EnterAddressProps = {
  address?: string;
  onNext: (address: string) => void;
  onBack: () => void;
};

const EnterAddressView = ({ address, onNext, onBack }: EnterAddressProps) => {
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const [s, h, z] = (address || "").split(", ");

    s && setStreet(s);
    h && setHouse(h);
    z && setZip(z);
  }, [address]);

  return (
    <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
      <Flex direction="column" alignItems="center" width="size-3000" gap="size-100">
        <TextField label="Street" value={street} onChange={setStreet} width="100%" />
        <TextField label="House Number" value={house} onChange={setHouse} width="100%" />
        <TextField label="Postal Code" value={zip} onChange={setZip} width="100%" />
        <Flex gap="size-100" marginTop="size-200">
          <Button variant="secondary" onPress={() => onBack()}>
            Back
          </Button>
          <Button variant="cta" onPress={() => onNext([street, house, zip].join(", "))}>
            Next
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export function EnterAddress() {
  const { loading, error, data, nextStep, prevStep, setError } = useStepper<Data>();

  const handleNext = (address: string) => {
    if (address.length === 0) {
      return setError(new Error("All address fields are required"));
    }

    nextStep({ ...(data || {}), address });
  };

  return (
    <>
      <EnterAddressView address={data?.address} onNext={handleNext} onBack={prevStep} />
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
}
