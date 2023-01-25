import React from "react";

export class SubtractionTaskGenerator {

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

        const maxTen = SubtractionTaskGenerator.getMaxTen(maxNumber);

        // Normal addition without ten transition
        const firstNumberTen = SubtractionTaskGenerator.generateNumberFromTo(0, maxTen); // highest ==> 19
        const firstNumberOne = SubtractionTaskGenerator.generateNumberFromTo(1, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne;
        const secondNumberTen = SubtractionTaskGenerator.generateNumberFromTo(0, maxTen-firstNumberTen);
        let secondNumberOne = SubtractionTaskGenerator.generateNumberFromTo(1, 9-firstNumberOne+1); // allow to become 10
        const secondNumber = secondNumberTen * 10 + secondNumberOne;
        const solution = firstNumber + secondNumber;

        // Reverse the addition task to get the subtraction task
        taskWithSolution.task = solution + " - "+firstNumber;
        taskWithSolution.solution = secondNumber;

        return taskWithSolution;
    }

    static generateWithTenTransition(maxNumber: any) {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const maxTen = SubtractionTaskGenerator.getMaxTen(maxNumber);

        // Normal addition with ten transition
        const firstNumberTen = SubtractionTaskGenerator.generateNumberFromTo(0, maxTen);
        const firstNumberOne = SubtractionTaskGenerator.generateNumberFromTo(1, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne; // highest would be 99 for maxTen=9 (100er)
        const secondNumberTenMin = firstNumberTen===maxTen ? 0 : 1; // min that if (100er) the number would bring me to 100
        const secondNumberTen = SubtractionTaskGenerator.generateNumberFromTo(secondNumberTenMin, (maxTen)-firstNumberTen); // highest would be 8X if firstNumberTen is 0
        let secondNumberOneMax = firstNumberTen===maxTen ? 10-firstNumberOne : 9; // max that if (100er) the number would bring me to 100
        let secondNumberOne = SubtractionTaskGenerator.generateNumberFromTo(10-firstNumberOne, secondNumberOneMax); // highest would be X9
        const secondNumber = secondNumberTen * 10 + secondNumberOne; // highest would be 89 if firstNumberTen is 0

        const solution = firstNumber + secondNumber;

        // Reverse the addition task to get the subtraction task
        taskWithSolution.task = solution + " - " + firstNumber;
        taskWithSolution.solution = secondNumber;

        return taskWithSolution;
    }

    static generateWithTenTransitionSingleNumber(maxNumber: any) {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        const maxTen = SubtractionTaskGenerator.getMaxTen(maxNumber);

        // Normal addition with ten transition
        const firstNumberTen = SubtractionTaskGenerator.generateNumberFromTo(0, maxTen); // highest would be 8X
        const firstNumberOne = SubtractionTaskGenerator.generateNumberFromTo(1, 9); // highest would be X9
        const firstNumber = firstNumberTen * 10 + firstNumberOne; // highest would be 89
        const secondNumberTen = 0; // highest would be 8X if firstNumberTen is 0
        let secondNumberOneMax = firstNumberTen===maxTen ? 10-firstNumberOne : 9; // max that if (100er) the number would bring me to 100
        let secondNumberOne = SubtractionTaskGenerator.generateNumberFromTo(10-firstNumberOne, secondNumberOneMax); // highest would be X9
        const secondNumber = secondNumberTen * 10 + secondNumberOne; // highest would be 89 if firstNumberTen is 0
        const solution = firstNumber + secondNumber;

        // Reverse the addition task to get the subtraction task
        taskWithSolution.task = solution + " - " + secondNumber;
        taskWithSolution.solution = firstNumber;

        return taskWithSolution;
    }
}
