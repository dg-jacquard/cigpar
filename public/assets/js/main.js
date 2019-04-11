$(function() {
  $('.mask-phone').inputmask({mask: "(99) 999999999"});
  $('.mask-cpf').inputmask('999.999.999-99', { numericInput: true });
  $('.mask-cep').inputmask({ mask: '99999-999' });
  $('.mask-date').inputmask({ mask: '99/99/9999' });
  console.log($('.mask-phone').inputmask);
});
