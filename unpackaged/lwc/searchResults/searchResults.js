import { LightningElement ,api, wire} from 'lwc';

import getAccountsOnAccountType from '@salesforce/apex/accountTypeController.getAccountsOnAccountType';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { refreshApex } from '@salesforce/apex';


export default class SearchResults extends LightningElement {
    @api selectedTypeValue;
    @wire(CurrentPageReference) pageRef;
    result;
    error;
    accountData;
    
    //This is used to get the data from class based on the type value
    @wire(getAccountsOnAccountType, { selectedTypeValue: '$selectedTypeValue'})
    onTypeChange(value) {
        console.log('>>>>onTypeChange>>>>');
        this.accountData = value;
        const { data, error } = value;
        if(data) {
            if(data.length>0){  
                this.result = data;
                this.error='';
            }
            else{
                this.error ='No Records Found!'
                this.result ='';
            }
        }
        else if (error) { 
            this.error = error;
            this.result ='';
        }
    }
    /*@api onTypeChange(selectedTypeValue){
        console.log('>>>>onTypeChange>>>>');
        getAccountsOnAccountType({selectedTypeValue : selectedTypeValue})
        .then(result => {
                console.log('>>>>>getAccountsOnAccountType>>>>>>',result);
                this.result = result;
            }
        )
        .catch(error => {
            console.log('>>>>>>>>>>',error);
            this.error = error;
        });
    }*/

    //This is used to listen the event which is fired from idsDetailComponent
    connectedCallback() {
        console.log('>>>connectedCallback>>>>..');
        registerListener("refreshevent", this.sutUpDetails, this);
    }

    //This is used to disconnect all the listner
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    //This method is called from the event which is listen from idsDetailComponent
    sutUpDetails(){
        //console.log('>>>>>>test>>>>');
        //this.accountId = accountId;
        console.log('>>>>>refreshevent>>>>>');
        return refreshApex(this.accountData);
    }

}