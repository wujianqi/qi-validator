
## 验证工具库

------

本库特色： 

- [x] 集成方法110多项，可覆盖绝大部分数据验证应用场景  
- [x] 链式，简单简洁，可多层级嵌套, 值对象与规则结构的属性一致  
- [x] Typescript，手写类型，string与number类型自动互转，无依赖库  
- [x] 前后端通用，最低支持ES5，低版本环境使用异步需Promise垫片  
- [x] 可拆分使用，仅使用正则及验证方法，文件小  

------

安装：

```npm
npm i qi-validator
```

引用库模块：

```javascript

import v from 'qi-validator';
// ES5方式 const validator = require('qi-validator');
v.validate("dafb", v.string.len(4).min(3)); // true

// 仅使用正则规则集：
import rules from 'qi-validator/es/rules'; 
// ES5方式 const rules = require('qi-validator/lib/rules');
rules.password.test('dd3&G_1a');

// 仅使用方法集（含所有正则规则）：
import methods from 'qi-validator/es/methods'; 
// ES5方式 const methods = require('qi-validator/lib/methods');
methods.password('dd3&G_1a');

```

------

### 方法说明

* .get(data, path)  根据路径获取对象数据值。 
> 例： var obj = {a:1,b:{c:[{d:1, d:2}]}} , v.get(obj, 'b.c.d.1')  // 返回2  
> 例： var obj = {a:{"b.1":1}} , v.get(obj, ['a','b.1'])  // 返回1  

* .validate(data, struct) 验证数据，使用详见“例子及说明”。  

### 属性说明

* .printout  是否输出验证信息。
* .string  字符串验证链式对象。
* .number  数字验证链式对象。
* .object  对象值类型验证链式对象。
* .array  数组值验证链式对象。
* .boolean  布尔值验证链式对象。
* .any  任意类型数据验证链式对象。

### 链式对象说明：

> 内置链式对象属性方法见“数据验证规则类型表”  
> 1位参数的规则项：eq、not、gt、gte、lt、lte、len、min、max、charlen、in、has、regexp，例：v.string.eq('foo')  
> 2位参数的规则项：between，例：v.number.between(10,20)  
> 最少1位以上，可变参数的规则项：minof、maxof、enum、and、an、or 例：v.number.minof(2,19,10,20)  
> 无参数的规则项，均为直接使用属性方式：例：v.string.english.upper  
> 链式对象支持所有规则任意搭配，但不建议无意义组合，例：v.string<del>.number</del>  
> 链式对象仅仅是索引，没有实质验证内容，通过v.validate(...)才会生效  

* .error(handler:function)，绑定未通过验证的回调函数，用法见示例。
* .ok(handler:function)，绑定已通过验证的回调函数，用法见示例。
* .apply(fnc:function, ...args:any[])，使用自定义方法验证。
* .async(fnc:function, ...args:any[])，使用异步方法验证，将组合同步验证结果。
* .struct(struct:object)，当验证数据为对象或数组，按结构进行分拆及组合验证，见“数据深度验证”示例
* .alias(fieldname:string,...names:string[])，设定数据项、对比项目的名称，用于格式化消息。
* .msg(key:string|obj, info:string) 自定义消息模板，用法见“验证结果对象与消息自定义说明”。

### 例子及说明：

##### 基本验证方式

```javascript
// 简单的数据验证
v.validate('admin', v.string.enum('admin','user','guest'));  // 返回 true

// 对象深度验证（不限层级），如要复合验证，可使用struct进行组合
v.validate({
  name:'张三', 
  hobby:[ {item:'唱歌' }, {item: '跳舞'} ],
  place:[ {shows:11 }, { shows:222} ]
}, {
  name: v.string.required.chinese.min(3),
  hobby: [, {c: v.any.required ],
  place: v.array.len(2).struct([ 
      {shows: v.number.required.int}
    ])
}); // 返回 true

// 异步验证（链中如有1项异步，结果均需通过异步才能取得）
const fnc = async (val:number, ...val2:number[]) =>  {
  return await new Promise<boolean>(resolve => {
    setTimeout(() => {
      resolve(val2.length === val)
    }, 500);
  })
}
v.validate(10, v.object.async(fnc, 2)) // 返回 Promise<boolean>
  .then(res => {
    console.log(res); // 返回 true
  })

```

##### 空白与必填项验证

```javascript
// 空白数据与必填验证
v.validate('', v.string);  // 返回 true
v.validate('aaa', v.string);  // 返回 true
v.validate('', v.string.required); // 返回 false

// 联合多项数据验证必填
v.validate('aaa', v.string.and('bbb', 'ccc')); // 返回 true
v.validate('aaa', v.string.an('bbb', 'ccc'));  // 返回 false
v.validate('aaa', v.string.or('', ''));  // 返回 true
let obj = {
  a:'aaa',b:'bbb',c:'ccc'
}
v.validate(obj, { // 不同的属性值组合比较
  a: v.string.and(v.get(obj,'b'))
});

```

##### 验证结果处理（异步、同步，链的所有节点都统一处理）

```javascript
// 验证失败处理，函数参数见下述“验证结果对象”
const errHandler = m => {
  console.log(m.msgs) // 返回错误消息
  if (m.keys.indexof('gt')> -1)  // 通过判断keys包含，来自定义处理方法
    console.log('必须大于14');
}
v.validate(10, v.number.integer.gt(14).alias('年龄').error(errHandler)); 

// 验证成功处理，函数参数见下述“验证结果对象”
const okHandler = m => {
  console.log(m.keys) // 返回 true
}
v.validate(10, v.number.gt(4).ok(okHandler));

```

### 验证结果对象与消息自定义说明：

* .keys  验证失败或成功的相关方法名称，或自定义方法的顺序位置。  
* .path  对象值的路径。可以通过v.get(...) 获得  
* .msgs  验证失败的消息。 

> 注： 模板中$a代表值的域名称，$t代表对比值名称
> 例： v.any.msg({'in', '%a不在%t之内！'})
> 注： 模板中$0代表实参数组0的值，$1...依次类推，非数字文本则被替换成空白
> 例： v.any.msg({'between', '%a不仅要大于%0，也要小于%1！'})  
> 注： 自定义验证方法（包括同步、异步）的消息key用前后顺序位数替代  
> 例： v.any.msg('0','%a格式有误！')


### 数据验证规则类型表

| Key Name  | 说明  | 
| -------------------- | -------------------- |
| **基本数据类型**     |  | 
| object *             | 是否为对象 |
| array *              | 是否为数组 |
| number *             | 是否为数字 |
| string *             | 是否为文本 |
| boolean *            | 是否为布尔 |
| func *               | 是否为函数 |
| datetype *           | 是否为日期类型，字符串判断用下面date规则 |
| enum *               | 是否为枚举, 枚举项为动态参数enum(1,2,3)，如判断数组可使用in([1,2,3])方式 |
| **字符基本格式**|  | 
| required             | 必需有值！如果没required，空值可在链对象中直接通过，设值后才会一一判断。| 
| english              | 纯英文字母 |
| chinese              | 纯中文 |
| alphanum             | 字母和数字组合 |
| upper                | 有大写 |
| lower                | 有小写 |
| nospace              | 不含有空格 |
| nospec               | 不含特殊字符 |
| nodbc                | 不含全角特殊字符 |
| norepeat             | 不含任何重复字符 |
| norepeats *          | 不含重复字符，参数1，指定字符，参数2，重复次数, .norepeats('test', 2) |
| **数字格式**|  | 
| float                | 数字 |
| integer              | 整数 |
| positivefloat        | 正的数字 |
| positiveint          | 正整数 |
| decimal              | 小数点1位及以上 |
| currency             | 货币，2小数，带分号|
| percent              | 百分数 |
| score                | 考试分数 |
| even                 | 偶数 |
| odd                  | 奇数 |
| **时间格式** |  | 
| date                 | 日期 2017-7-7或2017/7/7，0补位非必须，含大小月、闰月检测  |
| time                 | 时间 12:12:12，时分秒个位须0补位 |
| datetime             | 日期 + 时间 如2017-07-07 12:02:02, 0补位非必须 |
| year                 | 年份 1900-2099 |
| month                | 月份 1-12，不带补位，下同 |
| day                  | 日 1-31 |
| hour                 | 小时 0-23 |
| minute               | 分钟 0-59 |
| hmt                  | 时分，格式：10:59 |
| **账号与区域** |  | 
| qq                   | QQ号 5-11位 | 
| age                  | 年龄 0-129岁 | 
| zipcode              | 邮编 | 
| account              | 账号名，字母数字下划线连接线组合，首位字母，同**微信号**规则, 但没限制长度 |
| password             | 密码，最少1大写字母、1小写字母、1数字、1特殊字符，没限制长度 |
| mobile               | 手机13700000000，融合2017新号规则, 即包括16/19等开头的，+86、86可选 |
| telphone             | 电话手机混合 |
| phone                | 固话，可带分机, +86、86可选 |
| idcard               | 身份证，含地区、生日、验证数等规则，不含尾号验证 |
| idcardvalid *        | 身份证，含地区、生日、验证数等规则，含尾号验证 |
| address              | 住址，必须含中文、县/区/旗/乡/镇/街道/州的某项名称 |
| citycode             | 6位地区代码 |
| autocard             | 车牌号码，支持新能源车牌号及港澳等 |
| longitude            | 地理位置——经度，度制，小数点1~15位 |
| latitude             | 地理位置——纬度，度制，小数点1~15位 |
| londms               | 地理位置——经度，度分秒制 |
| latdms               | 地理位置——纬度，度分秒制 |
| **网络类** |  | 
| email                | 邮箱地址 |
| url                  | 网址 |
| ip                   | IPv4地址 |
| ipv6                 | IPV6地址 |
| port                 | 端口 |
| mac                  | MAC地址 |
| domain               | 合法域名 |
| ftp                  | ftp地址 |
| http                 | http地址 |
| ws                   | websocket地址 |
| thunder              | 迅雷协议地址 |
| ed2k                 | 电驴协议地址 |
| magnet               | 磁力链地址 |
| **商业类** |  | 
| bizcode              | 统一信用代码  |
| passport             | 护照代码  |
| ticker               | 股票代码  |
| invoice              | 增值税发票代码 |
| bankcard             | 银行卡号（宽泛型）|
| pbcard               | 银行卡号（仅限国内个人卡）|
| isbn                 | 书号（仅限13位）|
| approval             | 文号 政字〔2004〕第18号 或 政字[2004] 18号 |
| **编码格式**|  | 
| ascii                | ASCII码 |
| base64               | BASE64码 |
| md5                  | md5码 |
| uuid                 | UUID码，连接线-非必须 |
| hex                  | 十六进制字符串 |
| color                | 颜色码，16进制，三位或六位，#非必须 |
| jwt                  | JSON Web Token字符串|
| tag                  | 闭合标签元素|
| **文件**|  | 
| file                 | 合法文件名 |
| path                 | 合法文件名 |
| linuxfile            | 推荐linux文件名 |
| imgurl               | web网页图片地址 |
| doc                  | 合法文档文件名 |
| ext *                | 指定文件扩展名格式，.ext('txt &#124; pdf') |
| **比较**  |  | 
| not *                | 不等于 |
| eq *                 | 等于 |
| gt *                 | 大于 |
| gte *                | 大于或等于 |
| lt *                 | 小于 |
| lte *                | 小于或等于 |
| between *            | 之间，大于并小于 |
| minof *              | 最小 |
| maxof *              | 最大 |
| min  *               | 字符、数组最小长度 |
| max *                | 字符、数组最大长度 |
| len *                | 字符、数组长度等于 |
| charlen *            | 字节最大长度，一般汉字为2字节，英文1字节 |
| in *                 | 是否为字符、数组元素、对象所包含 |
| has *                | 是否包含字符、数组元素、对象属性，与in相反 |
| empty *              | 为空, 包括[]、{}、""、null、undefine、0 等 |
| and *                | 全部都必填 |
| an *                 | 只能1个必填 |
| or *                 | 1个或以上必填 |
| **自定义**  |  | 
| regexp *              | 自定义正则判断 |

标识*号的，为非正则规则。

* Promise垫片库: [es6-promise](https://github.com/stefanpenner/es6-promise) <br>

------
