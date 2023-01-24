import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {AdditionTaskGenerator} from "./helper/AdditionTaskGenerator";

export const AdditionWithTenTransitionSingleNumber: FunctionComponent = (props) => {

    const maxNumber = parseInt(props?.route?.params?.max+"");

    function generateTaskWithSolution(){
        return AdditionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
