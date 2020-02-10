import 'mocha';
import assert from 'assert';
import v, { ResultObject } from '../src/validator';

describe('验证链 validator test', function () {
  v.printout = true;
  let data = {
    "name": "张三",
    "age":30,
    "address": "南山区后海大道110号",
    "hobby":["tour", "sing", "eat"],
    "looks":{
      "size": {
        "foot": 41
      },
      "weight":60
    },
    "notes":[
      {
        "content": "testdsafsdf",
        "log": [{
          "local.time": "2012-12-02"
        },
        {
          "local.time": "2012-12-06"
        }]
      },
      {
        "content": "dddddd",
        "log": [{
          "local.time": "2032-12-02"
        }]
      }
    ],
    "remark": ""
  };

  let struct = {
    name: v.string.chinese.alias('姓名').in(['李四','王五']).min(10),
    age: v.number.integer.alias('年龄'),
    address: v.string.address.alias('地址'),
    hobby: [
      ,
      ,
      v.string.min(3)
    ],
    looks: {
      size: {
        foot: v.number.integer.between(10,20)
      }
    },
    notes: v.array.len(2).struct([
      {
        content: v.string,
        log: v.array.len(3).min(5)
      },
    ]),
    remark: v.string
  };
 
  //it('测试1', function () {      
    //assert(!v.validate(data, v.number));
    //assert(v.validate(data.name, v.string.chinese.in(['张三','李四'])));
    //assert(v.validate(data.age, v.number.int));
    //assert(v.validate(data.hobby, v.array.len(3)));
    //assert(!v.validate('362323197809323113', v.string.idcardvalid));
  //});
  it('结构化规则对象测试', function () {
    assert(!v.validate(data, struct));
  });

  it('异步、同步自定义验证测试', async function() {
    this.timeout(5000);

    async function y(val:number, ...val2:number[]) {
      return await new Promise<boolean>(resolve => {
        setTimeout(() => {
          resolve(val2.length === val)
        }, 200);
      })
    }
    /* const y = (val:number, val2:number) => 
      new Promise<boolean>((resolve,reject) => {
        setTimeout(() => {
          resolve(val < 30 && val > val2);
        }, 500);
    }); */

    const m1 = function(arg:string) { 
      return arg.length === 3
    }; 

    const errHandler = (msgs:ResultObject) => {
      console.log(msgs.keys);
    }

    const result = v.validate(1000, 
      v.number.apply(m1).async(y, 10)
      .msg('0','%a自定义信息，%t测试')
      .msg('1','%a长度%t要%t大于%1！%t，%t，%t')
      .alias('数据','测1',"测2","测3")
      .alias('测4')
      .error(errHandler)) as Promise<boolean>;

    const res = await result;
    console.log(res);
    assert(!res);

  });

});
