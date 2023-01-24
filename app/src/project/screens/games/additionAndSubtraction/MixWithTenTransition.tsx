import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {AdditionTaskGenerator} from "./helper/AdditionTaskGenerator";
import {SubtractionTaskGenerator} from "./helper/SubtractionTaskGenerator";

export const MixWithTenTransition: FunctionComponent = (props) => {

    const maxNumber = parseInt(props?.route?.params?.max+"");

    function generateTaskWithSolution(){
        let possibleTasks = [
            AdditionTaskGenerator.generateWithTenTransition(maxNumber),
            SubtractionTaskGenerator.generateWithTenTransition(maxNumber)
        ];
        return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
