import React from "react";

import {
	BaseTemplate, MenuItem, EmptyTemplate,
	Navigation,
	PluginInterface,
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
			  AdditionWithoutTenTransition,
			  AdditionWithTenTransitionSingleNumber,
			  AdditionWithTenTransition,
			  SubtractionWithoutTenTransition,
			  SubtractionWithTenTransitionSingleNumber,
			  SubtractionWithTenTransition,
			  MixWithoutTenTransition,
			  MixWithTenTransitionSingleNumber,
			  MixWithTenTransition,
			  SelectGameAdditionAndSubtractionGameType,
			  SubtractionWithTenTransition,
			  SelectGameType,
			  SelectAmountPlayersScreen,
			  PointOverview,
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

	  Navigation.menuRegister(homeMenu);
	  Navigation.menuRegister(aufgabenMenu);
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
    return null
	}

	getPrivacyPolicyComponent() {
    return null
	}

	getTermsAndConditionsComponent() {
    return null
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
