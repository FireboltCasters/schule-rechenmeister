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
import {AdditionWithTenTransition} from "./screens/games/AdditionWithTenTransition";
import {SelectAmountPlayersScreen} from "./screens/SelectAmountPlayersScreen";
import {SelectGameType} from "./screens/SelectGameType";
import {AdditionWithoutTenTransition} from "./screens/games/AdditionWithoutTenTransition";
import {SubtractionWithoutTenTransition} from "./screens/games/SubtractionWithoutTenTransition";
import {SubtractionWithTenTransition} from "./screens/games/SubtractionWithTenTransition";
import {AdditionWithTenTransitionSingleNumber} from "./screens/games/AdditionWithTenTransitionSingleNumber";
import {SubtractionWithTenTransitionSingleNumber} from "./screens/games/SubtractionWithTenTransitionSingleNumber";
import {PointOverview} from "./screens/PointOverview";

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
			  SelectAmountPlayersScreen,
			  PointOverview,
			  SelectGameType,
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
			  Navigation.navigateTo(SelectGameType, {key: Math.random()});
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
