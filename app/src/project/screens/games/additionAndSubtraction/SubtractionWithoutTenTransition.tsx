import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {SubtractionTaskGenerator} from "./helper/SubtractionTaskGenerator";

export const SubtractionWithoutTenTransition: FunctionComponent = (props) => {

    const maxNumber = parseInt(props?.route?.params?.max+"");

    function generateTaskWithSolution(){
        return SubtractionTaskGenerator.generateWithoutTenTransition(maxNumber);
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
