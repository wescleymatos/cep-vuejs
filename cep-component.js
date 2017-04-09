Vue.component('cep-component', {
    template: '<div><p class="text-danger" style="display: none;" v-show="cepNaoLocalizado">Não foi encontrado um endereço para este CEP.</p><div class="row"><div class="col-md-3"><label>CEP</label><i v-show="spinCep" class="fa fa-spinner fa-pulse fa-fw" style="top: 32px;position: relative;left: 180px;"></i><input type="text" id="cep" class="form-control" v-on:keyup="getAddress()" ref="cep"></div><div class="col-md-2"><label>Número</label><input type="text" id="numero" class="form-control" ref="numero"></div><div class="col-md-4"> <label>Cidade</label><input type="text" id="cidade" class="form-control" v-model="endereco.localidade"></div><div class="col-md-3"><label>UF</label><input type="text" id="uf" class="form-control" v-model="endereco.uf"></div></div><br/><div class="row"><div class="col-md-4"><label>Bairro</label><input type="text" id="bairro" class="form-control" v-model="endereco.bairro"></div><div class="col-md-4"><label>Logradouro</label><input type="text" id="logradouro" class="form-control" v-model="endereco.logradouro"></div><div class="col-md-4"><label>Complemento</label><input type="text" id="complemento" class="form-control"></div></div></div>',
    data: function () {
        return {
            endereco: {},
            cepNaoLocalizado: false,
            spinCep: false
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            jQuery(this.$refs.cep).inputmask('99999-999');
        });
    },
    methods: {
        getAddress: function () {
            let cepNumber = jQuery(this.$refs.cep).val().replace('-', '');
            this.cepNaoLocalizado = false;

            if (!isNaN(cepNumber) && cepNumber.length === 8) {
                this.spinCep = true;

                jQuery.get('http://viacep.com.br/ws/' + cepNumber + '/json/', function (endereco) {
                    this.spinCep = false;

                    if (endereco.erro) {
                        this.cepNaoLocalizado = true;
                        this.endereco = {};
                        return;
                    }

                    jQuery(this.$refs.numero).focus();
                    this.endereco = endereco;
                }.bind(this));
            }
        }
    }
});
