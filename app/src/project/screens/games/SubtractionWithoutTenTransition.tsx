import React, {FunctionComponent, useState} from "react";
import {View} from "native-base";
import {TaskTemplate} from "../../components/TaskTemplate";

export const SubtractionWithoutTenTransition: FunctionComponent = (props) => {

    function generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateTaskWithSolution(){
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        // Normal addition without ten transition
        const firstNumberTen = generateNumberFromTo(0, 9);
        const firstNumberOne = generateNumberFromTo(0, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne;
        const secondNumberTen = generateNumberFromTo(0, 9-firstNumberTen);
        let secondNumberOne = generateNumberFromTo(0, 9-firstNumberOne);
        const secondNumber = secondNumberTen * 10 + secondNumberOne;
        const solution = firstNumber + secondNumber;

        // Reverse the addition task to get the subtraction task
        taskWithSolution.task = solution + " - "+firstNumber;
        taskWithSolution.solution = secondNumber;

        return taskWithSolution;
    }

  return (
    <View style={{width: "100%"}}>
        <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
    </View>
  );
}
