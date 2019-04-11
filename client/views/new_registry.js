
Template.newRegistry.onCreated(function () {
  this.subscribe("company");
  this.subscribe("users");
});

Template.newRegistry.onRendered(function () {
  // var instance = this;
  // instance.autorun(function() {
  //   $('.mask-phone').inputmask({mask: "(99) 999999999"});
  //   $('.mask-cpf').inputmask('999.999.999-99', { numericInput: true });
  //   $('.mask-cep').inputmask({ mask: '99999-999' });
  //   $('.mask-date').inputmask({ mask: '99/99/9999' });
  //   console.log(2, $('.mask-phone').inputmask);
  // });

});

Template.newRegistry.helpers({
  prices() {
    var company = Company.findOne(Meteor.user().profile.company);
    return {
      criminal: company.criminal,
      financeira: company.financeira,
      completa: company.completa
    }
  },
  registry() {

  }
});

Template.newRegistry.events({
  'click .cardSearch' (event, template) {
    var type = $(event.currentTarget).data('stype');
    $('#divSearchType').hide();
    $('#divFrmReg .xst input.xreq').attr('required', true);
    console.log(event);
    console.log('typeeee #divFrmReg .xst-' + type);
    $('.xst-alertfn').hide();
    if(type=='completa') {
      $('#divFrmReg .xst').show();
    } else {
      $('#divFrmReg .xst').hide();
      if(type != 'criminal') {
        $('#divFrmReg .xst input.xreq').attr('required', false);
      }
      $('#divFrmReg .xst-' + type).show();
    }
    $('#divFrmReg').show();

    if(type!='financeiro') {
      $('.xst-alertfn').hide();
    } else {
      $('.xst-alertfn').show();
    }
  },
  'mouseenter .cardSearch' (event, template) {
    var $this = $(event.currentTarget);
    var stype = $this.data('stype');
    $(event.target).find("h3").removeClass('grey').addClass('white');
    $(event.target).find("i").removeClass('grey').addClass('white');
    if(stype == 'criminal') {
      $(event.target).addClass('bg-pink');
    }
    if(stype == 'financeira') {
      $(event.target).addClass('bg-cyan');
    }
    if(stype == 'completa') {
      $(event.target).addClass('bg-deep-orange');
    }

  },
  'mouseleave .cardSearch' (event, template) {
    var $this = $(event.currentTarget);
    var stype = $this.data('stype');
    $(event.target).removeClass('bg-grey bg-pink bg-cyan bg-deep-orange');
    $(event.target).find("h3").addClass('grey').removeClass('white');
    $(event.target).find("i").addClass('grey').removeClass('white');
  }
});
