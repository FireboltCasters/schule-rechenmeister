import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../components/TaskTemplate";

export const AdditionWithTenTransition: FunctionComponent = (props) => {

    function generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateTaskWithSolution(){
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const firstNumberTen = generateNumberFromTo(0, 8); // highest would be 8X
        const firstNumberOne = generateNumberFromTo(1, 9); // highest would be X9
        const firstNumber = firstNumberTen * 10 + firstNumberOne; // highest would be 89
        const secondNumberTen = generateNumberFromTo(0, (8)-firstNumberTen); // highest would be 8X if firstNumberTen is 0
        let secondNumberOne = generateNumberFromTo(10-firstNumberOne, 9); // highest would be X9
        const secondNumber = secondNumberTen * 10 + secondNumberOne; // highest would be 89 if firstNumberTen is 0

        taskWithSolution.task = firstNumber + " + " + secondNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
