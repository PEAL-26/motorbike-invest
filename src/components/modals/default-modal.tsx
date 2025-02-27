import { XIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

export interface Props {
  show?: boolean;
  onClose?(): void;
  children?: ReactNode;
  title?: string;
}

export function DefaultModal(props: Props) {
  const { title = "", show, children, onClose } = props;

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
      className="flex-1"
    >
      <Pressable
        className="bg-black/50 flex-1 flex flex-col justify-end"
        onPress={handleClose}
      >
        <View className="bg-white rounded-t-[40px]">
          <View className="bg-white rounded-t-[40px] p-5 flex-row items-center justify-between">
            <Text className="font-bold text-base">{title}</Text>
            <TouchableOpacity onPress={handleClose} activeOpacity={0.6}>
              <XIcon size={16} color={"#000"} />
            </TouchableOpacity>
          </View>
          <View className="262666h-[70%]">{children}</View>
        </View>
      </Pressable>
    </Modal>
  );
}
