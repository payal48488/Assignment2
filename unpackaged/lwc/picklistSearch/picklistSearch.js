import { LightningElement, wire, track } from 'lwc';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';

export default class PicklistSearch extends LightningElement {
    selectedTypeValue;
    onLoad = true;
    isDisabled = true;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) objectInfo;//This is used to get the object info 
    
    //This is used to get the type value of account object based on the default record Type Id
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId' , fieldApiName: ACCOUNT_TYPE }) accountTypeArray;

    //This is used the get the first value after account type picklist is shown
    renderedCallback(){
        if(this.accountTypeArray.data && this.onLoad){
            this.isDisabled = false;
            this.onLoad = false;
            this.selectedTypeValue = this.accountTypeArray.data.values[0].value;
        }
    }

    //This is used to get the type picklist and if data is not find than we return blank in this
    get typeOptions(){
        return this.accountTypeArray.data ? this.accountTypeArray.data.values : {};
    }

    //This is called on account type picklist value change
    handleTypeChange(event){
        this.selectedTypeValue = event.detail.value;
    }

    //This method is called on search button click
    onTypeSearch(){
        this.dispatchEvent(new CustomEvent('passselectedvalue',{detail : this.selectedTypeValue}));
    }

}