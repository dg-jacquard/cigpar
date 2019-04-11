

Template.formRegistry.onCreated(function() {
  var instance = this;
  this.maskReady = new ReactiveVar(false);
  this.subscribe("registries", function() {
    Registries.update(FlowRouter.current().params.id, {
      $push: { seen: Meteor.user()._id }
    });
  });
  this.subscribe("namas");
  this.subscribe("users");
  this.subscribe("searchs");
});

Template.formRegistry.onRendered(function () {
  $('#frmRegistry input')[0].focus();
});

Template.formRegistry.helpers({
  isFinanceiro() {
    let id = FlowRouter.current().params.id;
    if(!id) return false;
    let r = Registries.findOne(FlowRouter.current().params.id);
    return r.searchType == 'financeira' || r.searchType == 'completa';
  },
  isDetails() {
    return !!FlowRouter.current().params.id;
  },
  userName(_id) {
    if(_id == Meteor.user()._id) {
      return 'Eu'
    }
    let email = !Roles.userIsInRole(Meteor.user()._id, 'normal');
    let user = Meteor.users.findOne(_id);
    return user.profile.name + (email? ' - ' + user.emails[0].address: '');
  },
  userCompany(_id) {
    let user = Meteor.users.findOne(_id);
    return user.profile.company || '';
  },
  consoleLog(obj) {
    console.log('helper console', obj);
  },
  isArray(obj) {
    return Array.isArray(obj);
  },
  searchResult() {
    let id = FlowRouter.current().params.id;
    // if(!id) return [];
    // let r = Registries.findOne(FlowRouter.current().params.id);

    // console.log('XXXXX 11 -> cpf', FlowRouter.current().params.id, r.cpf, cpf, column);
    // cpf = r.cpf.replace(/[^0-9]/g, '');
    console.log('search ', { registry: FlowRouter.current().params.id });
    let s = Searchs.find({ registry: FlowRouter.current().params.id });
    console.log('searchs', s);
    // let a = [];
    // s.returns.forEach(function(b) {
    //   console.log('xx b.returns', b);
    //   var c = [];
    //   if(b.mensagem_erro && Array.isArray(b.mensagem_erro.erro)) {
    //     // for(var x in b.mensagem_erro.erro) {
    //     //   c.push(b.mensagem_erro.erro[x])
    //     // }
    //   } else {
    //     b.mensagem_erro = { error: [] };
    //     // b.mensagem_erro.erro = [];
    //   }
    //   a.push(b);
    // });
    // console.log('----aaa', a);
    var returns = [];

    s.forEach(function(ss) {
      console.log('ss returns', ss);
      ss.returns.forEach(function(i) {
        console.log('i returns', i);
        returns.push(i);
      });
    });
    console.log('______returns', returns);
    return returns;
    if(s) {
      return s[column];
    }
    return '';
  },
  registry() {
    let id = FlowRouter.current().params.id;
    if(!id) return {};
    let r = Registries.findOne(FlowRouter.current().params.id);
    return r;
  },
  messageClass(message) {
    if(message.from == Meteor.user()._id) {
      return 'message-me';
    } else {
      return 'message-other';
    }
  }
});

Template.formRegistry.events({
  'focus input' (event, template) {
    console.log('focus');
    let i = $('#frmRegistry input')[0];
    if(!document.body.getAttribute('maskok')) {
      console.log('set mask');
      document.body.setAttribute('maskok', true);
      jQuery.getScript('http://app.leadsmarket.com.br:5000/assets/js/jquery.inputmask.bundle.min.js', function() {
        $('.mask-phone').inputmask({mask: "(99) 999999999"});
        $('.mask-cpf').inputmask({mask: '999.999.999-99' });
        $('.mask-cep').inputmask({ mask: '99999-999' });
        $('.mask-date').inputmask({ mask: '99/99/9999' });
      })
    }
  },
  'submit #frmMessage' (event, template) {
    event.preventDefault();
    const form = event.target;

    Registries.update(FlowRouter.current().params.id, {
      $set: { seen: [] },
      $push: {
        messages: {
          content: form.message.value,
          date: new Date(),
          from: Meteor.user()._id
        }
      }
    });
    form.reset();
  },
  'submit #frmRegistry' (event, template) {

    event.preventDefault();
    const form = event.target;

    let CPFValid = isCPF(form.cpf.value);

    if(!CPFValid) {
      alert('CPF Inválido');
      document.getElementById('txtCPF').focus();
      window.scroll(0,0);
      return false;
    }

    $('#btnSaveOk').show();

    setTimeout( () => { $('#btnSaveOk').hide(); }, 8000 );

    let page = FlowRouter.current().route.name;

    var data = {
      nome_completo: form.name.value,
      data_nascimento: form.birthday.value,
      cpf: form.cpf.value,
      numero_rg: form.rg.value,
      estado_rg: form.rgUf.value,
      nome_pai_completo: form.nameOfFather.value,
      nome_mae_completo: form.nameOfMother.value,
      cep: form.cep.value,
      logradouro: form.street.value,
      codigo_logradouro: form.number.value || 0,
      bairro: form.neighborhood.value,
      estado: form.uf.value,
      cidade: form.city.value
    };



    if(page == 'details') {

      Registries.update(FlowRouter.current().params.id, {
        $set: {
          name: form.name.value,
          birthday: form.birthday.value,
          cpf: form.cpf.value,
          rg: form.rg.value,
          rgUf: form.rgUf.value,
          nameOfFather: form.nameOfFather.value,
          nameOfMother: form.nameOfMother.value,
          cep: form.cep.value,
          street: form.street.value,
          number: form.number.value || 0,
          neighborhood: form.neighborhood.value,
          uf: form.uf.value,
          city: form.city.value,
          status: form.status.value,
          statusFinanceiro: form.statusFinanceiro.value,
          updatedAt: new Date(),
          seen: []
        }
      });

      let s_id = Searchs.insert({
        registry: FlowRouter.current().params.id,
        cpf: form.cpf.value.replace(/[^0-9]/g, ''),
        createdAt: new Date(),
        createdBy: Meteor.user()._id,
        updatedby: new Date(),
        status: 'pending',
        statusFinanceiro: 'Em análise.',
        soapStatus: 'pending'
      });

      data._id = s_id;
      data.registry = FlowRouter.current().params.id;

      console.log('try regsoli', data);

      Meteor.call('registrarSolicitacao', data, function(error, result) {
        if(result) {
         console.log('registrarSolicitacao ok', result)
        }
        if(error) {
         console.log('registrarSolicitacao error', error, result)
        }
      });

      return;

    } else {

      let u = Meteor.user();
      let nRegitry = {};
      // let g = Namas.findOne({ key: 'main' });

      var vtype = $('#searchType').val();

      let g = u.profile && u.profile[vtype]? u.profile[vtype]: 1;

      let credits = Math.floor(u.profile['credits'] || 0);

      nRegitry.name = form.name.value;
      nRegitry.birthday = form.birthday.value;
      nRegitry.rg = form.rg.value;
      nRegitry.cpf = form.cpf.value;
      nRegitry.rgUf = form.rgUf.value;

      nRegitry.nameOfFather = form.nameOfFather.value;
      nRegitry.nameOfMother = form.nameOfMother.value;

      nRegitry.cep = form.cep.value;
      nRegitry.street = form.street.value;
      nRegitry.number = form.number.value || 0;
      nRegitry.neighborhood = form.neighborhood.value;
      nRegitry.uf = form.uf.value;
      nRegitry.city = form.city.value;

      nRegitry.status = 'Pendente';
      nRegitry.statusFinanceiro = '';
      nRegitry.searchType = $('#searchType').val();
      nRegitry.createdBy = u._id;
      nRegitry.createdAt = new Date();
      nRegitry.updatedAt = new Date();

      if(credits) {
        let registry = Registries.insert(nRegitry);
        console.log(registry, nRegitry);
        let s_id = Searchs.insert({
          registry: registry,
          cpf: nRegitry.cpf.replace(/[^0-9]/g, ''),
          createdAt: new Date(),
          createdBy: Meteor.user()._id,
          updatedby: new Date(),
          status: 'pending',
          statusFinanceiro: 'Em análise.'
        });
        data.registry = registry;
        data._id = s_id;
        console.log('before call registrarSolicitacao', data);
        Meteor.call('registrarSolicitacao', data, function(error, result){
          if(result) {
           console.log('registrarSolicitacao ok', result)
          }
          if(error) {
           console.log('registrarSolicitacao error', error, result)
          }
        });

        window.location.href = '/';
        if(!g) g = 1;

        // var cp = Company.findOne({_id; Meteor.user().profile.company});

        console.log('update credits', credits, g);
        Meteor.call('update', { _id: u._id, credits: credits - (g )}, function(error, result){
          if(result) {
           console.log('ok', result)
          }
          if(error) {
           console.log('error', error, result)
          }
        });
      } else {
        window.location.href = '/?nocredits';
      }



    }

  },
  'keypress .mask-cep, blur .mask-cep' (event) {
    if(/[0-9]{5}\-[0-9]{3}/.test(event.target.value)) {
      $.get(`https://viacep.com.br/ws/${event.target.value}/json/`, function(cep) {
        console.log('cep', cep)
        var form = document.getElementById('frmRegistry');
        form.street.value = cep.logradouro;
        form.neighborhood.value = cep.bairro;
        form.uf.value = cep.uf;
        form.city.value = cep.localidade;
      });
    }
  },
  'submit #frmNewRegistry' (event) {
    event.preventDefault();
    const target = event.target;

  },
});

 function isCPF(c){
    if((c = c.replace(/[^\d]/g,"").split("")).length != 11) return false;
    if(new RegExp("^" + c[0] + "{11}$").test(c.join(""))) return false;
    for(var s = 10, n = 0, i = 0; s >= 2; n += c[i++] * s--);
    if(c[9] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
    for(var s = 11, n = 0, i = 0; s >= 2; n += c[i++] * s--);
    if(c[10] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
    return true;
};
