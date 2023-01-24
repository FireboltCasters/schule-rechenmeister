import React, {FunctionComponent, useEffect, useState} from "react";
import {Text, View} from "native-base";
import {MyStates} from "../states/MyStates";
import {CurrentPlayerName} from "./CurrentPlayerName";
import {MySpacer} from "./MySpacer";
import {PlayerStats} from "./PlayerStats";
import {MyButton} from "./MyButton";
import {MyFontSizes} from "./MyFontSizes";
import {GridList, Icon, MyThemedBox, Navigation} from "kitcheningredients";
import {MyButtonView} from "./MyButtonView";
import {AnimationCorrect} from "../animations/AnimationCorrect";
import {AnimationWrong} from "../animations/AnimationWrong";
import {SelectGameType} from "../screens/SelectGameType";

export const GoHome: FunctionComponent = (props) => {

  return (
              <View style={{width: "100%", alignItems: "flex-end"}}>
                  <MyButton onPress={() => {
                        Navigation.navigateHome()
                  }}>
                      <Icon size={MyFontSizes.HEADING} name={"logout"} />
                  </MyButton>
              </View>
  );
}
