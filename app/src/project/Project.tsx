import React from "react";

import {
	BaseTemplate, MenuItem,
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
import {AdditionWithTenTransition} from "./screens/AdditionWithTenTransition";
import {SelectAmountPlayersScreen} from "./screens/SelectAmountPlayersScreen";

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
			  AdditionWithTenTransition,
			  SelectAmountPlayersScreen,
		  ],
		  BaseTemplate
	  )

	  let docs = new MenuItem({
		  key: "tasks",
		  label: "Aufgaben",
	  });

	  docs.addChildMenuItems(MenuItem.fromRoutes(routes));
	  docs.addChildMenuItem(MenuItem.fromRoute(exampleParamRoute));

	  Navigation.menuRegister(docs);
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
    return <ExampleHomeComponent />
	}

  getLoadingComponent(){
	  return <MyLoading />;
  }

  getSyncComponent(): any {
    //return <MySync />
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
