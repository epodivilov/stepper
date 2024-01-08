import { TextArea, Button, Flex, View } from "@adobe/react-spectrum";
import { useStepper } from "../../../components/stepper/stepper";
import { Data } from "../types";
import { useState } from "react";
import { ErrorComponent, LoadingComponent } from "../components";

type AddCommentProps = {
  comment?: string;
  onNext: (comment: string) => void;
  onBack: () => void;
};

const EnterCommentView = ({ comment, onNext, onBack }: AddCommentProps) => {
  const [commentText, setCommentText] = useState(comment || "");

  return (
    <View padding="size-250" borderRadius="medium" overflow="hidden" backgroundColor="static-white">
      <Flex direction="column" alignItems="center" width="size-3000" gap="size-100">
        <TextArea label="Comment" value={commentText} onChange={setCommentText} width="100%" />
        <Flex gap="size-100" marginTop="size-200">
          <Button variant="secondary" onPress={() => onBack()}>
            Back
          </Button>
          <Button variant="cta" onPress={() => onNext(commentText)}>
            Next
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export function EnterComment() {
  const { loading, error, data, nextStep, prevStep } = useStepper<Data>();

  const handleNext = (comment: string) => {
    nextStep({ ...(data || {}), comment });
  };

  return (
    <>
      <EnterCommentView comment={data?.comment} onNext={handleNext} onBack={prevStep} />
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error.message} />}
    </>
  );
}
