import { LightningElement,api,track } from 'lwc';

export default class PaginationComp extends LightningElement {
    @api nextCallback;
    @api previousCallback;
    
    handleClickBack(){
        this.previousCallback()
        
    }
    handleClickNext(){
        this.nextCallback()
    }
}