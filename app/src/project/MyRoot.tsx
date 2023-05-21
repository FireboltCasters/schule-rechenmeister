import React, {useEffect, useState} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {EmptyTemplate, MenuItem, RequiredSynchedStates, useSynchedJSONState, useSynchedState} from "kitcheningredients";

export const MyRoot: FunctionComponent = (props) => {

  const [navigationHistory, setNavigationHistory] = useSynchedJSONState(RequiredSynchedStates.navigationHistory)

  return (
    <View style={{visibility: "hidden"}}>
      <a href="[https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FFireboltCasters%2Fschule-rechenmeister](https://github.com/FireboltCasters/schule-rechenmeister)"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FFireboltCasters%2Fschule-rechenmeister&label=Besucher&countColor=%23263759" /></a>
    </View>
  );
}
