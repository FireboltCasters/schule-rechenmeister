import React from "react";

export class AdditionBaseTaskGenerator {

    static generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getMaxNumber(maxNumberString: any) {
        const maxNumber = parseInt(maxNumberString+"");
        return maxNumber;
    }

    static getMaxTen(maxNumberString: any) {
        const maxNumber = parseInt(maxNumberString+"");
        const maxTen = Math.floor((maxNumber-1)/10);
        return maxTen;
    }

    static generateWithoutTenTransition(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            solution: 0
        }

        const maxTen = AdditionBaseTaskGenerator.getMaxTen(maxNumber);

        const firstNumberTen = AdditionBaseTaskGenerator.generateNumberFromTo(0, maxTen); // highest ==> 19
        const firstNumberOne = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne;
        const secondNumberTen = AdditionBaseTaskGenerator.generateNumberFromTo(0, maxTen-firstNumberTen);
        let secondNumberOne = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9-firstNumberOne+1); // allow to become 10
        const secondNumber = secondNumberTen * 10 + secondNumberOne;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }

    static isMultipleOfTen(number: number) {
        return number % 10 === 0;
    }

    static hasTenTransition(solution: any, firstNumber: any) {
        // solution = 33 firstNumber = 3 would have no ten transition
        // solution = 49 firstNumber = 3 would have no ten transition
        const solutionOne = solution % 10; // eg. 5
        const firstNumberOne = firstNumber % 10; // eg. 3
        return firstNumberOne > solutionOne;
    }

    static generateWithTenTransition(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            solution: 0
        }

        const maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);
        let solution = AdditionBaseTaskGenerator.generateNumberFromTo(10, maxAsNumber);
        while(solution % 10 === 9) { // avoid 9,19,29,39,49,59,69,79,89,99 since we dont want to have 9+10
            solution = AdditionBaseTaskGenerator.generateNumberFromTo(10, maxAsNumber);
        }

        let firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, solution-1); // -1 because we dont want to have secondNumber 0
        while(AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) || !AdditionBaseTaskGenerator.hasTenTransition(solution, firstNumber)) { // we dont want to have firstNumber 10, 20, 30, ...
            firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, solution-1); // -1 because we dont want to have secondNumber 0
        }

        let secondNumber = solution - firstNumber;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }

    static generateWithTenTransitionSingleNumber(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            firstNumber: 0,
            secondNumber: 0,
            solution: 0
        }

        let solution = AdditionBaseTaskGenerator.generateNumberFromTo(10, maxNumber);
        let secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9); // -1 because we dont want to have secondNumber 0
        let firstNumber = solution - secondNumber;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.firstNumber = firstNumber;
        taskWithSolution.secondNumber = secondNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }
}
