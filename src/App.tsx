import { Button, Content, Dialog, DialogTrigger, Flex } from "@adobe/react-spectrum";

import { StepperExample } from "./examples/stepper";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
      <DialogTrigger type="modal" isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
        <Button variant="cta">Open Stepper</Button>
        {(close) => (
          <Dialog>
            <Content>
              <Flex direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
                <StepperExample onCancel={close} onSubmit={close} />
              </Flex>
            </Content>
          </Dialog>
        )}
      </DialogTrigger>
    </Flex>
  );
}

export default App;
