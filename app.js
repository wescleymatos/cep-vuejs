new Vue({
    el: '#app',
    data: {
        cep: '',
        endereco: {}
    },
    methods: {
        getAddress: function () {
            if (/^[0-9]{5}-[0-9]{3}$/.test(this.cep)) {
                jQuery.get('http://viacep.com.br/ws/' + this.cep + '/json/', function (endereco) {
                    this.endereco = endereco;
                }.bind(this));
            }
        }
    }
});
