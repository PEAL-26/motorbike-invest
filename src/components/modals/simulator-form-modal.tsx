import { ScrollView } from "react-native";
import { SimulatorForm, SimulatorFormData } from "../elements/simulator-form";
import { DefaultModal } from "./default-modal";

interface Props {
  show?: boolean;
  onClose?(): void;
  onSimulate?(data: SimulatorFormData): void;
}

export function SimulatorModal(props: Props) {
  const { show, onClose, onSimulate } = props;

  return (
    <DefaultModal
      title="Simulação de investimento"
      show={show}
      onClose={onClose}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SimulatorForm onSimulate={onSimulate} />
      </ScrollView>
    </DefaultModal>
  );
}
