import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { fireEvent } from 'c/pubsub';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { refreshApex } from '@salesforce/apex';

export default class CardComponent extends LightningElement {
    @api accountData;
    @wire(CurrentPageReference) pageRef;

    onDetailButtonClick(){
        console.log('>>>>>>>onDetailButtonClick>>>>>',this.accountData.Id);
        fireEvent(this.pageRef, "eventdetails", this.accountData.Id);
    }

}