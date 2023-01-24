import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {AdditionTaskGenerator} from "./helper/AdditionTaskGenerator";
import {SubtractionTaskGenerator} from "./helper/SubtractionTaskGenerator";

export const MixWithTenTransitionSingleNumber: FunctionComponent = (props) => {

    const maxNumber = parseInt(props?.route?.params?.max+"");

    function generateTaskWithSolution(){
        let possibleTasks = [
            AdditionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber),
            SubtractionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber)
        ];
        return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
