import { LightningElement } from 'lwc';

export default class RootParent extends LightningElement {
    selectedTypeValue;
    /*This method is called from the event which is fired from picklistSearch Component*/
    handleEvent(event){
        console.log('>>>>>>>>>>>>>>>>',event);
        console.log('>>>>>handleEvent>>>>>',event.detail);
        this.selectedTypeValue = event.detail;
        //this.template.querySelector("c-search-results").onTypeChange(event.detail);
    }
}