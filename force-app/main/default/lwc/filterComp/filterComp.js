import { LightningElement,api } from 'lwc';

export default class FilterComp extends LightningElement {
    @api recordId;

    myValue = "initial value";
    
    renderedCallback() {
        this.template
          .querySelector("lightning-input")
          .addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              this.handleEnter();
            }
          });
      }
    handleEnter(e) {
        if (e.keyCode === 13){
            console.log("pressed enter");
            const typedValue = evt.target.value;
            console.log("pressed enter",trimmedValue,typedValue);
        }
      }
}