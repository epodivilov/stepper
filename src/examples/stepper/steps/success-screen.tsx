import { Button, Flex, View, Text } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import { noop } from "../../../utils";
import { useMemo } from "react";
import { ErrorComponent, LoadingComponent } from "../components";

export const SuccessScreen = () => {
  const { loading, error, data, goToStep, onSubmit = noop } = useStepper<Data>();

  const handleToStart = () => {
    goToStep("select-country", null);
  };

  const content = useMemo(() => {
    if (data?.result?.ok === false) {
      return (
        <>
          <Text UNSAFE_style={{ fontWeight: "bold" }}>{data?.result.message}</Text>
          <Text>Please, try again later.</Text>
        </>
      );
    }

    return (
      <>
        <Text UNSAFE_style={{ fontWeight: "bold" }}>{data?.result.message}</Text>
        <Text>Your information has been submitted.</Text>
      </>
    );
  }, [data]);

  return (
    <>
      <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
        <Flex direction="column" alignItems="center" width="size-3400" gap="size-100">
          {content}
          <Flex gap="size-100" marginTop="size-200">
            <Button variant="primary" onPress={handleToStart}>
              Start Again
            </Button>
            <Button variant="cta" onPress={() => onSubmit()}>
              Close
            </Button>
          </Flex>
        </Flex>
      </View>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
};
