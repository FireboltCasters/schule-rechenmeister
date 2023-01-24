import React from "react";

export class AdditionTaskGenerator {

    static generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getMaxTen(maxNumberString: any) {
        const maxNumber = parseInt(maxNumberString+"");
        const maxTen = Math.floor((maxNumber-1)/10);
        return maxTen;
    }

    static generateWithoutTenTransition(maxNumber: any) {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const maxTen = AdditionTaskGenerator.getMaxTen(maxNumber);

        const firstNumberTen = AdditionTaskGenerator.generateNumberFromTo(0, maxTen);
        const firstNumberOne = AdditionTaskGenerator.generateNumberFromTo(0, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne;
        const secondNumberTen = AdditionTaskGenerator.generateNumberFromTo(0, maxTen-firstNumberTen);
        let secondNumberOne = AdditionTaskGenerator.generateNumberFromTo(0, 9-firstNumberOne);
        const secondNumber = secondNumberTen * 10 + secondNumberOne;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.task = higherNumber + " + " + lowerNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }

    static generateWithTenTransition(maxNumber: any) {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const maxTen = AdditionTaskGenerator.getMaxTen(maxNumber);

        const firstNumberTen = AdditionTaskGenerator.generateNumberFromTo(0, maxTen-1); // highest would be 8X
        const firstNumberOne = AdditionTaskGenerator.generateNumberFromTo(1, 9); // highest would be X9
        const firstNumber = firstNumberTen * 10 + firstNumberOne; // highest would be 89
        const secondNumberTen = AdditionTaskGenerator.generateNumberFromTo(0, (maxTen-1)-firstNumberTen); // highest would be 8X if firstNumberTen is 0
        let secondNumberOne = AdditionTaskGenerator.generateNumberFromTo(10-firstNumberOne, 9); // highest would be X9
        const secondNumber = secondNumberTen * 10 + secondNumberOne; // highest would be 89 if firstNumberTen is 0

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.task = higherNumber + " + " + lowerNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }

    static generateWithTenTransitionSingleNumber(maxNumber: any) {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const maxTen = AdditionTaskGenerator.getMaxTen(maxNumber);

        const firstNumberTen = AdditionTaskGenerator.generateNumberFromTo(0, maxTen-1); // highest would be 8X
        const firstNumberOne = AdditionTaskGenerator.generateNumberFromTo(1, 9); // highest would be X9
        const firstNumber = firstNumberTen * 10 + firstNumberOne; // highest would be 89
        const secondNumberTen = 0; // highest would be 8X if firstNumberTen is 0
        let secondNumberOne = AdditionTaskGenerator.generateNumberFromTo(10-firstNumberOne, 9); // highest would be X9
        const secondNumber = secondNumberTen * 10 + secondNumberOne; // highest would be 89 if firstNumberTen is 0

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.task = higherNumber + " + " + lowerNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }
}
