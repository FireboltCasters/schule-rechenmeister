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

        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        /**
         * Scheint alles gleich wahrscheinlich zu sein, sowohl Lösung als auch einzelne Zahlen
         */

        let firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1); // -1 because we dont want to have firstNumber 0
        let secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1);
        let firstNumberOne = firstNumber % 10;
        let secondNumberOne = secondNumber % 10;
        while(AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) || AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) || firstNumberOne+secondNumberOne < 10 || firstNumber+secondNumber > maxAsNumber) {
            firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1); // -1 because we dont want to have firstNumber 0
            secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1);
            firstNumberOne = firstNumber % 10;
            secondNumberOne = secondNumber % 10;
        }
        const solution = firstNumber + secondNumber;





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

        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        let solution = AdditionBaseTaskGenerator.generateNumberFromTo(10, maxAsNumber);
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
