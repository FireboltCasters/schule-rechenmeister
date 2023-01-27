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
    const [whatToTest, setWhatToTest] = useState("Lösungswerte");

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
        for(let i = STARTING_COUNTER; i <= ENDING_COUNTER+10; i++){
            let value = matrix[i+""];
            rows.push(<View key={i+""} style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1, borderWidth: 1, borderColor: "white"}}>
                    <Text key={i+"Key"}>{"Zahl: "+i}</Text>
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

    function checkDistributionForFunction(func: Function, fieldName: string, secondFieldName?: string, onlyDigits?: boolean){
        console.log("Start Test");
        let matrix = getInitialMatrix();
        let initialTasks = [];
        for(let i=0; i<AMOUNT_OF_TASKS; i++){
            let baseTask = func(ENDING_COUNTER)
            if(initialTasks.length < 100){
                initialTasks.push(<View key={i+""}><Text>{baseTask?.higherNumber+" ? "+baseTask?.lowerNumber+" = "+baseTask?.solution}</Text></View>);
            }
            let key = baseTask[fieldName]+"";
            if(onlyDigits){
                key = ""+parseInt(key)%10;
            }
            let value = matrix[key];
            value++;
            matrix[key] = value;
            if(secondFieldName){
                let secondKey = baseTask[secondFieldName]+"";
                if(onlyDigits){
                    secondKey = ""+parseInt(secondKey)%10;
                }
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

        <Text>{"Was soll getestet werden: "}</Text>
        <View style={{width: "100%", flexDirection: "row"}}>
            <View style={{flex: 1, padding: 5}}>
                <Button onPress={() => {
                    setWhatToTest("Test Lösung: Addition ohne Zehnerübergang");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithoutTenTransition, "solution");
                }}>
                    <Text>{"Summe: Addition ohne ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: Eine 'Treppe'"}</Text>
                <Text>{"Umgekehrt als bei 'Addition mit allen Zehnerübergängen'"}</Text>
                <MySpacer/>
                <Button onPress={() => {
                    setWhatToTest("Test größere Zahl: Addition ohne Zehnerübergang");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithoutTenTransition, "higherNumber", "lowerNumber");
                }}>
                    <Text>{"Summand: Addition ohne ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: Je 10er Block beginnt hoch und geht runter; Nächster Block beginnt jedoch wieder höher"}</Text>
                <Text>{"Umgekehrt als bei 'Addition ohne Zehnerübergang'"}</Text>
            </View>
            <View style={{flex: 1, padding: 5}}>
                <Button onPress={() => {
                    setWhatToTest("Test Lösung: Addition mit einfachen Zehnerübergang");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber, "solution");
                }}>
                    <Text>{"Summe: Addition mit einf. ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
                <MySpacer/>
                <Button onPress={() => {
                    setWhatToTest("Test größere Zahl: Addition mit einfachen Zehnerübergang");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber, "firstNumber");
                }}>
                    <Text>{"Summand Ziffer: Addition mit einf. ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte die Wahrscheinlichkeit zu sehen sein: 1-9 Aufsteigend; 10-90 gleich; 90-99 Absteigend"}</Text>
                <MySpacer/>
                <Button onPress={() => {
                    setWhatToTest("Test kleinere Zahl: Addition mit einfachen Zehnerübergang");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber, "secondNumber");
                }}>
                    <Text>{"Summand groß: Addition mit einf. ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: Nur 1-9 alle gleich Wahrscheinlich"}</Text>
            </View>
            <View style={{flex: 1, padding: 5}}>
                <Button onPress={() => {
                    setWhatToTest("Test Lösung: Addition mit allen Zehnerübergängen");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransition, "solution");
                }}>
                    <Text>{"Summe: Addition mit allen ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: 0-9 nichts, und alle 9er leer, sonst gleichverteilt"}</Text>
                <MySpacer/>

                <Button onPress={() => {
                    setWhatToTest("Test Summanden: Addition mit allen Zehnerübergängen");
                    checkDistributionForFunction(AdditionBaseTaskGenerator.generateWithTenTransition, "higherNumber", "lowerNumber");
                }}>
                    <Text>{"Summanden: Addition mit allen ZÜ"}</Text>
                </Button>
                <Text>{"Es sollte zu sehen sein: Alle 10er 0; Wahrscheinlichkeit jeder Einer-Ziffer sinkt im nächsten Block."}</Text>
                <MySpacer/>
            </View>
        </View>



        <Text>{"Angezeigt wird die Verteilung der: "+whatToTest}</Text>
        <View style={{width: "100%"}}>
            {renderMatrix()}
        </View>
        <View style={{width: "100%"}}>
            {tasks}
        </View>
    </View>
  );
}
