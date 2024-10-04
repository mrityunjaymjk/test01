import { LightningElement, track, wire,api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountDataForLWC.getAccountList';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Owner', fieldName: 'OwnerId' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Number Of Employees', fieldName: 'NumberOfEmployees' },
];
const pageSize = 100;
export default class ApexDatatableExample extends LightningElement {

    @track 
    currentPage = 1;
    totalRecords;
    totalPages;
    error;
    columns = columns;
    connectedCallback(){
        console.log("call aaya");
    }
    @wire(getAccountList)
    accounts;
}