import 'mocha';
import assert from 'assert';
import m from '../src/methods';

describe('单项数据方法测试 validator test', function () {
 it('require no passed test', function () {
    assert(!m.required(''));
  });
  it('require passed test', function () {
    assert(m.required('dafds'));
  });
  it('english no passed test', function () {
    assert(!m.english('测试'));
  });
  it('english passed test', function () {
    assert(m.english('sdafsd'));
  });
  it('qq no passed test', function () {
    assert(!m.qq('11'));
  });
  it('qq passed test', function () {
    assert(m.qq('222222'));
  });
  it('age no passed test', function () {
    assert(!m.age(150));
  });
  it('age passed test', function () {
    assert(m.age(25));
  });
  it('zipcode no passed test', function () {
    assert(!m.zipcode('000000'));
  });
  it('zipcode passed test', function () {
    assert(m.zipcode('518000'));
  });
  it('ip no passed test', function () {
    assert(!m.ip('333.12.12.1'));
  });
  it('ip passed test', function () {
    assert(m.ip('202.128.1.21'));
  });
  it('port no passed test', function () {
    assert(!m.port('88888888'));
  });
  it('port passed test', function () {
    assert(m.port('21'));
  });
  it('bizcode no passed test', function () {
    assert(!m.bizcode('01999999IO9999999'));
  });
  it('bizcode passed test', function () {
    assert(m.bizcode('91430111MA4L16JQ9B'));
  });
  it('invoice no passed test', function () {
    assert(!m.invoice('9999999999'));
  });
  it('invoice passed test', function () {
    assert(m.invoice('1300053140'));
  });
  it('pbcard no passed test', function () {
    assert(!m.pbcard('706668866666666666666'));
  });
  it('pbcard passed test', function () {
    assert(m.pbcard('6228480402564890018'));
  });
  it('currency no passed test', function () {
    assert(!m.currency('1111111111.11111'));
  });
  it('currency passed test', function () {
    assert(m.currency('111,111.00'));
  });
  it('float no passed test', function () {
    assert(!m.float('3sdd'));
  });
  it('float passed test', function () {
    assert(m.float('-12.123'));
  });
  it('int no passed test', function () {
    assert(!m.integer('11.11'));
  });
  it('int passed test', function () {
    assert(m.integer('111'));
  });
  it('decimal no passed test', function () {
    assert(!m.decimal('111'));
  });
  it('decimal passed test', function () {
    assert(m.decimal('111.11'));
  });
  it('chinese no passed test', function () {
    assert(!m.chinese('ddfa'));
  });
  it('chinese passed test', function () {
    assert(m.chinese('中文'));
  });
  it('mail no passed test', function () {
    assert(!m.email('afdsfa.dsaf.com'));
  });
  it('mail passed test', function () {
    assert(m.email('sad.11@164.com'));
  });
  it('url no passed test', function () {
    assert(!m.url('dsafsdds'));
  });
  it('url passed test', function () {
    assert(m.url('http://sdaf.com'));
  });
  it('ws no passed test', function () {
    assert(!m.ws('wss1://sdaf.com'));
  });
  it('ws passed test', function () {
    assert(m.ws('wss://sdaf.com'));
  });
  it('domain no passed test', function () {
    assert(!m.domain('&111.com'));
  });
  it('domain passed test', function () {
    assert(m.domain('www.11.com'));
  });
  it('account no passed test', function () {
    assert(!m.account('0111.abc'));
  });
  it('account passed test', function () {
    assert(m.account('dasfs223'));
  });
  it('password no passed test', function () {
    assert(!m.password('1111'));
  });
  it('password passed test', function () {
    assert(m.password('qdRdf@121'));
  });
  it('safe no passed test', function () {
    assert(!m.nospec('$^&*;\/~\|'));
  });
  it('safe passed test', function () {
    assert(m.nospec('dsafds'));
  });
  it('dbc passed test', function () {
    assert(m.nodbc('fdsa'));
  });
  it('dbc no passed test', function () {
    assert(!m.nodbc('ｄｄｄ'));
  });
  it('no space no passed test', function () {
    assert(!m.nospace('dd12 d'));
  });
  it('no space passed test', function () {
    assert(m.nospace('dd12d'));
  });
  it('no repeat no passed test', function () {
    assert(!m.norepeat('2244dd'));
  });
  it('no repeat passed test', function () {
    assert(m.norepeat('24d'));
  });
  it('hex no passed test', function () {
    assert(!m.hex('asdfkkl'));
  });
  it('hex passed test', function () {
    assert(m.hex('abcedf'));
  });
  it('color no passed test', function () {
    assert(!m.color('21p312'));
  });
  it('color passed test', function () {
    assert(m.color('#f1dd11'));
  });
  it('ascii no passed test', function () {
    assert(!m.ascii('□■'));
  });
  it('ascii passed test', function () {
    assert(m.ascii('3E'));
  });
  it('base64 no passed test', function () {
    assert(!m.base64('mmmddd1112'));
  });
  it('base64 passed test', function () {
    assert(m.base64('YWZkc2Zkc2FmZHNkZHNhJTIwZmFkc2YzMjQ5MzI0b2hkc2Foa2ZoJTYwMTMxMw=='));
  });
  it('md5 no passed test', function () {
    assert(!m.md5('dasfhkl11'));
  });
  it('md5 passed test', function () {
    assert(m.md5('8d41627e46d5b8556d0d3e30ec15538e'));
  });
  it('uuid no passed test', function () {
    assert(!m.uuid('1312fdsaf'));
  });
  it('uuid passed test', function () {
    assert(m.uuid('6c84fb90-12c4-11e1-840d-7b25c5ee775a'));
  });
  it('mobile no passed test', function () {
    assert(!m.mobile('12121212121'));
  });
  it('mobile passed test', function () {
    assert(m.mobile('13700000000'));
  });
  it('telphone no passed test', function () {
    assert(!m.telphone('aaa'));
  });
  it('telphone passed test', function () {
    assert(m.telphone('021-12121111'));
  });
  it('phone no passed test', function () {
    assert(!m.phone('213ds'));
  });
  it('phone passed test', function () {
    assert(m.phone('13700000000'));
  });
  it('percent no passed test', function () {
    assert(!m.percent('112'));
  });
  it('percent passed test', function () {
    assert(m.percent('12.12%'));
  });
  it('year no passed test', function () {
    assert(!m.year('9000'));
  });
  it('year passed test', function () {
    assert(m.year('2012'));
  });
  it('month no passed test', function () {
    assert(!m.month('15'));
  });
  it('month passed test', function () {
    assert(m.month('11'));
  });
  it('day no passed test', function () {
    assert(!m.day('45'));
  });
  it('day passed test', function () {
    assert(m.day('23'));
  });
  it('hour no passed test', function () {
    assert(!m.hour('53'));
  });
  it('hour passed test', function () {
    assert(m.hour('11'));
  });
  it('minute no passed test', function () {
    assert(!m.minute('88'));
  });
  it('minute passed test', function () {
    assert(m.minute('22'));
  });
  it('time no passed test', function () {
    assert(!m.time('23:123:23'));
  });
  it('time passed test', function () {
    assert(m.time('12:12:10'));
  });
  it('date no passed test', function () {
    assert(!m.date('2012-13-23'));
  });
  it('date passed test', function () {
    assert(m.date('2012-12-11'));
  });
  it('datetime no passed test', function () {
    assert(!m.datetime('2012-16-11 12:18:10'));
  });
  it('datetime passed test', function () {
    assert(m.datetime('2012-12-11 12:12:10'));
  });
  it('file no passed test', function () {
    assert(!m.file(' **--.abc'));
  });
  it('file passed test', function () {
    assert(m.file('af.cad'));
  });
  it('imgurl no passed test', function () {
    assert(!m.imgurl('afsd.tt'));
  });
  it('imgurl passed test', function () {
    assert(m.imgurl('http://www.aaa.com/fasdf.png'));
  });
  it('doc no passed test', function () {
    assert(!m.doc('asfs.pp'));
  });
  it('doc passed test', function () {
    assert(m.doc('dsafds.pdf'));
  });
  it('lon 度制 no passed test', function () {
    assert(!m.longitude('144'));
  });
  it('lon 度制 passed test', function () {
    assert(m.longitude('113.5986328125'));
  });
  it('lat no passed test', function () {
    assert(!m.latitude('22'));
  });
  it('lat passed test', function () {
    assert(m.latitude('23.7652368898'));
  });
  it('lon 度分秒制 no passed test', function () {
    assert(!m.londms('113.5986328125'));
  });
  it('lon 度分秒制 test', function () {
    assert(m.londms('113°56′02″'));
  });
  it('approval no passed test', function () {
    assert(!m.approval('abc-1212'));
  });
  it('approval passed test', function () {
    assert(m.approval('粤府字〔2004〕18号'));
  });
  it('approval +第 passed test', function () {
    assert(m.approval('粤府字〔2004〕第18号'));
  });
  it('approval [] passed test', function () {
    assert(m.approval('政字[2004]18号'));
  });
  it('citycode no passed test', function () {
    assert(!m.citycode('9700324'));
  });
  it('citycode passed test', function () {
    assert(m.citycode('440000'));
  });
  it('address no passed test', function () {
    assert(!m.address('随便来点'));
  });
  it('address passed test', function () {
    assert(m.address('布吉镇某某街道'));
  });
  it('upper no passed test', function () {
    assert(!m.upper('dafds'));
  });
  it('upper passed test', function () {
    assert(m.upper('DDDD '));
  });
  it('lower no passed test', function () {
    assert(!m.lower('DDDD'));
  });
  it('lower passed test', function () {
    assert(m.lower('dsaf '));
  });
  it('even no passed test', function () {
    assert(!m.even(3));
  });
  it('even passed test', function () {
    assert(m.even(12));
  });
  it('odd no passed test', function () {
    assert(!m.odd(8));
  });
  it('odd passed test', function () {
    assert(m.odd(33));
  });
  it('ipv6 no passed test', function () {
    assert(!m.ipv6('121:324:23.12'));
  });
  it('ipv6 passed test', function () {
    assert(m.ipv6('1050:0000:0000:0000:0005:0600:300c:326b'));
  });
  it('idcard no passed test', function () {
    assert(!m.idcard('291085198403033410'));
  });
  it('idcard passed test', function () {
    assert(m.idcard('231085198403033418'));
  });
  it('autocard no passed test', function () {
    assert(!m.autocard('粤Bi232i'));
  });
  it('autocard passed test', function () {
    assert(m.autocard('粤BD00012'));
  });
  it('not passed test', function () {
    assert(!m.not(12, '12'));
  });
  it('not passed test', function () {
    assert(m.not('abc','aaa'));
  });
  it('eq no passed test', function () {
    assert(!m.eq(12, 13));
  });
  it('eq passed test', function () {
    assert(m.eq(12, 12));
  });
  it('gt no passed test', function () {
    assert(!m.gt(12, 13));
  });
  it('gt passed test', function () {
    assert(m.gt(14, 10));
  });
  it('gte no passed test', function () {
    assert(!m.gte(12, 13));
  });
  it('gte passed test', function () {
    assert(m.gte(12, 12));
  });
  it('lt no passed test', function () {
    assert(!m.lt(1, 0));
  });
  it('lt passed test', function () {
    assert(m.lt(1, 2));
  });
  it('lte no passed test', function () {
    assert(!m.lte(1, 0));
  });
  it('lte passed test', function () {
    assert(m.lte(1,1));
  });
  it('between no passed test', function () {
    assert(!m.between(5, 2, 5));
  });
  it('between passed test', function () {
    assert(m.between(3, 2, 4));
    assert(m.between(new Date('2012/02/12'),new Date('2010/02/12'), new Date('2019/02/12')));
  });
  it('min no passed test', function () {
    assert(!m.minof(2, 1, 2, 3));
  });
  it('min passed test', function () {
    assert(m.minof(1, 1, 2, 3));
  });
  it('max no passed test', function () {
    assert(!m.maxof(3, 1, 2));
  });
  it('max passed test', function () {
    assert(m.maxof(3, 1, 2, 3));
  });
  it('length no passed test', function () {
    assert(!m.len('test', 3));
  });
  it('length passed test', function () {
    assert(m.len('test', 4));
  });
  it('minlength no passed test', function () {
    assert(!m.min('test', 6));
  });
  it('minlength passed test', function () {
    assert(m.min('test',4));
    assert(m.min('test',3));
  });
  it('maxlength no passed test', function () {
    assert(!m.max('test',3));
  });
  it('maxlength passed test', function () {
    assert(m.max('test',6));
    assert(m.max('test',4));
  });
  it('charlen no passed test', function () {
    assert(!m.charlen('汉字12', 4));
  });
  it('charlen passed test', function () {
    assert(m.charlen('汉字12', 8));
  });
  it('in no passed test', function () {
    assert(!m.in('abcd','abc'));
  });
  it('in passed test', function () {
    assert(m.in('ab', 'abc'));
    assert(m.in(1, [1,2,3]));
    assert(m.in('abc', {'abc': 1}));
  });
  it('has test', function () {
    assert(m.has('abcd','abc'));
    assert(m.has([1,2,3], 1));    
    assert(m.has({'abc': 1},'abc'));
  });
  it('tag test', function () {
    assert(m.tag('<dda>dd</dda>'));
  }); 
  it('and test', function () {
    assert(m.and('111', 'abc', '33'));
    assert(!m.and('111', ''));
  });
  it('an test', function () {    
    assert(!m.an('111', '222', ''));
    assert(m.an('111', '', ''));
  });
  it('or test', function () {    
    assert(!m.or('', '', ''));
    assert(m.or('111', '', ''));
  });
  /* it('custom test', function () {
    m.custom('testv', (t1:string, t2:string) => {
      return t1.indexOf(t2) > -1
    });
    assert(m.check('aaabbbccc').custom('testv','aaa'));
    assert(!m.check('aaab').custom('testv'));

    assert(m.check([1,2,3,4]).custom((str:number[]) => str.length === 4));

  }); */
  it('base test', function () {
    assert(m.object({}));
    assert(!m.object('aaab'));
    assert(m.number(12222));

  });
});
