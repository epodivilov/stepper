import { Button, Flex, View, Text, ActionButton } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import Edit from "@spectrum-icons/workflow/Edit";
import { ErrorComponent, LoadingComponent } from "../components";

type ReviewInformationProps = {
  data: Data;
  onEdit: (field: keyof Data) => void;
  onNext: () => void;
  onBack: () => void;
};

const ReviewInformationView = ({ data, onEdit, onNext, onBack }: ReviewInformationProps) => {
  return (
    <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
      <Flex direction="column" alignItems="center" width="size-3000" gap="size-100">
        <Flex alignItems="center" width="100%">
          <Text>
            Country: <span style={{ fontWeight: "bold" }}>{data.selectedCountry}</span>
          </Text>
          <ActionButton isQuiet marginStart="auto" onPress={() => onEdit("selectedCountry")}>
            <Edit />
          </ActionButton>
        </Flex>
        <Flex alignItems="center" width="100%">
          <Text>
            City: <span style={{ fontWeight: "bold" }}>{data.selectedCity}</span>
          </Text>
          <ActionButton isQuiet marginStart="auto" onPress={() => onEdit("selectedCity")}>
            <Edit />
          </ActionButton>
        </Flex>
        <Flex alignItems="center" width="100%">
          <Text>
            Address: <span style={{ fontWeight: "bold" }}>{data.address}</span>
          </Text>
          <ActionButton isQuiet marginStart="auto" onPress={() => onEdit("address")}>
            <Edit />
          </ActionButton>
        </Flex>
        <Flex alignItems="center" width="100%">
          <Text>
            Comment: <span style={{ fontWeight: "bold" }}>{data.comment}</span>
          </Text>
          <ActionButton isQuiet marginStart="auto" onPress={() => onEdit("comment")}>
            <Edit />
          </ActionButton>
        </Flex>
        <Flex gap="size-100" marginTop="size-200">
          <Button variant="secondary" onPress={() => onBack()}>
            Back
          </Button>
          <Button variant="cta" onPress={() => onNext()}>
            Next
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export function ReviewInformation() {
  const { loading, error, data, nextStep, prevStep, goToStep } = useStepper<Data>();

  const handleEdit = (field: keyof Data) => {
    switch (field) {
      case "selectedCountry":
        return goToStep("select-country", data);
      case "selectedCity":
        return goToStep("select-city", data);
      case "address":
        return goToStep("select-address", data);
      case "comment":
        return goToStep("add-comment", data);
    }
  };

  return (
    <>
      <ReviewInformationView data={data || {}} onEdit={handleEdit} onNext={nextStep} onBack={prevStep} />
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
}
