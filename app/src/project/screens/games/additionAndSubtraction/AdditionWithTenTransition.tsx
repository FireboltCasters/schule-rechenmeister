import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../../components/TaskTemplate";
import {AdditionTaskGenerator} from "./helper/AdditionTaskGenerator";

export const AdditionWithTenTransition: FunctionComponent = (props) => {

    const maxNumber = parseInt(props?.route?.params?.max+"");

    function generateTaskWithSolution(){
        return AdditionTaskGenerator.generateWithTenTransition(maxNumber);
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
