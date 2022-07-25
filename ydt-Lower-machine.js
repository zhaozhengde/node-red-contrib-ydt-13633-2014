// 将字符补足指定长度
// num传入的字符，n需要的字符长度,用于补足长度
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
//按位将字符串拆分成数组
function mySplit(str,leng){
    let arr = [];

    let index = 0;
    while(index<str.length){
        arr.push(str.slice(index,index +=leng));
    }
    return arr;
}
//10进制转16进制
function DectoHex(data) {
    data = parseInt(data);
    data = data.toString(16);
    data = PrefixInteger(data, 4)
    return data;
}
//10进制转16进制,1字节
function DectoHex2(data) {
    data = parseInt(data);
    data = data.toString(16);
    data = PrefixInteger(data, 2)
    return data;
}
//10进制转2进制
function DectoBin(data) {
    data = parseInt(data);
    data = data.toString(2);
    data = PrefixInteger(data, 16)
    return data;
}
//将数字转2进制函数取12位
function dataReverse12(num) {
    let str0 = parseInt(num);//将数据转为10进制整数
    let strbins0 = str0.toString(2);//转为2进制字符
    let strbin0 = PrefixInteger(strbins0, 16)//将字符补足16位
    let strbin1 = strbin0.slice(4,)//截取12位
    return strbin1//Redata0;
}

//将数字取反加1函数16位
function dataReverse16(num) {
    let str0 = parseInt(num);//将数据转为10进制整数
    let strbins0 = str0.toString(2);//转为2进制字符
    let strbin0 = PrefixInteger(strbins0, 16)//将字符补足4位
    let strbinReverse0 = "";//定义取反输出值
    //遍历二进制字符每个字符并取反
    for (var i=0;i<strbin0.length;i++)
    { 
        if(strbin0[i] == '0'){
            strbinReverse0 = strbinReverse0+'1';
        }
        if(strbin0[i] == '1'){
            strbinReverse0 = strbinReverse0+'0';
        }
    }
    //将取反输出二进制字符转16进制字符
    let Redata0 = (parseInt(strbinReverse0,2)+1).toString(16);
    return Redata0;
}

//取模
//例：a模b
function Maths(a,b) {
    var num = a % b;
    return num;
}

//单个ASCII转16进制数 ：A -> 0X41
function numToASCIIString(str) {
      str = str.charCodeAt().toString(16);
      return "0x"+str;
}
//单个16进制转ASCII ：0X41 -> A
function ASCIIStringTonum(str) {
    curCharCode = "0x"+str.toString(16);
    return String.fromCharCode(curCharCode);
}

//转指定为二进制尾数
//参数：dec：10进制字符，pad：转换后二进制位数/23位
function DecToBinTail(dec, pad)
{
    var bin = "";
    var i;
    for (i = 0; i < pad; i++)
    {
        dec *= 2;
        if (dec>= 1)
        {
            dec -= 1;
            bin += "1";
        }
        else
        {
            bin += "0";
        }
    }
    return bin;
}
//转指定位二进制阶码
//参数：dec：10进制字符，pad：转换后二进制位数/8位
function DecToBinHead(dec,pad)
{
    var bin="";
    var i;
    for (i = 0; i < pad; i++)
    {
        bin = (parseInt(dec % 2).toString()) + bin;//%取余
        dec /= 2;
    }
    return bin;
}
//数据字符串补位
//参数： mainStr：数据字符串,lngLen：二进制数据总位数
function Right(mainStr,lngLen) {
if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
    return mainStr.substring(mainStr.length-lngLen,mainStr.length)}//提取指定长度字符串
else{
    return null
    }
}
//浮点数转16进制
//参数：浮点数字符串
function get_float_hex(decString)
{
    //Math.abc方法在节点中无效，需要在节点外处理，主要用于取输入值的绝对值;
    var dec = decString;
    var sign;
    var signString;
    var decValue = parseFloat(dec);

    //确定浮点数符号位
    if (decString.toString().charAt(0) == '-')
    {
        sign = 1;
        signString = "1";
    }
    else
    {
        sign = 0;
        signString = "0";
    }

    if (decValue==0)
    {
        fraction = 0;
        exponent = 0;
    }
    else
    {
        var exponent = 127;
        if (decValue>=2)
        {
            //通过除2，获取整数部分左移位，从而得到阶码
            while (decValue>=2)
            {
                exponent++;
                decValue /= 2;
            }
        }
        else if (decValue<1)
        {
            //小数位递减取尾数
            while (decValue < 1)
            {
                exponent--;
                decValue *= 2;
                if (exponent ==0)
                    break;
            }
        }
        if (exponent!=0) 
        {
            decValue-=1; //减一取小数位
        }
        else{
            decValue /= 2; //继续×2
        } 
 
    }
    //return decValue;
    var fractionString = DecToBinTail(decValue, 23);//23位尾数，转23位二进制
    var exponentString = DecToBinHead(exponent, 8);//8位阶码，转8位二进制
    return Right('00000000'+parseInt(signString + exponentString + fractionString, 2).toString(16),8).toLocaleUpperCase();
}
//长度和校验
//num类型为数字整型
//已做两字节补位设置
function LenghtSum(num) {
    var redata = 0
    numbin0 = dataReverse12(num);
    numbin0Group = mySplit(numbin0,4);
    for (var i = 0; i < numbin0Group.length; i++) {
        redata += parseInt(numbin0Group[i],2);
    }
    redataM = Maths(redata,16);
    redataB0 = DectoBin(redataM);
    redataB1 = redataB0.slice(-4);
    let strbintop = "";//定义取反输出值
    //遍历二进制字符每个字符并取反
    for (var i=0;i<redataB1.length;i++)
    { 
        if(redataB1[i] == '0'){
            strbintop = strbintop+'1';
        }
        if(redataB1[i] == '1'){
            strbintop = strbintop+'0';
        }
    }
    redataB2 = parseInt(strbintop,2)+1;
    redataB3 = DectoBin(redataB2);
    redataB4 = redataB3.slice(-4);
    redataBIN = redataB4+numbin0;
    redataDec = parseInt(redataBIN,2);
    redataHex = PrefixInteger(redataDec.toString(16),4);
    return redataHex.toLocaleUpperCase();
}
//CHKSUM数据和校验
//参数：dataHexstr 16进制表示数据字符串
//已做补位设置
function Chksum(dataHexstr) {
    dataGroup = mySplit(dataHexstr,1);
    dataGroupASCII = [];
    for (var i = 0; i < dataGroup.length; i++) {
        dataGroupASCII.push(numToASCIIString(dataGroup[i]));
    }
    datasum = 0;
    for (var i = 0; i < dataGroupASCII.length; i++) {
        datasum += parseInt(dataGroupASCII[i],16);
    }
    datasumM = Maths(datasum,65536);//取模
    chksumdata = PrefixInteger(dataReverse16(datasumM),4);//取反+1,补位
    return chksumdata.toLocaleUpperCase();
}

//DATAFLAG字段
//参数：0/1
//已做补位设置
function dataflag(globalContext,alarmdata,switchdata) {
    var d0 = globalContext.get(alarmdata);
    var d4 = globalContext.get(switchdata);
    //console.log(d0)
    var redata = "000"+d4.toString(2)+"000"+d0.toString(2)
    var redataDec = parseInt(redata,2);
    return PrefixInteger(redataDec.toString(16),2);
}
//版本号
//参数：版本号字符串
//已做补位设置
function VersionData(data){
    let versiongroup = data.split(".");
    let version0 = parseInt(versiongroup[0]).toString(16);
    let version1 = parseInt(versiongroup[1]).toString(16);
    return PrefixInteger(version0,1).toLocaleUpperCase()+PrefixInteger(version1,1).toLocaleUpperCase();
}
//采集数据帧判断
//参数ver,address为16进制字符，dataframe为nodein数据buff
function DataFrameIn(ver,address,devtype,dataframe) {
    //起始位检查
    let Frametop = (dataframe[0].toString(16)).toLocaleUpperCase();//起始位
    if(Frametop != "7E") { return {"code":"06"}};//起始位错误
    //协议版本检查
    let Framever = ASCIIStringTonum(dataframe[1])+ASCIIStringTonum(dataframe[2]);//协议版本号
    if(Framever != ver) { return {"code":"01"}};//VER版本错误
    //地址检查
    let Frameaddress = ASCIIStringTonum(dataframe[3])+ASCIIStringTonum(dataframe[4]);//地址
    if(Frameaddress != address) { return {"code":"05"}};//设备地址错误
   //CID1检查
    let Framecid1 = ASCIIStringTonum(dataframe[5])+ASCIIStringTonum(dataframe[6]);//CID1
    //CID1列表
    let devtypegroup = ["20","21","22","23","24","25","26","27","28","29","2A","2B","40","41","42","43","44","45","46","47","48","49","4A","4B","60","61","62","63","64","65","67","80","81","82","83","84","85","86","87","88","89","8A","8B","8C","8D","8E","8F","90","91","92"]
    let typenum = devtypegroup.indexOf(Framecid1);//CID1值查找
    if(typenum == -1){  return {"code":"06"}};//CID1错误
    //CID2检查
    let Framecid2 = ASCIIStringTonum(dataframe[7])+ASCIIStringTonum(dataframe[8]);//CID2
    //cid2列表
    let devdatatypegroup = ["41","42","43","44","45","46","47","48","49","4A","4B","4C","4D","4E","4F","50","51","80"]
    let datatypenum = devdatatypegroup.indexOf(Framecid2);//CID2查找
    if(datatypenum == -1){  return {"code":"04"}};//CID2错误
    //LENGTHinfo检查
    let LENGTH_info = ASCIIStringTonum(dataframe[9])+ASCIIStringTonum(dataframe[10])+ASCIIStringTonum(dataframe[11])+ASCIIStringTonum(dataframe[12]);//LENGTH info
    let dataframeLEN = dataframe.length;
    let datagroup = [];//获取数据数组
    for (var i = 13; i < dataframeLEN-5; i++) {
        datagroup.push(dataframe[i]);
    }
    let datagrouplen = datagroup.length;//获取COMMAND INFO长度
    let LENID = datagrouplen;//获取LENID
    let LENGTH_info_check = LenghtSum(LENID);
    if (LENGTH_info_check != LENGTH_info) {
        return {"code":"03"} //LCHKSUM错误
    }
    //CHKsum数据校验
    let dataframeSumGroupStr = ""//获取校验数据字符
    for (var i = 1; i < dataframe.length-5; i++) {
        dataframeSumGroupStr += ASCIIStringTonum(dataframe[i].toString(16));
    }
    let dataChsum = Chksum(dataframeSumGroupStr);//sum校验计算
    let dataChsum_check = ""; //获取数据校验值
    for (var i = dataframeLEN-5; i < dataframeLEN-1; i++) {
        dataChsum_check += ASCIIStringTonum(dataframe[i]);
    }
    if (dataChsum_check != dataChsum) {
        return {"code":"02"} //CHKSUM 错误
    } 
    //校验全部通过返回数据值
    let redatagroup = "";
    for (var i = 0; i < datagroup.length; i++) {
        redatagroup += ASCIIStringTonum(datagroup[i]);
    }
    return {"code":"00","datatype":Framecid2,"data":redatagroup}
}
//返回数据拼接定点数
function ReturnData(globalContext,datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){
                dataHEX = DectoHex(datagroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = DectoHex(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            if(customgroup[i].datatype == "num"){
                dataHEX = DectoHex(customgroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (customgroup[i].datatype == "global") {
                dataHEX = DectoHex(globalContext.get(customgroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){
                dataHEX = DectoHex(datagroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = DectoHex(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//返回数据拼接浮点数
function ReturnDataFolat(globalContext,datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){

                dataHEX = get_float_hex(datagroup[i].datavalue);
                //console.log(dataHEX)
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = get_float_hex(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            if(customgroup[i].datatype == "num"){
                dataHEX = get_float_hex(customgroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (customgroup[i].datatype == "global") {
                dataHEX = get_float_hex(globalContext.get(customgroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){
                dataHEX = get_float_hex(datagroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = get_float_hex(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//返回数据拼接开关量1字节
function ReturnDataIO(globalContext,datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){
                dataHEX = DectoHex2(datagroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = DectoHex2(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            if(customgroup[i].datatype == "num"){
                dataHEX = DectoHex2(customgroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (customgroup[i].datatype == "global") {
                dataHEX = DectoHex2(globalContext.get(customgroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            if(datagroup[i].datatype == "num"){
                dataHEX = DectoHex2(datagroup[i].datavalue);
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
            else if (datagroup[i].datatype == "global") {
                dataHEX = DectoHex2(globalContext.get(datagroup[i].datavalue));
                DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
            }
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//返回历史数据拼接浮点数
function ReturnHisDataFolat(datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = get_float_hex(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            dataHEX = get_float_hex(customgroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = get_float_hex(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//返回历史数据拼接定点数
function ReturnHisData(datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = DectoHex(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            dataHEX = DectoHex(customgroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = DectoHex(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//返回告警/开关量数据拼接1字节
function ReturnHisDataAlarm(datagroup,custom_num,customgroup) {
    let DATAAI_originalGroup = "";
    if (custom_num > 0) {
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = DectoHex2(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        for (var i = 0; i < customgroup.length; i++) {
            dataHEX = DectoHex2(customgroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        return DATAAI_originalGroup
    }else{
        for (var i = 0; i < datagroup.length; i++) {
            dataHEX = DectoHex2(datagroup[i].datavalue);
            DATAAI_originalGroup += dataHEX.toLocaleUpperCase();
        }
        DATAAI_originalGroup += (DectoHex2(custom_num)).toLocaleUpperCase();
        return DATAAI_originalGroup
    }
    
}
//获取时间
function getDate(n) {
  let now = new Date(n),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
    h = now.getHours();
    min = now.getMinutes();
    s = now.getSeconds();
  return [PrefixInteger(y,4),PrefixInteger(m,2),PrefixInteger(d,2),PrefixInteger(h,2),PrefixInteger(min,2),PrefixInteger(s,2)];
}
//时间转为时间戳
function getTimestamp(date) {
    return new Date(date).valueOf();
}

var HistoricalDataFloatingPoint_Data_Send_Num = 0;
var HistoricalDataFixedPoint_Data_Send_Num = 0;
var HistoricalAlarm_Data_Send_Num = 0;

module.exports = function(RED) {
    function YdtLowerMachine(config) {
        RED.nodes.createNode(this,config);
        var globalContext = this.context().global;
        this.lowermachinetype = config.LowerMachineType;//获取下位机类型
        this.deviceaddress = config.DeviceAddress;//获取下位机地址
        this.version = config.Version;//获取下位机协议版本
        this.switch_status = config.switch_status;//获取下位机协议版本
        this.alarm_status = config.alarm_status;//获取下位机协议版本
        this.AnalogQuantityFixedPoint_Data = config.AnalogQuantityFixedPoint_Data//模拟量定点数
        this.AnalogQuantityFixedPoint_custom = config.AnalogQuantityFixedPoint_custom//模拟量自定义定点数
        this.AnalogQuantityFixedPoint_Custom_num = config.AnalogQuantityFixedPoint_Custom_num;//模拟量自定义定点数数量
        this.AnalogFloatingPoint_Data = config.AnalogFloatingPoint_Data;//模拟量浮点数
        this.AnalogFloatingPoint_custom = config.AnalogFloatingPoint_custom;//模拟量自定义浮点数
        this.AnalogFloatingPoint_Custom_num = config.AnalogFloatingPoint_Custom_num;//模拟量自定义浮点数数量
        this.Switching_Data = config.Switching_Data;//开关量
        this.Switching_custom = config.Switching_custom;//开关量自定义
        this.Switching_Custom_num = config.Switching_Custom_num; //开关量自定义数据数量
        this.Alarm_Data = config.Alarm_Data;//告警
        this.Alarm_custom = config.Alarm_custom;//告警自定义
        this.Alarm_Custom_num = config.Alarm_Custom_num; //告警自定义数据数量
        this.ParameterFloatingPoint_Data = config.ParameterFloatingPoint_Data;//获取参数浮点数
        this.ParameterFloatingPoint_custom = config.ParameterFloatingPoint_custom;//获取参数浮点自定义
        this.ParameterFloatingPoint_Custom_num = config.ParameterFloatingPoint_Custom_num; //获取参数浮点自定义数据数量
        this.ParameterFixedPoint_Data = config.ParameterFixedPoint_Data;//获取参数浮点数
        this.ParameterFixedPoint_custom = config.ParameterFixedPoint_custom;//获取参数浮点自定义
        this.ParameterFixedPoint_Custom_num = config.ParameterFixedPoint_Custom_num; //获取参数浮点自定义数据数量 
        this.HistoricalDataFloatingPoint_Data = config.HistoricalDataFloatingPoint_Data//历史数据浮点数
        this.HistoricalDataFloatingPoint_custom = config.HistoricalDataFloatingPoint_custom//历史数据自定义浮点数
        this.HistoricalDataFloatingPoint_Custom_num = config.HistoricalDataFloatingPoint_Custom_num//历史数据自定义浮点数数量
        this.HistoricalDataFixedPoint_Data = config.HistoricalDataFixedPoint_Data//历史数据定点数
        this.HistoricalDataFixedPoint_custom = config.HistoricalDataFixedPoint_custom//历史数据自定义定点数
        this.HistoricalDataFixedPoint_Custom_num = config.HistoricalDataFixedPoint_Custom_num//历史数据自定义定点数数量
        this.HistoricalAlarm_Data = config.HistoricalAlarm_Data//历史告警数据
        this.HistoricalAlarm_custom = config.HistoricalAlarm_custom//历史告警数据自定义
        this.HistoricalAlarm_Custom_num = config.HistoricalAlarm_Custom_num//历史告警数据自定义数量
        this.DatetimeGroup = config.DatetimeGroup//时间
        this.ManufacturerInformation = config.ManufacturerInformation//厂家信息
        this.ManufacturerEdition = config.ManufacturerEdition//厂家软件版本
        this.ManufacturerDevice = config.ManufacturerDevice//厂家采集器名称
        this.User_custom = config.User_custom //自定义数据
        this.User_Custom_num = config.User_Custom_num //自定义数据数量
        var node = this;
        node.on('input', function(msg) {
            let lowermachinetype = (node.lowermachinetype).toLocaleUpperCase();//下位机类型
            let Adress = PrefixInteger(node.deviceaddress,2).toLocaleUpperCase();//地址
            let version = VersionData(node.version) //协议版本
            let SOI = "0x7E";//起始位
            let EOI = "0x0D";//结束位
            let RTN = "00";//RTN响应码
            let DataTypeCode = "";
            let check_data = DataFrameIn(version,Adress,lowermachinetype,msg.payload);
            if (check_data.code == "00") {
                switch(check_data.datatype) {
                    case "41"://获取模拟量量化后数据（浮点数）
                        let DataLen_41;
                        let DataFrame_41 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_41;
                        if (node.AnalogFloatingPoint_Custom_num > 0) {
                            let returnData1len = (node.AnalogFloatingPoint_Data).length;
                            let returnData2len = (node.AnalogFloatingPoint_custom).length;
                            DataLen_41 = (returnData1len*4 + returnData2len*4 + 1 + 1)*2; // 数据2字节,自定义数据2字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.AnalogFloatingPoint_Data).length;
                            DataLen_41 = (returnData1len*4 + 1 + 1)*2; // 数据2字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_41 = LenghtSum(DataLen_41);
                        let DATAFLAG_41 = dataflag(globalContext,node.alarm_status,node.switch_status);
                        DATAAI_originalGroup_41 = ReturnDataFolat(globalContext,node.AnalogFloatingPoint_Data,node.AnalogFloatingPoint_Custom_num,node.AnalogFloatingPoint_custom)
                        let RETURNDATA_41 = DataFrame_41+LENID_41+DATAFLAG_41+DATAAI_originalGroup_41;
                        let CKSUM_41 = Chksum(RETURNDATA_41);
                        let ReturnDataGroupStr_41 = RETURNDATA_41+CKSUM_41;
                        let ReturnDataGroup_41 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_41.length; i++) {
                           ReturnDataGroup_41.push( numToASCIIString(ReturnDataGroupStr_41[i]) );
                        }
                        ReturnDataGroup_41.push(EOI);
                       // node.error("12131424")//输出错误
                       // node.warn("9912131424")//输出告警
                        let typedArray_41 = new Uint8Array(ReturnDataGroup_41);
                        let buffer_41 = Buffer.from(typedArray_41);
                        msg.payload = buffer_41;
                        node.send(msg);
                        break;
                    case "42"://获取模拟量量化后数据（定点数）
                        let DataLen_42;
                        let DataFrame_42 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_42;
                        if (node.AnalogQuantityFixedPoint_Custom_num > 0) {
                            let returnData1len = (node.AnalogQuantityFixedPoint_Data).length;
                            let returnData2len = (node.AnalogQuantityFixedPoint_custom).length;
                            DataLen_42 = (returnData1len*2 + returnData2len*2 + 1 + 1)*2; // 数据2字节,自定义数据2字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.AnalogQuantityFixedPoint_Data).length;
                            DataLen_42 = (returnData1len*2 + 1 + 1)*2; // 数据2字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_42 = LenghtSum(DataLen_42);
                        let DATAFLAG_42 = dataflag(globalContext,node.alarm_status,node.switch_status);
                        DATAAI_originalGroup_42 = ReturnData(globalContext,node.AnalogQuantityFixedPoint_Data,node.AnalogQuantityFixedPoint_Custom_num,node.AnalogQuantityFixedPoint_custom)
                        let RETURNDATA_42 = DataFrame_42+LENID_42+DATAFLAG_42+DATAAI_originalGroup_42;
                        let CKSUM_42 = Chksum(RETURNDATA_42);
                        let ReturnDataGroupStr_42 = RETURNDATA_42+CKSUM_42;
                        let ReturnDataGroup_42 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_42.length; i++) {
                           ReturnDataGroup_42.push( numToASCIIString(ReturnDataGroupStr_42[i]) );
                        }
                        ReturnDataGroup_42.push(EOI);
                        let typedArray_42 = new Uint8Array(ReturnDataGroup_42)
                        let buffer_42 = Buffer.from(typedArray_42)
                        msg.payload = buffer_42;
                        node.send(msg);
                        break;
                    case "43"://获取开关输入状态
                        let DataLen_43;
                        let DataFrame_43 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_43;
                        if (node.Switching_Custom_num > 0) {
                            let returnData1len = (node.Switching_Data).length;
                            let returnData2len = (node.Switching_custom).length;
                            DataLen_43 = (returnData1len*1 + returnData2len*1 + 1 + 1)*2; // 数据2字节,自定义数据1字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.Switching_Data).length;
                            DataLen_43 = (returnData1len*1 + 1 + 1)*2; // 数据1字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_43 = LenghtSum(DataLen_43);
                        let DATAFLAG_43 = dataflag(globalContext,node.alarm_status,node.switch_status);
                        DATAAI_originalGroup_43 = ReturnDataIO(globalContext,node.Switching_Data,node.Switching_Custom_num,node.Switching_custom)
                        let RETURNDATA_43 = DataFrame_43+LENID_43+DATAFLAG_43+DATAAI_originalGroup_43;
                        let CKSUM_43 = Chksum(RETURNDATA_43);
                        let ReturnDataGroupStr_43 = RETURNDATA_43+CKSUM_43;
                        let ReturnDataGroup_43 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_43.length; i++) {
                           ReturnDataGroup_43.push( numToASCIIString(ReturnDataGroupStr_43[i]) );
                        }
                        ReturnDataGroup_43.push(EOI);
                        let typedArray_43 = new Uint8Array(ReturnDataGroup_43)
                        let buffer_43 = Buffer.from(typedArray_43)
                        msg.payload = buffer_43;
                        node.send(msg);
                        break;
                    case "44"://获取告警状态
                        let DataLen_44;
                        let DataFrame_44 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_44;
                        if (node.Alarm_Custom_num > 0) {
                            let returnData1len = (node.Alarm_Data).length;
                            let returnData2len = (node.Alarm_custom).length;
                            DataLen_44 = (returnData1len*1 + returnData2len*1 + 1 + 1)*2; // 数据2字节,自定义数据1字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.Alarm_Data).length;
                            DataLen_44 = (returnData1len*1 + 1 + 1)*2; // 数据1字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_44 = LenghtSum(DataLen_44);
                        let DATAFLAG_44 = dataflag(globalContext,node.alarm_status,node.switch_status);
                        DATAAI_originalGroup_44 = ReturnDataIO(globalContext,node.Alarm_Data,node.Alarm_Custom_num,node.Alarm_custom)
                        let RETURNDATA_44 = DataFrame_44+LENID_44+DATAFLAG_44+DATAAI_originalGroup_44;
                        let CKSUM_44 = Chksum(RETURNDATA_44);
                        let ReturnDataGroupStr_44 = RETURNDATA_44+CKSUM_44;
                        let ReturnDataGroup_44 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_44.length; i++) {
                           ReturnDataGroup_44.push( numToASCIIString(ReturnDataGroupStr_44[i]) );
                        }
                        ReturnDataGroup_44.push(EOI);
                        let typedArray_44 = new Uint8Array(ReturnDataGroup_44)
                        let buffer_44 = Buffer.from(typedArray_44)
                        msg.payload = buffer_44;
                        node.send(msg);
                        break;
                    case "45"://遥控
                        let DataLen_45;
                        let DataFrame_45 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_45;
                        DataLen_45 = 0;
                        let LENID_45 = LenghtSum(DataLen_45);
                        let RETURNDATA_45 = DataFrame_45+LENID_45;
                        let CKSUM_45 = Chksum(RETURNDATA_45);
                        let ReturnDataGroupStr_45 = RETURNDATA_45+CKSUM_45;
                        let ReturnDataGroup_45 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_45.length; i++) {
                           ReturnDataGroup_45.push( numToASCIIString(ReturnDataGroupStr_45[i]) );
                        }
                        ReturnDataGroup_45.push(EOI);
                        let typedArray_45 = new Uint8Array(ReturnDataGroup_45);
                        let buffer_45 = Buffer.from(typedArray_45);
                        let msg45_1 = {
                            payload:buffer_45
                        };
                        let msg45_2 = {
                            payload:ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14])
                        };
                        node.send([msg45_1,msg45_2]);
                        break;
                    case "46"://获取系统参数（浮点数）
                        let DataLen_46;
                        let DataFrame_46 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_46;
                        if (node.ParameterFloatingPoint_Custom_num > 0) {
                            let returnData1len = (node.ParameterFloatingPoint_Data).length;
                            let returnData2len = (node.ParameterFloatingPoint_custom).length;
                            DataLen_46 = (returnData1len*4 + returnData2len*4 + 1 + 1)*2; // 数据2字节,自定义数据1字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.ParameterFloatingPoint_Data).length;
                            DataLen_46 = (returnData1len*4 + 1 + 1)*2; // 数据1字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_46 = LenghtSum(DataLen_46);
                        DATAAI_originalGroup_46 = ReturnDataFolat(globalContext,node.ParameterFloatingPoint_Data,node.ParameterFloatingPoint_Custom_num,node.ParameterFloatingPoint_custom)
                        let RETURNDATA_46 = DataFrame_46+LENID_46+DATAAI_originalGroup_46;
                        let CKSUM_46 = Chksum(RETURNDATA_46);
                        let ReturnDataGroupStr_46 = RETURNDATA_46+CKSUM_46;
                        let ReturnDataGroup_46 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_46.length; i++) {
                           ReturnDataGroup_46.push( numToASCIIString(ReturnDataGroupStr_46[i]) );
                        }
                        ReturnDataGroup_46.push(EOI);
                        let typedArray_46 = new Uint8Array(ReturnDataGroup_46)
                        let buffer_46 = Buffer.from(typedArray_46)
                        msg.payload = buffer_46;
                        node.send(msg);
                        break;
                    case "47"://获取系统参数（定点数）
                        let DataLen_47;
                        let DataFrame_47 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_47;
                        if (node.ParameterFixedPoint_Custom_num > 0) {
                            let returnData1len = (node.ParameterFixedPoint_Data).length;
                            let returnData2len = (node.ParameterFixedPoint_custom).length;
                            DataLen_47 = (returnData1len*2 + returnData2len*2 + 1 + 1)*2; // 数据2字节,自定义数据1字节,自定义数据数量1字节,DATAFLAG1字节
                            
                        }else{
                            let returnData1len = (node.ParameterFixedPoint_Data).length;
                            DataLen_47 = (returnData1len*2 + 1 + 1)*2; // 数据1字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_47 = LenghtSum(DataLen_47);
                        DATAAI_originalGroup_47 = ReturnData(globalContext,node.ParameterFixedPoint_Data,node.ParameterFixedPoint_Custom_num,node.ParameterFixedPoint_custom)
                        let RETURNDATA_47 = DataFrame_47+LENID_47+DATAAI_originalGroup_47;
                        let CKSUM_47 = Chksum(RETURNDATA_47);
                        let ReturnDataGroupStr_47 = RETURNDATA_47+CKSUM_47;
                        let ReturnDataGroup_47 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_47.length; i++) {
                           ReturnDataGroup_47.push( numToASCIIString(ReturnDataGroupStr_47[i]) );
                        }
                        ReturnDataGroup_47.push(EOI);
                        let typedArray_47 = new Uint8Array(ReturnDataGroup_47)
                        let buffer_47 = Buffer.from(typedArray_47)
                        msg.payload = buffer_47;
                        node.send(msg);
                        break;
                    case "48"://设定系统参数（浮点数）
                        let DataLen_48;
                        let DataFrame_48 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_48;
                        DataLen_48 = 0;
                        let LENID_48 = LenghtSum(DataLen_48);
                        let RETURNDATA_48 = DataFrame_48+LENID_48;
                        let CKSUM_48 = Chksum(RETURNDATA_48);
                        let ReturnDataGroupStr_48 = RETURNDATA_48+CKSUM_48;
                        let ReturnDataGroup_48 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_48.length; i++) {
                           ReturnDataGroup_48.push( numToASCIIString(ReturnDataGroupStr_48[i]) );
                        }
                        ReturnDataGroup_48.push(EOI);
                        let typedArray_48 = new Uint8Array(ReturnDataGroup_48);
                        let buffer_48 = Buffer.from(typedArray_48);
                        let msg48_1 = {
                            payload:buffer_48
                        };
                        let msg48_3 = {
                            payload:{
                                COMMAND_GROUP:ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14]),
                                COMMAND_TYPE:ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16]),
                                COMMAND_DATAF:ASCIIStringTonum(msg.payload[17])+ASCIIStringTonum(msg.payload[18])+ASCIIStringTonum(msg.payload[19])+ASCIIStringTonum(msg.payload[20])+ASCIIStringTonum(msg.payload[21])+ASCIIStringTonum(msg.payload[22])+ASCIIStringTonum(msg.payload[23])+ASCIIStringTonum(msg.payload[24])
                            }
                        };
                        node.send([msg48_1, ,msg48_3]);
                        break;
                    case "49"://设定系统参数（定点数）
                        let DataLen_49;
                        let DataFrame_49 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_49;
                        DataLen_49 = 0;
                        let LENID_49 = LenghtSum(DataLen_49);
                        let RETURNDATA_49 = DataFrame_49+LENID_49;
                        let CKSUM_49 = Chksum(RETURNDATA_49);
                        let ReturnDataGroupStr_49 = RETURNDATA_49+CKSUM_49;
                        let ReturnDataGroup_49 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_49.length; i++) {
                           ReturnDataGroup_49.push( numToASCIIString(ReturnDataGroupStr_49[i]) );
                        }
                        ReturnDataGroup_49.push(EOI);
                        let typedArray_49 = new Uint8Array(ReturnDataGroup_49);
                        let buffer_49 = Buffer.from(typedArray_49);
                        let msg49_1 = {
                            payload:buffer_49
                        };
                        let msg49_3 = {
                            payload:{
                                COMMAND_GROUP:ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14]),
                                COMMAND_TYPE:ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16]),
                                COMMAND_DATAF:ASCIIStringTonum(msg.payload[17])+ASCIIStringTonum(msg.payload[18])+ASCIIStringTonum(msg.payload[19])+ASCIIStringTonum(msg.payload[20])
                            }
                        };
                        node.send([msg49_1, ,msg49_3]);
                        break;
                    case "4A"://获取系统历史数据（浮点数）
                        let DataLen_4A;
                        let DataFrame_4A = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4A;
                        let HistoricalDataFloatingPointGetCode = ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14]);
                        let DeviceID_4A = ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16]);
                        HistoricalDataFloatingPoint_Data = globalContext.get(node.HistoricalDataFloatingPoint_Data);//获取历史数据数组
                        HistoricalDataFloatingPoint_custom = globalContext.get(node.HistoricalDataFloatingPoint_custom);//获取历史数据自定义
                        HistoricalDataFloatingPoint_Custom_num = globalContext.get(node.HistoricalDataFloatingPoint_Custom_num);//获取历史数据自定义数量
                        let LENID_4A = '';
                        let DATATYPE_4A = "00";
                        let DATATIME_4A = "06080C2D2D"
                        let DATAFLAG_4A = dataflag(globalContext,node.alarm_status,node.switch_status);
                        let HisDATALEN_4A = HistoricalDataFloatingPoint_Data.length
                        //判断历史数据数组长度
                        if (HisDATALEN_4A == 0) { //长度为0，无数据
                            break;
                        }
                        else{ //存在历史数据
                            //上位要求发送第一条数据
                            if(HistoricalDataFloatingPointGetCode == '00'){ //发送第一条数据
                                HistoricalDataFloatingPoint_Data_Send_Num = 0; //防止上位机多次发送获取第一条数据，此时先将计数置0
                                //计算LENID
                               if (HistoricalDataFloatingPoint_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    DataLen_4A = (returnData1len*4 + returnData2len*4 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    DataLen_4A = (returnData1len*4 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,[]);
                                }
                                LENID_4A = LenghtSum(DataLen_4A);
                                //判断发送数据是不是最后一条数据
                                if (HisDATALEN_4A == HistoricalDataFloatingPoint_Data_Send_Num+1) {
                                    DATATYPE_4A = '01';
                                    let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                    let CKSUM_4A = Chksum(RETURNDATA_4A);
                                    let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                    let ReturnDataGroup_4A = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                       ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                    }
                                    ReturnDataGroup_4A.push(EOI);
                                    let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                    let buffer_4A = Buffer.from(typedArray_4A);
                                    let msg4A = {
                                        payload:buffer_4A
                                    };
                                    node.send(msg4A);
                                    HistoricalDataFloatingPoint_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4A = '00';
                                    let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                    let CKSUM_4A = Chksum(RETURNDATA_4A);
                                    let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                    let ReturnDataGroup_4A = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                       ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                    }
                                    ReturnDataGroup_4A.push(EOI);
                                    let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                    let buffer_4A = Buffer.from(typedArray_4A);
                                    let msg4A = {
                                        payload:buffer_4A
                                    };
                                    node.send(msg4A);
                                    HistoricalDataFloatingPoint_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalDataFloatingPointGetCode == '01'){//上位机接收正确，发送下一条
                                if (HistoricalDataFloatingPoint_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    DataLen_4A = (returnData1len*4 + returnData2len*4 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                    DataLen_4A = (returnData1len*4 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,[]);
                                }
                                LENID_4A = LenghtSum(DataLen_4A);
                                if (HisDATALEN_4A == HistoricalDataFloatingPoint_Data_Send_Num+1) {
                                    DATATYPE_4A = '01';
                                    let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                    let CKSUM_4A = Chksum(RETURNDATA_4A);
                                    let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                    let ReturnDataGroup_4A = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                       ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                    }
                                    ReturnDataGroup_4A.push(EOI);
                                    let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                    let buffer_4A = Buffer.from(typedArray_4A);
                                    let msg4A = {
                                        payload:buffer_4A
                                    };
                                    node.send(msg4A);
                                    HistoricalDataFloatingPoint_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4A = '00';
                                    let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                    let CKSUM_4A = Chksum(RETURNDATA_4A);
                                    let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                    let ReturnDataGroup_4A = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                       ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                    }
                                    ReturnDataGroup_4A.push(EOI);
                                    let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                    let buffer_4A = Buffer.from(typedArray_4A);
                                    let msg4A = {
                                        payload:buffer_4A
                                    };
                                    node.send(msg4A);
                                    HistoricalDataFloatingPoint_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalDataFloatingPointGetCode == '02'){ //上位机接收失败，重新发送
                                let ResendNum = HistoricalDataFloatingPoint_Data_Send_Num;
                                if (ResendNum == 0) {
                                    if (HistoricalDataFloatingPoint_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                        let returnData2len = (HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                        DataLen_4A = (returnData1len*4 + returnData2len*4 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num]).length;
                                        DataLen_4A = (returnData1len*4 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,[]);
                                    }
                                    LENID_4A = LenghtSum(DataLen_4A);
                                    if (HisDATALEN_4A == HistoricalDataFloatingPoint_Data_Send_Num+1) {
                                        DATATYPE_4A = '01';
                                        let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                        let CKSUM_4A = Chksum(RETURNDATA_4A);
                                        let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                        let ReturnDataGroup_4A = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                           ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                        }
                                        ReturnDataGroup_4A.push(EOI);
                                        let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                        let buffer_4A = Buffer.from(typedArray_4A);
                                        let msg4A = {
                                            payload:buffer_4A
                                        };
                                        node.send(msg4A);
                                        HistoricalDataFloatingPoint_Data_Send_Num = 0;
                                        break;
                                    }else{
                                        DATATYPE_4A = '00';
                                        let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                        let CKSUM_4A = Chksum(RETURNDATA_4A);
                                        let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                        let ReturnDataGroup_4A = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                           ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                        }
                                        ReturnDataGroup_4A.push(EOI);
                                        let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                        let buffer_4A = Buffer.from(typedArray_4A);
                                        let msg4A = {
                                            payload:buffer_4A
                                        };
                                        node.send(msg4A);
                                        HistoricalDataFloatingPoint_Data_Send_Num += 1;
                                        break;
                                    }
                                }else{
                                    if (HistoricalDataFloatingPoint_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num-1]).length;
                                        let returnData2len = (HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num-1]).length;
                                        DataLen_4A = (returnData1len*4 + returnData2len*4 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num-1],HistoricalDataFloatingPoint_Custom_num,HistoricalDataFloatingPoint_custom[HistoricalDataFloatingPoint_Data_Send_Num-1]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num-1]).length;
                                        DataLen_4A = (returnData1len*4 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4A = ReturnHisDataFolat(HistoricalDataFloatingPoint_Data[HistoricalDataFloatingPoint_Data_Send_Num],HistoricalDataFloatingPoint_Custom_num,[]);
                                    }
                                    LENID_4A = LenghtSum(DataLen_4A);
                                    if (HistoricalDataFloatingPoint_Data_Send_Num == HisDATALEN_4A) {
                                        DATATYPE_4A = '01';
                                        let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                        let CKSUM_4A = Chksum(RETURNDATA_4A);
                                        let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                        let ReturnDataGroup_4A = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                           ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                        }
                                        ReturnDataGroup_4A.push(EOI);
                                        let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                        let buffer_4A = Buffer.from(typedArray_4A);
                                        let msg4A = {
                                            payload:buffer_4A
                                        };
                                        node.send(msg4A);
                                        break;
                                    }else{
                                        DATATYPE_4A = '00';
                                        let RETURNDATA_4A = DataFrame_4A+LENID_4A+DATATYPE_4A+DATAFLAG_4A+DATATIME_4A+DATAAI_originalGroup_4A
                                        let CKSUM_4A = Chksum(RETURNDATA_4A);
                                        let ReturnDataGroupStr_4A = RETURNDATA_4A+CKSUM_4A;
                                        let ReturnDataGroup_4A = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4A.length; i++) {
                                           ReturnDataGroup_4A.push( numToASCIIString(ReturnDataGroupStr_4A[i]) );
                                        }
                                        ReturnDataGroup_4A.push(EOI);
                                        let typedArray_4A = new Uint8Array(ReturnDataGroup_4A);
                                        let buffer_4A = Buffer.from(typedArray_4A);
                                        let msg4A = {
                                            payload:buffer_4A
                                        };
                                        node.send(msg4A);
                                        break;
                                    }
                                }
                            }
                        }
                    case "4B"://获取系统历史数据（定点数）
                        let DataLen_4B;
                        let DataFrame_4B = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4B;
                        let HistoricalDataFixedPointGetCode = ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14]);
                        let DeviceID_4B = ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16]);
                        HistoricalDataFixedPoint_Data = globalContext.get(node.HistoricalDataFixedPoint_Data);//获取历史数据数组
                        HistoricalDataFixedPoint_custom = globalContext.get(node.HistoricalDataFixedPoint_custom);//获取历史数据自定义
                        HistoricalDataFixedPoint_Custom_num = globalContext.get(node.HistoricalDataFixedPoint_Custom_num);//获取历史数据自定义数量
                        let LENID_4B = '';
                        let DATATYPE_4B = "00";
                        let DATATIME_4B = "06080C2D2D"
                        let DATAFLAG_4B = dataflag(globalContext,node.alarm_status,node.switch_status);
                        let HisDATALEN_4B = HistoricalDataFixedPoint_Data.length
                        //判断历史数据数组长度
                        if (HisDATALEN_4B == 0) { //长度为0，无数据
                            break;
                        }
                        else{ //存在历史数据
                            //上位要求发送第一条数据
                            if(HistoricalDataFixedPointGetCode == '00'){ //发送第一条数据
                                HistoricalDataFixedPoint_Data_Send_Num = 0; //防止上位机多次发送获取第一条数据，此时先将计数置0
                                //计算LENID
                               if (HistoricalDataFixedPoint_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    DataLen_4B = (returnData1len*2 + returnData2len*2 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    DataLen_4B = (returnData1len*2 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,[]);
                                }
                                LENID_4B = LenghtSum(DataLen_4B);
                                //判断发送数据是不是最后一条数据
                                if (HisDATALEN_4B == HistoricalDataFixedPoint_Data_Send_Num+1) {
                                    DATATYPE_4B = '01';
                                    let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                    let CKSUM_4B = Chksum(RETURNDATA_4B);
                                    let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                    let ReturnDataGroup_4B = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                       ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                    }
                                    ReturnDataGroup_4B.push(EOI);
                                    let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                    let buffer_4B = Buffer.from(typedArray_4B);
                                    let msg4B = {
                                        payload:buffer_4B
                                    };
                                    node.send(msg4B);
                                    HistoricalDataFixedPoint_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4B = '00';
                                    let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                    let CKSUM_4B = Chksum(RETURNDATA_4B);
                                    let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                    let ReturnDataGroup_4B = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                       ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                    }
                                    ReturnDataGroup_4B.push(EOI);
                                    let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                    let buffer_4B = Buffer.from(typedArray_4B);
                                    let msg4B = {
                                        payload:buffer_4B
                                    };
                                    node.send(msg4B);
                                    HistoricalDataFixedPoint_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalDataFixedPointGetCode == '01'){//上位机接收正确，发送下一条
                                if (HistoricalDataFixedPoint_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    DataLen_4B = (returnData1len*2 + returnData2len*2 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                    DataLen_4B = (returnData1len*2 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,[]);
                                }
                                LENID_4B = LenghtSum(DataLen_4B);
                                if (HisDATALEN_4B == HistoricalDataFixedPoint_Data_Send_Num+1) {
                                    DATATYPE_4B = '01';
                                    let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                    let CKSUM_4B = Chksum(RETURNDATA_4B);
                                    let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                    let ReturnDataGroup_4B = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                       ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                    }
                                    ReturnDataGroup_4B.push(EOI);
                                    let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                    let buffer_4B = Buffer.from(typedArray_4B);
                                    let msg4B = {
                                        payload:buffer_4B
                                    };
                                    node.send(msg4B);
                                    HistoricalDataFixedPoint_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4B = '00';
                                    let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                    let CKSUM_4B = Chksum(RETURNDATA_4B);
                                    let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                    let ReturnDataGroup_4B = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                       ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                    }
                                    ReturnDataGroup_4B.push(EOI);
                                    let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                    let buffer_4B = Buffer.from(typedArray_4B);
                                    let msg4B = {
                                        payload:buffer_4B
                                    };
                                    node.send(msg4B);
                                    HistoricalDataFixedPoint_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalDataFixedPointGetCode == '02'){ //上位机接收失败，重新发送
                                let ResendNum = HistoricalDataFixedPoint_Data_Send_Num;
                                if (ResendNum == 0) {
                                    if (HistoricalDataFixedPoint_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                        let returnData2len = (HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                        DataLen_4B = (returnData1len*2 + returnData2len*2 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num]).length;
                                        DataLen_4B = (returnData1len*2 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,[]);
                                    }
                                    LENID_4B = LenghtSum(DataLen_4B);
                                    if (HisDATALEN_4B == HistoricalDataFixedPoint_Data_Send_Num+1) {
                                        DATATYPE_4B = '01';
                                        let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                        let CKSUM_4B = Chksum(RETURNDATA_4B);
                                        let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                        let ReturnDataGroup_4B = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                           ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                        }
                                        ReturnDataGroup_4B.push(EOI);
                                        let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                        let buffer_4B = Buffer.from(typedArray_4B);
                                        let msg4B = {
                                            payload:buffer_4B
                                        };
                                        node.send(msg4B);
                                        HistoricalDataFixedPoint_Data_Send_Num = 0;
                                        break;
                                    }else{
                                        DATATYPE_4B = '00';
                                        let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                        let CKSUM_4B = Chksum(RETURNDATA_4B);
                                        let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                        let ReturnDataGroup_4B = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                           ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                        }
                                        ReturnDataGroup_4B.push(EOI);
                                        let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                        let buffer_4B = Buffer.from(typedArray_4B);
                                        let msg4B = {
                                            payload:buffer_4B
                                        };
                                        node.send(msg4B);
                                        HistoricalDataFixedPoint_Data_Send_Num += 1;
                                        break;
                                    }
                                }else{
                                    if (HistoricalDataFixedPoint_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num-1]).length;
                                        let returnData2len = (HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num-1]).length;
                                        DataLen_4B = (returnData1len*2 + returnData2len*2 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num-1],HistoricalDataFixedPoint_Custom_num,HistoricalDataFixedPoint_custom[HistoricalDataFixedPoint_Data_Send_Num-1]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num-1]).length;
                                        DataLen_4B = (returnData1len*2 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4B = ReturnHisData(HistoricalDataFixedPoint_Data[HistoricalDataFixedPoint_Data_Send_Num],HistoricalDataFixedPoint_Custom_num,[]);
                                    }
                                    LENID_4B = LenghtSum(DataLen_4B);
                                    if (HistoricalDataFixedPoint_Data_Send_Num == HisDATALEN_4B) {
                                        DATATYPE_4B = '01';
                                        let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                        let CKSUM_4B = Chksum(RETURNDATA_4B);
                                        let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                        let ReturnDataGroup_4B = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                           ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                        }
                                        ReturnDataGroup_4B.push(EOI);
                                        let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                        let buffer_4B = Buffer.from(typedArray_4B);
                                        let msg4B = {
                                            payload:buffer_4B
                                        };
                                        node.send(msg4B);
                                        break;
                                    }else{
                                        DATATYPE_4B = '00';
                                        let RETURNDATA_4B = DataFrame_4B+LENID_4B+DATATYPE_4B+DATAFLAG_4B+DATATIME_4B+DATAAI_originalGroup_4B
                                        let CKSUM_4B = Chksum(RETURNDATA_4B);
                                        let ReturnDataGroupStr_4B = RETURNDATA_4B+CKSUM_4B;
                                        let ReturnDataGroup_4B = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4B.length; i++) {
                                           ReturnDataGroup_4B.push( numToASCIIString(ReturnDataGroupStr_4B[i]) );
                                        }
                                        ReturnDataGroup_4B.push(EOI);
                                        let typedArray_4B = new Uint8Array(ReturnDataGroup_4B);
                                        let buffer_4B = Buffer.from(typedArray_4B);
                                        let msg4B = {
                                            payload:buffer_4B
                                        };
                                        node.send(msg4B);
                                        break;
                                    }
                                }
                            }
                        }
                    case "4C"://获取历史告警
                        let DataLen_4C;
                        let DataFrame_4C = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4C;
                        let HistoricalAlarmGetCode = ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14]);
                        let DeviceID_4C = ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16]);
                        HistoricalAlarm_Data = globalContext.get(node.HistoricalAlarm_Data);//获取历史数据数组
                        HistoricalAlarm_custom = globalContext.get(node.HistoricalAlarm_custom);//获取历史数据自定义
                        HistoricalAlarm_Custom_num = globalContext.get(node.HistoricalAlarm_Custom_num);//获取历史数据自定义数量
                        let LENID_4C = '';
                        let DATATYPE_4C = "00";
                        let DATATIME_4C = "06080C2D2D"
                        let DATAFLAG_4C = dataflag(globalContext,node.alarm_status,node.switch_status);
                        let HisDATALEN_4C = HistoricalAlarm_Data.length
                        //判断历史数据数组长度
                        if (HisDATALEN_4C == 0) { //长度为0，无数据
                            break;
                        }
                        else{ //存在历史数据
                            //上位要求发送第一条数据
                            if(HistoricalAlarmGetCode == '00'){ //发送第一条数据
                                HistoricalAlarm_Data_Send_Num = 0; //防止上位机多次发送获取第一条数据，此时先将计数置0
                                //计算LENID
                               if (HistoricalAlarm_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]).length;
                                    DataLen_4C = (returnData1len*1 + returnData2len*1 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                    DataLen_4C = (returnData1len*1 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,[]);
                                }
                                LENID_4C = LenghtSum(DataLen_4C);
                                //判断发送数据是不是最后一条数据
                                if (HisDATALEN_4C == HistoricalAlarm_Data_Send_Num+1) {
                                    DATATYPE_4C = '01';
                                    let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                    let CKSUM_4C = Chksum(RETURNDATA_4C);
                                    let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                    let ReturnDataGroup_4C = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                       ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                    }
                                    ReturnDataGroup_4C.push(EOI);
                                    let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                    let buffer_4C = Buffer.from(typedArray_4C);
                                    let msg4C = {
                                        payload:buffer_4C
                                    };
                                    node.send(msg4C);
                                    HistoricalAlarm_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4C = '00';
                                    let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                    let CKSUM_4C = Chksum(RETURNDATA_4C);
                                    let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                    let ReturnDataGroup_4C = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                       ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                    }
                                    ReturnDataGroup_4C.push(EOI);
                                    let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                    let buffer_4C = Buffer.from(typedArray_4C);
                                    let msg4C = {
                                        payload:buffer_4C
                                    };
                                    node.send(msg4C);
                                    HistoricalAlarm_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalAlarmGetCode == '01'){//上位机接收正确，发送下一条
                                if (HistoricalAlarm_Custom_num > 0) { //判断自定义数据数量{
                                    let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                    let returnData2len = (HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]).length;
                                    DataLen_4C = (returnData1len*1 + returnData2len*1 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]);
                                }
                                else{
                                    let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                    DataLen_4C = (returnData1len*1 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                    //计算返回数据
                                    DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,[]);
                                }
                                LENID_4C = LenghtSum(DataLen_4C);
                                if (HisDATALEN_4C == HistoricalAlarm_Data_Send_Num+1) {
                                    DATATYPE_4C = '01';
                                    let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                    let CKSUM_4C = Chksum(RETURNDATA_4C);
                                    let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                    let ReturnDataGroup_4C = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                       ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                    }
                                    ReturnDataGroup_4C.push(EOI);
                                    let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                    let buffer_4C = Buffer.from(typedArray_4C);
                                    let msg4C = {
                                        payload:buffer_4C
                                    };
                                    node.send(msg4C);
                                    HistoricalAlarm_Data_Send_Num = 0;
                                    break;
                                }else{
                                    DATATYPE_4C = '00';
                                    let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                    let CKSUM_4C = Chksum(RETURNDATA_4C);
                                    let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                    let ReturnDataGroup_4C = [SOI];
                                    for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                       ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                    }
                                    ReturnDataGroup_4C.push(EOI);
                                    let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                    let buffer_4C = Buffer.from(typedArray_4C);
                                    let msg4C = {
                                        payload:buffer_4C
                                    };
                                    node.send(msg4C);
                                    HistoricalAlarm_Data_Send_Num += 1;
                                    break;
                                }
                            }
                            else if(HistoricalAlarmGetCode == '02'){ //上位机接收失败，重新发送
                                let ResendNum = HistoricalAlarm_Data_Send_Num;
                                if (ResendNum == 0) {
                                    if (HistoricalAlarm_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                        let returnData2len = (HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]).length;
                                        DataLen_4C = (returnData1len*1 + returnData2len*1 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num]).length;
                                        DataLen_4C = (returnData1len*1 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,[]);
                                    }
                                    LENID_4C = LenghtSum(DataLen_4C);
                                    if (HisDATALEN_4C == HistoricalAlarm_Data_Send_Num+1) {
                                        DATATYPE_4C = '01';
                                        let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                        let CKSUM_4C = Chksum(RETURNDATA_4C);
                                        let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                        let ReturnDataGroup_4C = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                           ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                        }
                                        ReturnDataGroup_4C.push(EOI);
                                        let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                        let buffer_4C = Buffer.from(typedArray_4C);
                                        let msg4C = {
                                            payload:buffer_4C
                                        };
                                        node.send(msg4C);
                                        HistoricalAlarm_Data_Send_Num = 0;
                                        break;
                                    }else{
                                        DATATYPE_4C = '00';
                                        let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                        let CKSUM_4C = Chksum(RETURNDATA_4C);
                                        let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                        let ReturnDataGroup_4C = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                           ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                        }
                                        ReturnDataGroup_4C.push(EOI);
                                        let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                        let buffer_4C = Buffer.from(typedArray_4C);
                                        let msg4C = {
                                            payload:buffer_4C
                                        };
                                        node.send(msg4C);
                                        HistoricalAlarm_Data_Send_Num += 1;
                                        break;
                                    }
                                }else{
                                    if (HistoricalAlarm_Custom_num > 0) { //判断自定义数据数量{
                                        let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num-1]).length;
                                        let returnData2len = (HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num-1]).length;
                                        DataLen_4C = (returnData1len*1 + returnData2len*1 + 1 + 1 + 5)*2; // 数据4字节,自定义数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num-1],HistoricalAlarm_Custom_num,HistoricalAlarm_custom[HistoricalAlarm_Data_Send_Num-1]);
                                    }
                                    else{
                                        let returnData1len = (HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num-1]).length;
                                        DataLen_4C = (returnData1len*1 + 1 + 1 +5)*2; // 数据4字节,自定义数据数量1字节,DATAFLAG1字节 DATATYPE 1字节 DATATIME 5字节
                                        //计算返回数据
                                        DATAAI_originalGroup_4C = ReturnHisDataAlarm(HistoricalAlarm_Data[HistoricalAlarm_Data_Send_Num],HistoricalAlarm_Custom_num,[]);
                                    }
                                    LENID_4C = LenghtSum(DataLen_4C);
                                    if (HistoricalAlarm_Data_Send_Num == HisDATALEN_4C) {
                                        DATATYPE_4C = '01';
                                        let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                        let CKSUM_4C = Chksum(RETURNDATA_4C);
                                        let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                        let ReturnDataGroup_4C = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                           ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                        }
                                        ReturnDataGroup_4C.push(EOI);
                                        let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                        let buffer_4C = Buffer.from(typedArray_4C);
                                        let msg4C = {
                                            payload:buffer_4C
                                        };
                                        node.send(msg4C);
                                        break;
                                    }else{
                                        DATATYPE_4C = '00';
                                        let RETURNDATA_4C = DataFrame_4C+LENID_4C+DATATYPE_4C+DATAFLAG_4C+DATATIME_4C+DATAAI_originalGroup_4C
                                        let CKSUM_4C = Chksum(RETURNDATA_4C);
                                        let ReturnDataGroupStr_4C = RETURNDATA_4C+CKSUM_4C;
                                        let ReturnDataGroup_4C = [SOI];
                                        for (var i = 0; i < ReturnDataGroupStr_4C.length; i++) {
                                           ReturnDataGroup_4C.push( numToASCIIString(ReturnDataGroupStr_4C[i]) );
                                        }
                                        ReturnDataGroup_4C.push(EOI);
                                        let typedArray_4C = new Uint8Array(ReturnDataGroup_4C);
                                        let buffer_4C = Buffer.from(typedArray_4C);
                                        let msg4C = {
                                            payload:buffer_4C
                                        };
                                        node.send(msg4C);
                                        break;
                                    }
                                }
                            }
                        }
                    case "4D"://获取监测模块时间
                        let DataLen_4D;
                        let DataFrame_4D = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4D;
                        DataLen_4D = 14; //5个一字节，1个两字节
                        let LENID_4D = LenghtSum(DataLen_4D);
                        let times = globalContext.get(node.DatetimeGroup);
                        let timegroup = getDate(times);
                        let timegroupStr = timegroup[0]+timegroup[1]+timegroup[2]+timegroup[3]+timegroup[4]+timegroup[5];
                        let RETURNDATA_4D = DataFrame_4D+LENID_4D+timegroupStr;
                        let CKSUM_4D = Chksum(RETURNDATA_4D);
                        let ReturnDataGroupStr_4D = RETURNDATA_4D+CKSUM_4D;
                        let ReturnDataGroup_4D = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_4D.length; i++) {
                           ReturnDataGroup_4D.push( numToASCIIString(ReturnDataGroupStr_4D[i]) );
                        }
                        ReturnDataGroup_4D.push(EOI);
                        let typedArray_4D = new Uint8Array(ReturnDataGroup_4D);
                        let buffer_4D = Buffer.from(typedArray_4D);
                        let msg4D_1 = {
                            payload:buffer_4D
                        };
                        node.send(msg4D_1);
                        break;
                    case "4E"://设定监测模块时间
                        let DataLen_4E;
                        let DataFrame_4E = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4E;
                        //获取时间
                        let year = parseInt((ASCIIStringTonum(msg.payload[13])+ASCIIStringTonum(msg.payload[14])),16).toString()+parseInt((ASCIIStringTonum(msg.payload[15])+ASCIIStringTonum(msg.payload[16])),16).toString();
                        let moth = parseInt((ASCIIStringTonum(msg.payload[17])+ASCIIStringTonum(msg.payload[18])),16).toString();
                        let day = parseInt((ASCIIStringTonum(msg.payload[19])+ASCIIStringTonum(msg.payload[20])),16).toString();
                        let hour = parseInt((ASCIIStringTonum(msg.payload[21])+ASCIIStringTonum(msg.payload[22])),16).toString()
                        let minute = parseInt((ASCIIStringTonum(msg.payload[23])+ASCIIStringTonum(msg.payload[24])),16).toString();
                        let second = parseInt((ASCIIStringTonum(msg.payload[25])+ASCIIStringTonum(msg.payload[26])),16).toString();
                        let DateTimeGroup = year+"-"+moth+"-"+day+" "+hour+":"+minute+":"+second;
                        
                        DataLen_4E = 0; //5个一字节，1个两字节
                        let LENID_4E = LenghtSum(DataLen_4E);
                        let Timestamp = getTimestamp(DateTimeGroup);
                        
                        globalContext.set(node.DatetimeGroup,Timestamp);
                        let RETURNDATA_4E = DataFrame_4E+LENID_4E;
                        let CKSUM_4E = Chksum(RETURNDATA_4E);
                        let ReturnDataGroupStr_4E = RETURNDATA_4E+CKSUM_4E;
                        let ReturnDataGroup_4E = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_4E.length; i++) {
                           ReturnDataGroup_4E.push( numToASCIIString(ReturnDataGroupStr_4E[i]) );
                        }
                        ReturnDataGroup_4E.push(EOI);
                        let typedArray_4E = new Uint8Array(ReturnDataGroup_4E);
                        let buffer_4E = Buffer.from(typedArray_4E);
                        let msg4E_1 = {
                            payload:buffer_4E
                        };
                        let msg4E_4 = {
                            payload:{
                                timestamp:Timestamp,
                                Datetime:DateTimeGroup
                            }
                        };
                        node.send([msg4E_1, , ,msg4E_4]);
                        break;
                    case "4F"://获取通信协议版本号
                        let DataLen_4F;
                        let DataFrame_4F = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_4F;
                        DataLen_4F = 0; //5个一字节，1个两字节
                        let LENID_4F = LenghtSum(DataLen_4F);
                        let RETURNDATA_4F = DataFrame_4F+LENID_4F;
                        let CKSUM_4F = Chksum(RETURNDATA_4F);
                        let ReturnDataGroupStr_4F = RETURNDATA_4F+CKSUM_4F;
                        let ReturnDataGroup_4F = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_4F.length; i++) {
                           ReturnDataGroup_4F.push( numToASCIIString(ReturnDataGroupStr_4F[i]) );
                        }
                        ReturnDataGroup_4F.push(EOI);
                        let typedArray_4F = new Uint8Array(ReturnDataGroup_4F);
                        let buffer_4F = Buffer.from(typedArray_4F);
                        let msg4F_1 = {
                            payload:buffer_4F
                        };
                        node.send(msg4F_1);
                        break;
                    case "50"://获取设备地址
                        let DataLen_50;
                        let DataFrame_50 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_50;
                        DataLen_50 = 0; //5个一字节，1个两字节
                        let LENID_50 = LenghtSum(DataLen_50);
                        let RETURNDATA_50 = DataFrame_50+LENID_50;
                        let CKSUM_50 = Chksum(RETURNDATA_50);
                        let ReturnDataGroupStr_50 = RETURNDATA_50+CKSUM_50;
                        let ReturnDataGroup_50 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_50.length; i++) {
                           ReturnDataGroup_50.push( numToASCIIString(ReturnDataGroupStr_50[i]) );
                        }
                        ReturnDataGroup_50.push(EOI);
                        let typedArray_50 = new Uint8Array(ReturnDataGroup_50);
                        let buffer_50 = Buffer.from(typedArray_50);
                        let msg50_1 = {
                            payload:buffer_50
                        };
                        node.send(msg50_1);
                        break;
                    case "51": //获取设备（监测模块）厂家信息
                        let DataLen_51;
                        let DataFrame_51 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_51;
                        DataLen_51 = 64; //5个一字节，1个两字节
                        let LENID_51 = LenghtSum(DataLen_51);
                        
                        let company = node.ManufacturerInformation;
                        let edition = node.ManufacturerEdition;
                        let DeviceName = node.ManufacturerDevice;
                        let message1 = "";
                        let message2 = "";

                        for (let i in DeviceName) { 
                            let code = numToASCIIString(DeviceName[i]).replace("0x","")
                            message1 += code.toLocaleUpperCase();
                        }
                        console.log(message1)
                        message1 = PrefixInteger(message1,20);
                        console.log(message1)
                        let editiongroup = edition.split('.');
                        let editionMessage = DectoHex2(editiongroup[0])+DectoHex2(editiongroup[1]);
                        
                        for (let i in company) { 
                            let code = numToASCIIString(company[i]).replace("0x","")
                            message2 += code.toLocaleUpperCase();
                        }
                        message2 = PrefixInteger(message2,40);

                        let RETURNDATA_51 = DataFrame_51+LENID_51+message1+editionMessage+message2;
                        let CKSUM_51 = Chksum(RETURNDATA_51);
                        let ReturnDataGroupStr_51 = RETURNDATA_51+CKSUM_51;
                        let ReturnDataGroup_51 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_51.length; i++) {
                           ReturnDataGroup_51.push( numToASCIIString(ReturnDataGroupStr_51[i]) );
                        }
                        ReturnDataGroup_51.push(EOI);
                        let typedArray_51 = new Uint8Array(ReturnDataGroup_51);
                        let buffer_51 = Buffer.from(typedArray_51);
                        let msg51_1 = {
                            payload:buffer_51
                        };
                        node.send(msg51_1);
                        break;
                    case "80": //用户自定义命令类型
                        let DataLen_80;
                        let DataFrame_80 = version+Adress+lowermachinetype+check_data.code; //前段字符
                        let DATAAI_originalGroup_80;
                        if (node.User_Custom_num > 0) {
                            let returnData1len = (node.User_custom).length;
                            DataLen_80 = (returnData1len*2 + 1 + 1)*2; // 数据2字节,自定义数据数量1字节,DATAFLAG1字节
                        }
                        let LENID_80 = LenghtSum(DataLen_80);
                        let DATAFLAG_80 = dataflag(globalContext,node.alarm_status,node.switch_status);
                        DATAAI_originalGroup_80 = ReturnData(globalContext,node.User_custom,node.User_Custom_num,"")
                        let RETURNDATA_80 = DataFrame_80+LENID_80+DATAFLAG_80+DATAAI_originalGroup_80;
                        let CKSUM_80 = Chksum(RETURNDATA_80);
                        let ReturnDataGroupStr_80 = RETURNDATA_80+CKSUM_80;
                        let ReturnDataGroup_80 = [SOI];
                        for (var i = 0; i < ReturnDataGroupStr_80.length; i++) {
                           ReturnDataGroup_80.push( numToASCIIString(ReturnDataGroupStr_80[i]) );
                        }
                        ReturnDataGroup_80.push(EOI);
                       // node.error("12131424")//输出错误
                       // node.warn("9912131424")//输出告警
                        let typedArray_80 = new Uint8Array(ReturnDataGroup_80);
                        let buffer_80 = Buffer.from(typedArray_80);
                        msg.payload = buffer_80;
                        node.send(msg);
                     default:
                        node.error("CID2错误")
                }
            }else{
                let DataFrame0 = version+Adress+lowermachinetype+check_data.code+"0000";
                DataFrame0 += Chksum(DataFrame0);
                let DataFrameGroup = [SOI]
                for (var i = 0; i < DataFrame0.length; i++) {
                    DataFrameGroup.push(numToASCIIString(DataFrame0[i]));
                }
                DataFrameGroup.push(EOI);
                let typedArray = new Uint8Array(DataFrameGroup)
                let buffer = Buffer.from(typedArray)
                msg.payload = buffer;
                node.send(msg);
            }
            if (node.err) {
                if (done) {
                    // Node-RED 1.0 compatible
                    done(node.err);
                } else {
                    // Node-RED 0.x compatible
                    node.error(node.err, msg);
                }
            }
        });
    }
    RED.nodes.registerType("ydt-Lower-machine",YdtLowerMachine);
}