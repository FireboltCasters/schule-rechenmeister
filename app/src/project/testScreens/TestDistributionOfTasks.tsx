import React, {FunctionComponent, useState} from "react";
import {Button, Text, View} from "native-base";
import {Navigation} from "kitcheningredients";
import {TouchableOpacity} from "react-native";
import {MySpacer} from "../components/MySpacer";
import {AdditionBaseTaskGenerator} from "../screens/games/additionAndSubtraction/helper/AdditionBaseTaskGenerator";

export const TestDistributionOfTasks: FunctionComponent = (props) => {

    const STARTING_COUNTER = 1;
    const ENDING_COUNTER = 100;
    const AMOUNT_OF_TASKS_PER_KEY = 10000;
    const AMOUNT_OF_TASKS = ENDING_COUNTER*AMOUNT_OF_TASKS_PER_KEY;

    function getInitialMatrix(){
        let initialMatrix = {};
        for(let i = STARTING_COUNTER; i <= ENDING_COUNTER; i++){
            initialMatrix[i+""] = 0;
        }
        return initialMatrix;
    }

    const [matrix, setMatrix] = useState(getInitialMatrix());
    const [tasks, setTasks] = useState([]);

    function renderMatrix(){
        let rows = [];
        for(let i = STARTING_COUNTER; i <= ENDING_COUNTER; i++){
            let value = matrix[i+""];
            rows.push(<View key={i+""} style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1, borderWidth: 1, borderColor: "white"}}>
                    <Text key={i+"Key"}>{"Key: "+i}</Text>
                </View>
                <View style={{flex: 1, borderWidth: 1, borderColor: "white"}}>
                    <Text key={i+"Value"}>{value}</Text>
                </View>
            </View>);
        }
        return <View style={{width: "100%"}}>
            {rows}
        </View>;
    }

    function checkDistributionForFunction(func: Function, fieldName: string, secondFieldName?: string){
        console.log("Start Test");
        let matrix = getInitialMatrix();
        let initialTasks = [];
        for(let i=0; i<AMOUNT_OF_TASKS; i++){
            let baseTask = func(ENDING_COUNTER)
            if(initialTasks.length < 1000){
                initialTasks.push(<View key={i+""}><Text>{baseTask?.higherNumber+" ? "+baseTask?.lowerNumber+" = "+baseTask?.solution}</Text></View>);
            }
            let key = baseTask[fieldName]+"";
            let value = matrix[key];
            value++;
            matrix[key] = value;
            if(secondFieldName){
                let secondKey = baseTask[secondFieldName]+"";
                let secondValue = matrix[secondKey];
                secondValue++;
                matrix[secondKey] = secondValue;
            }

        }
        setMatrix(matrix);
        setTasks(initialTasks);
    }

  return (
    <View style={{width: "100%"}}>
        <Text>{"Dieser Test prüft die Gleichverteilung der Lösungen und Aufgaben"}</Text>
        <Text>{"Es werden "+AMOUNT_OF_TASKS+" Aufgaben generiert, sogesehen "+AMOUNT_OF_TASKS_PER_KEY+" pro Zahl"}</Text>

        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithoutTenTransition, "solution");
        }}>
            <Text>{"Test Lösung: Addition ohne Zehnerübergang"}</Text>
            <Text>{"Es sollte zu sehen sein: Eine 'Treppe'"}</Text>
        </Button>
        <MySpacer/>
        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber, "solution");
        }}>
            <Text>{"Test Lösung: Addition mit einfachen Zehnerübergang"}</Text>
            <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
        </Button>
        <MySpacer/>
        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransition, "solution");
        }}>
            <Text>{"Test Lösung: Addition mit allen Zehnerübergängen"}</Text>
            <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
        </Button>
        <MySpacer/>
        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithoutTenTransition, "firstNumber", "secondNumber");
        }}>
            <Text>{"Test größere Zahl: Addition ohne Zehnerübergang"}</Text>
            <Text>{"Es sollte zu sehen sein: Eine 'Treppe'"}</Text>
        </Button>
        <MySpacer/>
        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber, "higherNumber", "lowerNumber");
        }}>
            <Text>{"Test größere Zahl: Addition mit einfachen Zehnerübergang"}</Text>
            <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
        </Button>
        <MySpacer/>
        <Button onPress={() => {
            checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransition, "higherNumber", "lowerNumber");
        }}>
            <Text>{"Test größere Zahl: Addition mit allen Zehnerübergängen"}</Text>
            <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
        </Button>
        <MySpacer/>


        <Text>{"Ergebnisse"}</Text>
        <View style={{width: "100%"}}>
            {renderMatrix()}
        </View>
        <View style={{width: "100%"}}>
            {tasks}
        </View>
    </View>
  );
}
