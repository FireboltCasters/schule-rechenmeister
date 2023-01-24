import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {MultiplicationTaskGenerator} from "./helper/MultiplicationTaskGenerator";
import {DivisionTaskGenerator} from "./helper/DivisionTaskGenerator";

export const DivisionAll: FunctionComponent = (props) => {

    function generateTaskWithSolution(){
        return DivisionTaskGenerator.generateAllTask();
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
