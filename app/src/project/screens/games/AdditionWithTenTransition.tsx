import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {ThemedMarkdown} from "kitcheningredients";

export const AdditionWithTenTransition: FunctionComponent = (props) => {

  let markdownTextExample = `
# Zehnerübergang

Hier kommt ein Text über den Zehnerübergang
`;


  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
    </View>
  );
}
