import { LightningElement, wire, api} from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord ,getFieldValue} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';
import WEBSITE from '@salesforce/schema/Account.Website';
import { fireEvent } from 'c/pubsub';

export default class LdsDetailComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api accountId;
    isEdit = false;

    //This is used to get the record based on the record id
    @wire(getRecord, { recordId: '$accountId', fields: [ACCOUNT_NAME_FIELD,INDUSTRY_FIELD,PHONE_FIELD,OWNER_NAME_FIELD,ACCOUNT_NUMBER,WEBSITE] ,modes : "view"})
    accountData;

    //this is used to listen the event from cardComponent
    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
    }

    //This is used to disconnect all the listner from this component
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    //This is called from the event which is fired from cardComponent
    sutUpDetails(accountId){
        console.log('>>>>>>test>>>>');
        this.accountId = accountId;
        console.log('>>>>>accountId>>>>>',this.accountId);
    }

    //This is used to get the name of account record
    get name() {
        return getFieldValue(this.accountData.data, ACCOUNT_NAME_FIELD);
    }
    //This is used to get the phone of account record
    get phone() {
        return getFieldValue(this.accountData.data, PHONE_FIELD);
    }
    //This is used to get the industry of account record
    get industry(){
        return getFieldValue(this.accountData.data, INDUSTRY_FIELD);
    }
    //This is used to get the owner of account record
    get owner() {
        return getFieldValue(this.accountData.data, OWNER_NAME_FIELD);
    }
    //This is used to get the accountNumber of account record
    get accountNumber(){
        return getFieldValue(this.accountData.data, ACCOUNT_NUMBER);
    }
    //This is used to get the Website of account record
    get Website(){
        return getFieldValue(this.accountData.data, WEBSITE);
    }

    //This is called on Edit button click
    onEditClick(){
        console.log('>>>>>>onEditClick>>>>>');
        this.isEdit = true;
    }

    //This is used on save button click
    saveClick() {
        console.log('>>>>>saveClick>>>>>>>>',this.fields);
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
        this.isEdit = false;
        
    }
    
    //This is used on cancel button click
    handleReset(event) {
        console.log('>>>>>handleReset>>>>>>>>');
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
                this.isEdit = false;
            });
        }
    }

    //This is used on successfull update of record
    onSuccess(event) {
        const toastevent = new ShowToastEvent({
            title: 'Success',
            message: 'Account Updated Sucessfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastevent);
        fireEvent(this.pageRef, "refreshevent", "event fired");
        console.log('>>>>>Event Fired>>>>>');
    }

    //This is called on error of updation of record
    onError(event){
        const toastevent = new ShowToastEvent({
            title: 'Error',
            message: 'Account is not Updated',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastevent);
    }

    get onLoad(){
        return this.accountId == undefined ? true : false;
    }
}