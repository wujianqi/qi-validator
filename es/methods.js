var d=function(d,t){return void 0===t&&(t=1),new RegExp("^(?!.*("+d+").*\\1{"+t+",}).+$","i")},t=function(d){return new RegExp("^[^<>/\\\\\\|:''\\*\\?]+\\.("+d+")+$","i")},u=function(d,t){void 0===t&&(t="");var u="^("+d+"):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?";return""!==t&&(u=u+".("+t+")+"),u+="$",new RegExp(u,"i")},n={required:/.+/,english:/^[A-Za-z]+$/,alphanum:/^[a-zA-Z0-9]+$/,chinese:/^[\u2E80-\uFE4F]+$/,upper:/[A-Z]/,lower:/[a-z]/,hasLetter:/[A-Za-z]/,hasDigit:/\d/,hasSpec:/[!@#$%^&*?\(\)]/,nospace:/^\S+$/,nodbc:/^[^\uFF01-\uFF60\uFF0A-\uFF5F\u3000-\u3003]+$/,norepeat:d("."),nospec:/^[^><,\[\]\{\}\?\/\+=\|\'\\\':;\~\!\@\#\*\$\%\^\&\(\)`]+$/,qq:/^[1-9]\d{4,10}$/,age:/^(0|[1-9]\d?|1[0-2]\d)$/,zipcode:/^(\d[1-7]|[1-9][0-7])\d{4}$/,ip:/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,ipv6:/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,port:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,domain:/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/i,bizcode:/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,invoice:/^(((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{5}[1-9][1-7][0-4])$/,bankcard:/^[1-9]\d{9,29}$/,pbcard:/^(10|30|35|37|4\d||5[0-6]|58|60|62|6[8-9]|84|8[7-8]|9[0-2]|9[4-6]|9[8-9])\d{14,17}$/,ticker:/^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/,passport:/(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,score:/^150$|^(\d|[1-9]\d|1[0-4]\d)(.5)?$/,currency:/(^-?[1-9]\d{0,2}($|(\,\d{3})*($|(\.\d{1,2}$))))|((^0(\.\d{1,2})?)|(^-0\.\d{1,2}))$/,float:/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,positivefloat:/^(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,integer:/^-?\d+$/,positiveint:/^\d+$/,decimal:/^-?\d+\.\d+$/,percent:/^-?\d+(\.\d+)?%$/,even:/^[02468]|[1-9]\d*[02468]$/,odd:/^[13579]|[1-9]\d*[13579]$/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,url:u("https?|ftp|wss?"),ftp:u("ftp"),http:u("https?"),ws:u("wss?"),account:/^[A-Za-z]+[\w\-_]*[A-Za-z0-9]+$/,password:/^(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/,hex:/^[0-9A-F]+$/i,color:/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,ascii:/^[\u0000-\u007F]+$/,base64:/^([A-Z0-9+\/]{4})*([A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,md5:/^(([0-9A-F]{16})|([0-9A-F]{32}))$/i,uuid:/^[0-9A-F]{8}(-?)[0-9A-F]{4}\1[0-9A-F]{4}\1[0-9A-F]{4}\1[0-9A-F]{12}$/i,mobile:/^((\+86)|(86))?(13\d|(14[5-7])|(15([0-3]|[5-9]))|166|17(0|1|8])|18\d|19(8|9))\d{8}$/,telphone:/^[+]{0,1}\d{1,3}[ ]?([-]?(\d|[ ]){1,12})+$/,phone:/^((\+86)|(86))?((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,year:/^(19|20)\d{2}$/,month:/^(0?[1-9]|1[0-2])$/,day:/^(([1-9])|([1-2]\d)|(3[0-1]))$/,hour:/^((1?\d)|(2[0-3]))$/,minute:/^[1-5]?\d$/,hmt:/^(\d|[01]\d|2[0-3]):[0-5]\d$/,time:/^(\d|([01]\d|2[0-3])):([0-5]\d):([0-5]\d)$/,date:/^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))$/,datetime:/^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))\s+(\d|([0-1]\d|2[0-3])):(\d|([0-5]?\d)):(\d|([0-5]?\d))$/,idcard:/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((19|20)\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((19|20)\d{2}(0[13578]|1[02])31)|((19|20)\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,autocard:/^(([\u4EAC\u6D25\u6CAA\u6E1D\u5180\u8C6B\u4E91\u8FBD\u9ED1\u6E58\u7696\u9C81\u65B0\u82CF\u6D59\u8D63\u9102\u6842\u7518\u664B\u8499\u9655\u5409\u95FD\u8D35\u7CA4\u9752\u85CF\u5DDD\u5B81\u743C\u4F7F\u9886][A-Z](([0-9]{5}[A-HJK])|([A-HJK]([A-HJ-NP-Z0-9])[0-9]{4})))|([\u4EAC\u6D25\u6CAA\u6E1D\u5180\u8C6B\u4E91\u8FBD\u9ED1\u6E58\u7696\u9C81\u65B0\u82CF\u6D59\u8D63\u9102\u6842\u7518\u664B\u8499\u9655\u5409\u95FD\u8D35\u7CA4\u9752\u85CF\u5DDD\u5B81\u743C\u4F7F\u9886][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9\u6302\u5B66\u8B66\u6E2F\u6FB3\u4F7F\u9886]))$/,longitude:/^(\-|\+)?(0?\d{1,2}\.\d{1,15}|1[0-7]?\d{1}\.\d{1,15}|180\.0{1,15})$/,latitude:/^(\-|\+)?([0-8]?\d{1}\.\d{1,15}|90\.0{1,15})$/,londms:/^(\-|\+)?(0?\d{1,2}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|1[0-7]?\d{1}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|180\u00B000\u203200\u2033)$/,latdms:/^(\-|\+)?([0-8]?\d{1}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|90\u00B000\u203200\u2033)$/,approval:/^([\u2E80-\uFE4F]+)\u5B57(\u3014|\[)(19|20)\d{2}(\u3015|\])\u7B2C?\d{1,}\u53F7$/,citycode:/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{4}$/,address:/^[\u2E80-\uFE4F]+(\u5E02|\u53BF|\u533A|\u65D7|\u4E61|\u9547|\u8857\u9053|\u5DDE)\S{3,}$/,isbn:/^(978\-\d\-\d{3}\-\d{5}\-[a-z0-9]$)|(978\d{9}[a-z0-9])$/i,tag:/^<([a-z1-6]+)([^<]+)*(>(.*)<\/\1>| *\/>)$/,jwt:/^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/,mac:/^[0-9A-F]{2}(\-|\:)[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}$/i,mask:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,thunder:/^thunder:\/\/[a-zA-Z0-9]+=$/,ed2k:/^ed2k:\/\/|file|.+|\/$/,magnet:/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/,path:/^[a-zA-Z]:\\([^<>/\\\|:''\*\?]+\\?)+$/,file:/^[^<>/\\\|:''\*\?]+\.\w+$/,linuxfile:/^[^+-./\t\b@#$%*()\[\]][^/\t\b@#$%*()\[\]]{1,254}$/,imgurl:u("https?","gif|png|jpg|jpeg|webp|svg"),doc:t("pdf|txt|rtf|wps|doc|docx|xls|xlsx|ppt|pptx")},e=function(d){return"object"==typeof d&&"[object Object]"===Object.prototype.toString.call(d)},r=function(d){return"number"==typeof d?String(d):d},a=function(d){return"string"==typeof d?+d:d};function o(d,t){return"number"!=typeof d&&"string"!=typeof d||"number"!=typeof t&&"string"!=typeof t?Array.isArray(d)?d.indexOf(t)>-1:!(!e(d)||"string"!=typeof t)&&Object.keys(d).indexOf(t)>-1:String(d).indexOf(String(t))>-1}var i={object:e,boolean:function(d){return"boolean"==typeof d},string:function(d){return"string"==typeof d},number:function(d){return"number"==typeof d},array:function(d){return Array.isArray(d)},func:function(d){return"function"==typeof d},datetype:function(d){return d instanceof Date},enum:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return[t].concat(u).indexOf(d)>-1},norepeats:function(t,u,n){return void 0===n&&(n=1),d(u,n).test(t)},ext:function(d,u){return t(u).test(d)},idcardvalid:function(d){for(var t=String(d),u=t.toUpperCase().split(""),e=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],r=n.idcard,a=0,o=0;o<17;o++)a+=parseInt(u[o],10)*e[o];return r.test(t)&&[1,0,"X",9,8,7,6,5,4,3,2][a%11]==u[17]},not:function(d,t){return d!=t},eq:function(d,t){return d==t},gt:function(d,t){return+d>+t},gte:function(d,t){return+d>=+t},lt:function(d,t){return+d<+t},lte:function(d,t){return+d<=+t},between:function(d,t,u){return+d>+t&&+d<+u},len:function(d,t){return r(d).length===a(t)},min:function(d,t){return r(d).length>=a(t)},max:function(d,t){return r(d).length<=a(t)},minof:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return+d===Math.min.apply(Math,[t].concat(u).map((function(d){return+d})))},maxof:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return+d===Math.max.apply(Math,[t].concat(u).map((function(d){return+d})))},charlen:function(d,t){for(var u=r(d),n=a(t),e=u.length,o=0,i=-1,f=0;f<e;f++)o+=(i=u.charCodeAt(f))>=0&&i<=128?1:2;return o<=n},empty:function(d){return!d||(d.length?0===d.length:!!e(d)&&0===Object.keys(d).length)},regexp:function(d,t){return t.test(d)},and:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return[d,t].concat(u).every((function(d){return!!d}))},an:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return 1===[d,t].concat(u).filter((function(d){return!!d})).length},or:function(d,t){for(var u=[],n=2;n<arguments.length;n++)u[n-2]=arguments[n];return[d,t].concat(u).filter((function(d){return!!d})).length>0},has:function(d,t){return o(d,t)},in:function(d,t){return o(t,d)}},f=function(d){Object.prototype.hasOwnProperty.call(n,d)&&(i[d]=function(t){return"number"==typeof t&&(t=String(t)),n[d].test(t)})};for(var c in n)f(c);export default i;
//# sourceMappingURL=methods.js.map
