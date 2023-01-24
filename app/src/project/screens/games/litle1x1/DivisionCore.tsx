import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {MultiplicationTaskGenerator} from "./helper/MultiplicationTaskGenerator";
import {DivisionTaskGenerator} from "./helper/DivisionTaskGenerator";

export const DivisionCore: FunctionComponent = (props) => {

    function generateTaskWithSolution(){
        return DivisionTaskGenerator.generateCoreTask();
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
