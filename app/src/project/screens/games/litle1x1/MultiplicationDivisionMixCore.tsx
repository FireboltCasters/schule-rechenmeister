import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {MultiplicationTaskGenerator} from "./helper/MultiplicationTaskGenerator";
import {DivisionTaskGenerator} from "./helper/DivisionTaskGenerator";

export const MultiplicationDivisionMixCore: FunctionComponent = (props) => {

    function generateTaskWithSolution(){
        let possibleTasks = [
            MultiplicationTaskGenerator.generateCoreTask(),
            DivisionTaskGenerator.generateCoreTask()
        ];
        return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
