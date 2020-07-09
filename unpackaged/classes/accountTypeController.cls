public class accountTypeController {
	@AuraEnabled(cacheable=true)
    public static List<Account> getAccountsOnAccountType(String selectedTypeValue){
        return [select id,name,type,Phone,industry,Active__c,AccountNumber,Website from Account where type =: selectedTypeValue];
    }
}