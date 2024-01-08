import { Flex, View, Text, ProgressCircle } from "@adobe/react-spectrum";

export const LoadingComponent = () => (
  <View
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    zIndex={1}
    UNSAFE_style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <Flex direction="column" alignItems="center" gap="size-100">
      <ProgressCircle aria-label="Loading..." isIndeterminate />
      <Text UNSAFE_style={{ color: "white", fontWeight: "bold" }}>Loading...</Text>
    </Flex>
  </View>
);

export const ErrorComponent = ({ error }: { error: string }) => <Text UNSAFE_style={{ color: "red" }}>{error}</Text>;
