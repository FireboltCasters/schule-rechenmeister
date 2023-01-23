import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {ConfigHolder, Navigation, ThemedMarkdown} from "kitcheningredients";

export const ExampleHomeComponent: FunctionComponent = (props) => {

    if(!ConfigHolder.instance.isDrawerHidden()){
        ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_HOME);
    }

  let markdownTextExample = `
# Welcome to kitcheningredients

This library to create your own app for web, android and ios. It is based on native-base and is connectable to a Directus backend.

More information can be found soon.
`;


  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
    </View>
  );
}
