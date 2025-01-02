import { useState } from "react";
import { TextInput, View } from "react-native";

export function DateInput() {
  const [date, setDate] = useState("");

  const formatDate = (text: string) => {
    let cleanedText = text.replace(/\D/g, "");

    // if (!cleanedText.length) return undefined;

    // if (cleanedText.length <= 2) {
    //   cleanedText = `${cleanedText}/mm/yyyy`;
    // } else if (cleanedText.length >= 3 && cleanedText.length <= 4) {
    //   cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}/yyyy`;
    // } else {
    //   cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 3)}/${cleanedText.slice(4)}`;
    // }

    return cleanedText;
  };

  const handleChangeText = (text: string) => {
    const formattedDate = formatDate(text);
    setDate(formattedDate || "");
  };

  return (
    <View>
      <TextInput
        value={formatDate(date)}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        maxLength={10}
        placeholder="dd/mm/yyyy"
        className="text-white border border-white rounded px-2 py-1"
        placeholderClassName="text-white/50"
      />
    </View>
  );
}
