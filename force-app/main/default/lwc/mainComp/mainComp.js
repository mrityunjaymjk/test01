import { LightningElement,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountDataForLWC.getAccountList';
import getCount from '@salesforce/apex/AccountDataForLWC.getCount';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';
import searchIndustry from '@salesforce/apex/AccountSearchControllerIndustry.searchIndustry';
import searchByRevenue from '@salesforce/apex/RevenueSearchController.searchByRevenue';
import searchByType from '@salesforce/apex/TypeSearchController.searchByType';
import searchByOwnerName from '@salesforce/apex/OwnerSearchController.searchByOwnerName';
import searchByPhone from '@salesforce/apex/PhoneSearchController.searchByPhone';
import searchByRating from '@salesforce/apex/RatingSearchController.searchByRating';


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Owner', fieldName: 'OwnerId' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Number Of Employees', fieldName: 'NumberOfEmployees' },
];

export default class MainComp extends LightningElement {
    @track accSearch = '';
    @track indusSearch = '';
    @track revenueSearch = null;
    @track typeSearch = '';
    @track ownerSearch = '';
    @track phoneSearch = '';
    @track ratingSearch = '';
    accounts;
    currentPage = 0;
    totalRecords;
    totalPages;
    pageSize=5;
    error;
    columns = columns;

    // nextSubmit = this.handleNext.bind(this);
    // previousSubmit = this.handlePrevious.bind(this);

    @wire(getAccountList, { Start: '$currentPage',AccountsLimit:'$pageSize' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            console.log(data);
        } else if (error) {
        }
    }
    @wire(getCount)
    wiredAccountCount({ error, data }) {
        if (data) {
            this.totalRecords = data;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize); 
        } else if (error) {
            this.error = error;
            this.totalRecords = 0;
        }
    }
    handleNext(){        
        if (this.currentPage <= this.totalPages) {
            console.log("current page",this.currentPage,"total pages",this.totalPages);
            console.log("totalRecords",this.totalRecords);
            this.currentPage++;
        }
    }
    handlePrevious(){
        if (this.currentPage > 0) {
            console.log("current page",this.currentPage,"total pages",this.totalPages);
            console.log("totalRecords",this.totalRecords);
            this.currentPage--;
        }
    }
    handleSearchChange(event) {
        this.accSearch = event.target.value;
    }
    handleSearchChangeIndus(event) {
        this.indusSearch = event.target.value;
    }
    handleRevenueChange(event) {
        this.revenueSearch = event.target.value ? parseFloat(event.target.value) : null;
    }

    handleTypeChange(event) {
        this.typeSearch = event.target.value;
    }
    handleOwnerChange(event) {
        this.ownerSearch = event.target.value;
    }
    handlePhoneChange(event) {
        this.phoneSearch = event.target.value;
    }
    handleRatingChange(event) {
        this.ratingSearch = event.target.value;
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.searchAccounts();
        }
    }
    handleKeyPressIndus(event) {
        if (event.key === 'Enter') {
            this.searchIndustry();
        }
    }
    handleKeyPressRevenew(event) {
        if (event.key === 'Enter') {
            this.searchByRevenue();
        }
    }
    handleKeyPressType(event) {
        if (event.key === 'Enter') {
            this.searchByType();
        }
    }
    handleKeyPressOwner(event) {
        if (event.key === 'Enter') {
            this.searchByOwnerName();
        }
    }
    handleKeyPressPhone(event) {
        if (event.key === 'Enter') {
            this.searchByPhone();
        }
    }
    handleKeyPressRating(event) {
        if (event.key === 'Enter') {
            this.searchByRating();
        }
    }

    searchAccounts() {
        if (this.accSearch) {
            searchAccounts({ accSearch: this.accSearch })
                .then((result) => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                    this.accounts = undefined;
                });
        }
    }
    searchIndustry() {
        if (this.indusSearch) {
            searchIndustry({ indusSearch: this.indusSearch })
                .then((result) => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch((error) => {
                    console.error("Error fetching accounts: ", error);
                    this.error = 'Error retrieving accounts. Please try again.';
                    this.accounts = undefined;
                });
        }
    }
    searchByRevenue() {
        if (this.revenueSearch) {
            searchByRevenue({ revenueSearch: this.revenueSearch })
                .then(result => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    console.error('Error fetching accounts by revenue: ', error);
                    this.error = 'Error searching by Annual Revenue.';
                });
        }
    }
    searchByType() {
        if (this.typeSearch) {
            searchByType({ typeSearch: this.typeSearch })
                .then(result => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    console.error('Error fetching accounts by type: ', error);
                    this.error = 'Error searching by Type.';
                });
        }
    }
    searchByOwnerName() {
        if (this.ownerSearch) {
            searchByOwnerName({ ownerSearch: this.ownerSearch })
                .then(result => {
                    his.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    console.error('Error fetching accounts by owner: ', error);
                    this.error = 'Error searching by Owner Name.';
                });
        }
    }
    searchByPhone() {
        if (this.phoneSearch) {
            searchByPhone({ phoneSearch: this.phoneSearch })
                .then(result => {
                    his.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    console.error('Error fetching accounts by phone: ', error);
                    this.error = 'Error searching by Phone.';
                });
        }
    }
    searchByRating() {
        if (this.ratingSearch) {
            searchByRating({ ratingSearch: this.ratingSearch })
                .then(result => {
                    this.accounts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    console.error('Error fetching accounts by rating: ', error);
                    this.error = 'Error searching by Rating.';
                });
        }

    }
      
}