define(['models'], function (providers) {
    providers.service('Supplier', ['ValidatorService', 'DdsFactory', '$q', function (ValidatorService, DdsFactory, $q) {
        this.$get = function () {
            var $self;
            function Supplier(param) {
                $self = this;
                if (typeof param === 'string') {
                    $self.loadFromId(param);
                } else if (typeof  param === 'object') {
                    $self.loadFromJSON(param);
                } else {
                    $self.loadNew();
                }
            };
            Supplier.prototype.loadFromId = function(id){};
            Supplier.prototype.loadFromJSON = function(json){};
            Supplier.prototype.loadNew = function(){
                var q = $q.defer();

                $self.type = null;
                $self.firstName = null;
                $self.lastName = null;
                $self.nameTitle = null;
                $self.belongToCompany = null;
                $self.keyword = null;
                $self.customerFullName = null;
                $self.accountName = null;
                $self.accountNumber = null;
                $self.remark = null;
                $self.telephones = [];
                $self.mobiles = [];
                $self.faxes = [];
                $self.emails = [];
                $self.urls = [];

                $q.all(DdsFactory.get([
                        'ContactInfo.Telephone',
                        'ContactInfo.Mobile',
                        'ContactInfo.Fax',
                        'ContactInfo.Mail',
                        'ContactInfo.URL'
                    ])).then(function (values) {
                        $self.dds = values;
                        for(var i=0;i<values.length;i++){
                            var dds = values[i];
                            if(dds.keyword==='ContactInfo.Telephone') {
                                $self.telephones.push({
                                    type: dds.options[0].code,
                                    value: null 
                                });
                            } else if(dds.keyword==='ContactInfo.Mobile') {  
                                $self.mobiles.push({
                                    type: dds.options[0].code,
                                    value: null
                                });                              
                            } else if(dds.keyword==='ContactInfo.Fax') {  
                                $self.faxes.push({
                                    type: dds.options[0].code,
                                    value: null
                                });                              
                            } else if(dds.keyword==='ContactInfo.Mail') { 
                                $self.emails.push({
                                    type: dds.options[0].code,
                                    value: null
                                });                               
                            } else if(dds.keyword==='ContactInfo.URL') { 
                                $self.urls.push({
                                    type: dds.options[0].code,
                                    value: null
                                });                               
                            }
                        }
                        q.resolve(values);
                    }, function(values){
                        q.reject(values);
                    });
                return q.promise;
            };
            Supplier.prototype.toPostData = function(){                
                return ValidatorService.url('aa.com');
            };
            return Supplier;
        };
    }]);
    var injector = angular.injector(['myApp.models']);
    var service = injector.get('Supplier');
    return service.$get();
});