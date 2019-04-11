
Template.registerHelper( 'isAdmin', () => {
    let u = Meteor.user();
    if(!u || !u._id) return false;
    return Roles.userIsInRole(Meteor.user()._id, 'admin');
});
Template.registerHelper( 'isNormal', () => {
    let u = Meteor.user();
    if(!u || !u._id) return false;
    return Roles.userIsInRole(Meteor.user()._id, 'normal');
});

Template.registerHelper( 'isOperator', () => {
    let u = Meteor.user();
    if(!u || !u._id) return false;
    return Roles.userIsInRole(Meteor.user()._id, 'operator');
});

Template.registerHelper('and',(a,b)=>{
  return a && b;
});
Template.registerHelper('or',(a,b)=>{
  return a || b;
});

Template.registerHelper( 'statusList', () => {
  return [
    'Pendente',
    'Faltando dados',
    'Reprovado',
    'Aprovado'
  ];
});

Template.registerHelper('statusClass', (status) => {
    let r = { class: 'tag' };
    status = status.toLowerCase();
    if(status == 'aprovado') r.class += ' tag-success';
    if(status == 'reprovado') r.class += ' tag-danger';
    if(status == 'pendente') r.class += ' tag-default';
    if(status == 'faltando dados') r.class += ' tag-warning';
    return r;
});

Template.registerHelper('ufs', () => {
  let states = { 'AC':'Acre',
  'AL':'Alagoas',
  'AP':'Amapá',
  'AM':'Amazonas',
  'BA':'Bahia',
  'CE':'Ceará',
  'DF':'Distrito Federal',
  'ES':'Espírito Santo',
  'GO':'Goiás',
  'MA':'Maranhão',
  'MT':'Mato Grosso',
  'MS':'Mato Grosso do Sul',
  'MG':'Minas Gerais',
  'PA':'Pará',
  'PB':'Paraíba',
  'PR':'Paraná',
  'PE':'Pernambuco',
  'PI':'Piauí',
  'RJ':'Rio de Janeiro',
  'RN':'Rio Grande do Norte',
  'RS':'Rio Grande do Sul',
  'RO':'Rondônia',
  'RR':'Roraima',
  'SC':'Santa Catarina',
  'SP':'São Paulo',
  'SE':'Sergipe',
  'TO':'Tocantins'}
  return  Object.keys(states);
});

Template.registerHelper('repeat', function(max) {
  return _.range(max);
});

Template.registerHelper( '_idFix', (str) => {
  let id = str + '';
  let m = id.match(/ObjectID\(\"(.*)\"\)/i);
  if(m) {
    id = m[1];
  }
  return id;
});
