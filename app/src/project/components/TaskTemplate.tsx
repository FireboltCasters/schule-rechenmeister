import React, {FunctionComponent, useEffect, useState} from "react";
import {Text, View} from "native-base";
import {MyStates} from "../states/MyStates";
import {CurrentPlayerName} from "./CurrentPlayerName";
import {MySpacer} from "./MySpacer";
import {PlayerStats} from "./PlayerStats";
import {MyButton} from "./MyButton";
import {MyFontSizes} from "./MyFontSizes";
import {GridList, Icon, MyThemedBox, Navigation} from "kitcheningredients";
import {MyButtonView} from "./MyButtonView";
import {AnimationCorrect} from "../animations/AnimationCorrect";
import {AnimationWrong} from "../animations/AnimationWrong";
import {SelectGameType} from "../screens/SelectGameType";
import {GoBackRow} from "./GoBackRow";
import {GoHome} from "./GoHome";
import {GoEndGame} from "./GoEndGame";
import {AnimationDonkey} from "../animations/AnimationDonkey";

export const TaskTemplate: FunctionComponent = (props) => {

    const ANIMATION_CORRECT = "correct";
    const ANIMATION_WRONG = "wrong";
    const ANIMATION_DONKEY = "donkey";
    const ANIMATION_DONKEY_INPUT_VALUE = 7353;

    const defaultGenerateTask = () => {
        return {
            task: "5+5",
            solution: 10,
        }
    }

    const useGenerateTaskFun = props?.generateTaskWithSolution || defaultGenerateTask;

    const [showAnimation, setShowAnimation] = useState("none");


    const [currentTaskWithSolution, setCurrentTaskWithSolution] = useState(useGenerateTaskFun())
    const task = currentTaskWithSolution?.task;
    const solution = currentTaskWithSolution?.solution;

    const [input, setInput] = useState("");

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer] = MyStates.useCurrentPlayer();
    const currentPlayerName = currentPlayer?.name;

    const [players, setPlayers] = MyStates.usePlayers();

    function renderPlayerName(){
        return(
            <View style={{width: "100%", alignItems: "center", justifyContent: "center", paddingBottom: "5px"}}>
                <View style={{borderRadius: "10px", overflow: "hidden"}}>
                    <MyThemedBox _shadeLevel={3}>
                        <View style={{paddingHorizontal: 20}}>
                            <Text fontSize={MyFontSizes.HEADING}>{currentPlayerName+":"}</Text>
                        </View>
                    </MyThemedBox>
                </View>
            </View>
        )
    }

    function renderTask(){
        const COLOR_TASK = "#fff2cc";

        return (
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", backgroundColor: COLOR_TASK, paddingHorizontal: "30px", borderRadius: "20px"}}>
                <View style={{width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <Text fontSize={"6xl"} bold={true}>{task+" = "}</Text>
                    <View style={{paddingLeft: 10, width: "20%", paddingVertical: 10}}>
                        <MyButtonView><Text fontSize={"6xl"}>{input || " "}</Text></MyButtonView>
                    </View>
                </View>
            </View>
        )
    }

    function renderAnimationOverlay(animationComponent, hideSolution?){
        let correctSolutionView = (
            <View>
                <MyButtonView>
                    <Text fontSize={"6xl"}>{task+" = "+solution}</Text>
                </MyButtonView>
            </View>
        )
        if(hideSolution){
            correctSolutionView = null;
        }

        return (
            <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", opacity: 0.95}}></View>
                <View style={{width: "100%", height: "200px"}} />
                {correctSolutionView}
                {animationComponent}
            </View>
        )
    }

    function renderAnimation(){
        if(showAnimation === ANIMATION_DONKEY){
            return (
                renderAnimationOverlay(
                    <AnimationDonkey />, true
                )
            )
        }
        if(showAnimation === ANIMATION_CORRECT){
            return (
                renderAnimationOverlay(
                    <AnimationCorrect />
                )
            )
        } else if(showAnimation === ANIMATION_WRONG){
            return (
                renderAnimationOverlay(
                    <AnimationWrong />
                )
            )
        } else {
            return null;
        }
    }

    function renderInputFields(){
        let inputFields = [];
        for(let i=0; i<=9; i++){
            inputFields.push(
                <MyButton onPress={() => {
                    let nextInput = input + "" + i;
                    let asNumber = parseInt(nextInput);
                    setInput(""+asNumber);
                }}>
                    <Text fontSize={MyFontSizes.BUTTON}>{i}</Text>
                </MyButton>
            );
        }
        return inputFields;
    }

    function renderUserInputFields(){
        let defaultBreakpoints = {
            base: 5,
        }

        return (
            <View style={{width: "100%"}}>
                <GridList beakpointsColumns={defaultBreakpoints}>
                    {renderInputFields()}
                </GridList>
            </View>
        )
    }

    function handleConfirm(){
        let asNumber = parseInt(input);

        if(asNumber === ANIMATION_DONKEY_INPUT_VALUE){
            setShowAnimation(ANIMATION_DONKEY);
            return;
        }


        const isCorrect = asNumber === solution;
        if(isCorrect){
            currentPlayer.score = parseInt(currentPlayer.score) + 1;
            players[currentPlayer.id] = currentPlayer;
            setPlayers(players);
        }
        setShowAnimation(isCorrect ? ANIMATION_CORRECT : ANIMATION_WRONG);
    }

    function renderConfirmAndReset(){
        let defaultBreakpoints = {
            base: 1,
        }

        return(
            <View style={{width: "100%"}}>
                <GridList beakpointsColumns={defaultBreakpoints}>
                    <MyButton style={{borderColor: "green", borderWidth: 3}} onPress={() => {
                        handleConfirm();
                    }}>
                        <Icon size={MyFontSizes.BUTTON} name={"check"} />
                    </MyButton>
                    <MyButton style={{borderColor: "red", borderWidth: 3}} onPress={() => {
                        setInput("");
                    }}>
                        <Icon size={MyFontSizes.BUTTON} name={"trash-can"} />
                    </MyButton>
                </GridList>
            </View>
        )
    }

    function renderInputRow(){

        return (
            <View style={{width: "100%", flexDirection: "row"}}>
                <View style={{width: "70%"}}>
                    {renderUserInputFields()}
                </View>
                <View style={{width: "10%"}} />
                <View style={{width: "20%"}}>
                    {renderConfirmAndReset()}
                </View>
            </View>
        )
    }

    useEffect(() => {
        // wait 3 seconds then hide animation
        if(showAnimation !== "none"){
            const animationCorrect = showAnimation === ANIMATION_CORRECT;
            const timeForCorrectAnimation = 1800;
            const timeForWrongAnimation = 3000;
            const timeout = animationCorrect ? timeForCorrectAnimation : timeForWrongAnimation;

            setTimeout(() => {
                    setShowAnimation("none");
                    setCurrentTaskWithSolution(useGenerateTaskFun());
                    setInput("");
                    setNextCurrentPlayer();
                }, timeout);
        }
    }, [showAnimation])

  return (
      <>
          <View style={{width: "100%", padding: "20px"}}>
              <GoEndGame />
              {renderPlayerName()}
              {renderTask()}
              <View style={{height: "10px"}} />
              {renderInputRow()}
              <View style={{height: "10px"}} />
              <PlayerStats />
              {renderAnimation()}
          </View>
      </>
  );
}
