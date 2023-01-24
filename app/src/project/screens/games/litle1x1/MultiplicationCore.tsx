import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {MultiplicationTaskGenerator} from "./helper/MultiplicationTaskGenerator";

export const MultiplicationCore: FunctionComponent = (props) => {

    function generateTaskWithSolution(){
        return MultiplicationTaskGenerator.generateCoreTask();
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
