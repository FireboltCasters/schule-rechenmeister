import React from "react";

import {
	BaseTemplate, MenuItem, EmptyTemplate,
	Navigation,
	PluginInterface, ThemedMarkdown,
} from "kitcheningredients";

import {SynchedStateKeys} from "./helper/SynchedStateKeys";
import {StorageKeys} from "./helper/StorageKeys";
import {MySync} from "./MySync";
import {MyLoading} from "./MyLoading";
import {MyRoot} from "./MyRoot";
import {ExampleHomeComponent} from "./testScreens/ExampleHomeComponent";
import {ExampleParamScreen} from "./testScreens/ExampleParamScreen";
import {AdditionWithTenTransition} from "./screens/games/additionAndSubtraction/AdditionWithTenTransition";
import {SelectAmountPlayersScreen} from "./screens/SelectAmountPlayersScreen";
import {SelectGameAdditionAndSubtractionGameType} from "./screens/games/additionAndSubtraction/SelectGameAdditionAndSubtractionGameType";
import {AdditionWithoutTenTransition} from "./screens/games/additionAndSubtraction/AdditionWithoutTenTransition";
import {SubtractionWithoutTenTransition} from "./screens/games/additionAndSubtraction/SubtractionWithoutTenTransition";
import {SubtractionWithTenTransition} from "./screens/games/additionAndSubtraction/SubtractionWithTenTransition";
import {AdditionWithTenTransitionSingleNumber} from "./screens/games/additionAndSubtraction/AdditionWithTenTransitionSingleNumber";
import {SubtractionWithTenTransitionSingleNumber} from "./screens/games/additionAndSubtraction/SubtractionWithTenTransitionSingleNumber";
import {PointOverview} from "./screens/PointOverview";
import {SelectGameType} from "./screens/games/SelectGameType";
import {MixWithoutTenTransition} from "./screens/games/additionAndSubtraction/MixWithoutTenTransition";
import {MixWithTenTransition} from "./screens/games/additionAndSubtraction/MixWithTenTransition";
import {MixWithTenTransitionSingleNumber} from "./screens/games/additionAndSubtraction/MixWithTenTransitionSingleNumber";
import {SelectGameLitle1x1GameType} from "./screens/games/litle1x1/SelectGameLitle1x1GameType";
import {MultiplicationCore} from "./screens/games/litle1x1/MultiplicationCore";
import {MultiplicationAll} from "./screens/games/litle1x1/MultiplicationAll";
import {DivisionCore} from "./screens/games/litle1x1/DivisionCore";
import {DivisionAll} from "./screens/games/litle1x1/DivisionAll";
import {MultiplicationDivisionMixCore} from "./screens/games/litle1x1/MultiplicationDivisionMixCore";
import {MultiplicationDivisionMixAll} from "./screens/games/litle1x1/MultiplicationDivisionMixAll";
import {TestDistributionOfTasks} from "./testScreens/TestDistributionOfTasks";

export default class Project extends PluginInterface{

	constructor() {
		super();
	}

	getSynchedStateKeysClass(){
		return SynchedStateKeys;
	}

	getStorageKeysClass(){
		return StorageKeys;
	}

  async registerRoutes(user, role, permissions){
	  let exampleParamRoute = Navigation.routeRegister({
		  component: ExampleParamScreen,
		  template: BaseTemplate,
		  params: {
			  testParam: 0
		  },
	  })

	  let routes = Navigation.routesRegisterMultipleFromComponents(
		  [
			  SelectAmountPlayersScreen,
			  PointOverview,
			  SelectGameType,
			  SelectGameAdditionAndSubtractionGameType,
			  AdditionWithoutTenTransition,
			  AdditionWithTenTransitionSingleNumber,
			  AdditionWithTenTransition,
			  SubtractionWithoutTenTransition,
			  SubtractionWithTenTransitionSingleNumber,
			  SubtractionWithTenTransition,
			  MixWithoutTenTransition,
			  MixWithTenTransitionSingleNumber,
			  MixWithTenTransition,
			  SelectGameLitle1x1GameType,
			  MultiplicationCore,
			  MultiplicationAll,
			  DivisionCore,
			  DivisionAll,
			  MultiplicationDivisionMixCore,
			  MultiplicationDivisionMixAll
		  ],
		  EmptyTemplate
	  )

	  let homeMenu = new MenuItem({
		  key: "home",
		  label: "Start",
		  command: () => {
		  	Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME, {key: Math.random()});
		  }
	  });

	  let aufgabenMenu = new MenuItem({
		  key: "tasks",
		  label: "Aufgaben",
		  command: () => {
			  Navigation.navigateTo(SelectGameAdditionGameType, {key: Math.random()});
		  }
	  });


	  let testingRoutes = Navigation.routesRegisterMultipleFromComponents(
		  [
			  TestDistributionOfTasks
		  ],
		  BaseTemplate
	  )
	  let testingMenu = new MenuItem({
		  key: "testing",
		  label: "Überprüfung der Gleichverteilung",
		  command: () => {
			  Navigation.navigateTo(TestDistributionOfTasks, {key: Math.random()});
		  }
	  });

	  Navigation.menuRegister(homeMenu);
	  Navigation.menuRegister(aufgabenMenu);
	  Navigation.menuRegister(testingMenu);
	}

	async initApp() {
		console.log("Project init")
	}

	async onLogin(user, role){

	}

	async onLogout(error){
		if(!error){
			//normal logout
		} else {
			//logout on error
		}
	}

	getAboutUsComponent() {
		const markdown = `
# Über uns

Ich bin Nils Baumgartner und ich habe diese kleine App für Kinder in der Grundschule entwickelt. Viel mehr gibt es nicht zu sagen. Ich wünsche viel Spaß.

Kontakt: nilsbaumgartner1994@gmail.com
`

    return <ThemedMarkdown>
		{markdown}
	</ThemedMarkdown>
	}

	getPrivacyPolicyComponent() {
		const markdown = `
# Datenschutz

Diese App speichert lediglich notwendige Cookies um die App zu betreiben. Es werden keine Daten an Dritte weitergegeben. Es werden lediglich die Punkte der Spieler zwischengespeichert und nach jedem neuen Spiel gelöscht. Die Daten werden aber auch nicht weiter gesendet.
`

		return <ThemedMarkdown>
			{markdown}
		</ThemedMarkdown>
	}

	getTermsAndConditionsComponent() {
		const markdown = `
# Nutzungsbedingungen

Diese App ist kostenlos und darf ohne Einschränkungen genutzt werden. Es gibt keine Garantie auf Fehlerfreiheit oder sonstige Fehler. Es wird keine Haftung übernommen.
`

		return <ThemedMarkdown>
			{markdown}
		</ThemedMarkdown>
	}

	getHomeComponent(): any {
//		return <PointOverview />
    	return <ExampleHomeComponent />
	}

  getLoadingComponent(){
	  return <MyLoading />;
  }

  getSyncComponent(): any {
    return <MySync />
  }

	getRootComponent(){
	  return <MyRoot />
	}

	renderCustomAuthProviders(serverInfo): []{
		//@ts-ignore
		return null;
	}

	getSettingsComponent(): any {
		//return null // we have overwritten it
	}

	getCustomProjectLogoComponent(): any {

	}

}
