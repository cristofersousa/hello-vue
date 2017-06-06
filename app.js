"use strict";

var instance = new Vue({
       el   : "#app",
      
       data : {
           id : 0,
            name: "",
            email: "",

            address: {
                cep: "", 
                rua: "",
                nro: "",
                bairro: "",
                city: "",
                state: ""
            },
        users: []
       },

       watch: {
            "address.cep" : function (valAtual, valAnterior) {
                var pattern = valAtual.split("");
                if(pattern.length == 6 ){
                    pattern.splice(5,0,"-");
                    this.address.cep = pattern.join('');                  
                }
                if(valAtual.length == 9) {
                    this.localizarCep(valAtual);                    
                }               
            }
       },          

       computed: {
        
           isInvalid : function(){
               if(this.name == "") {
                   return true;
               }
               return false
           }
       },

       methods : {
           localizarCep : function(cep){
               fetch('http://api.postmon.com.br/v1/cep/'+ cep)
               .then (function(res){
                    return res.json();
               })
               .then(this.atualizarEndereco)
               .catch (function(error){
                 //  instance.state.error.msg = error.message;
                Materialize.toast('Cep inválido, ajusta isso jovis!!', 4000);

               });        
           },

         atualizarEndereco : function(endereco){
                instance.address.rua = endereco.logradouro;
                instance.address.bairro = endereco.bairro;
                instance.address.city =  endereco.cidade;
                instance.address.state = endereco.estado;
         },

        criarUsuario : function(data){            
            return { 
                id      : ++data.id,
                name    : data.name,
                email   : data.email,
                address : data.address
            }
        },

        popularTabela : function(){
            this.users.push(this.criarUsuario(this.$data));
            this.limparFormulario();

        },
        limparFormulario : function (){
            this.name   = "";
            this.email  = "";
            this.address.cep    = ""; 
            this.address.rua    = "";
            this.address.nro    = "";
            this.address.bairro = "";
            this.address.city   =  "";
            this.address.state  = "";

        }

       },
    

       
});


