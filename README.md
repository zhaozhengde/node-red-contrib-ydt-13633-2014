### YD-T 1363.3-2014前端智能设备协议下位机节点

### 输入Inputs

##### 串口数据流

对应串口节点，接收上位机发送的buff串口数据

### 输出Outputs

##### 1、返回串口数据流

返回串口数据流给串口输出节点，提供上位机数据。

##### 2、输出遥控参数

当上位机发送遥控数据帧时，输出上位机遥控参数。

输出格式，输出COMMAND TYPE的16进制字符，例：“0F”

```
—— COMMAND TYPE=00H ：遥控机组关机；  
—— COMMAND TYPE=0FH ：遥控机组开机；  
—— COMMAND TYPE=10H ：选择 1#机组主用；  
—— COMMAND TYPE=1FH ：选择 2#机组主用；  
—— COMMAND TYPE=FFH ：紧急停车
```

##### 3、输出设置参数

当上位机发送设置数据帧时，输出上位机设置参数。

输出参数格式：{"COMMAND_GROUP":"01","COMMAND_TYPE":"80","COMMAND_DATAF":"9C28"}

```
-------COMMAND GROUP =01H ：主备油机时，取油机 1 参数；单台油机时，取油机的参数；
-------COMMAND GROUP =02H ：主备油机时，取油机 2 参数。
```

```
COMMAND_TYPE：
1 交流线/相电压 AB/A 上限 80H  
2 交流线/相电压 AB/A 下限 81H  
3 交流线/相电压 BC/B 上限 82H  
4 交流线/相电压 BC/B 下限 83H  
5 交流线/相电压 CA/C 上限 84H  
6 交流线/相电压 CA/C 下限 85H  
7 交流电流 A 上限 86H  
8 交流电流 B 上限 87H  
9 交流电流 C 上限 88H  
10 频率/转速上限 89H  
11 频率/转速下限 8AH  
12 润滑油油压下限 8BH  
13 润滑油油温上限 8CH  
14 水温上限 8DH  
15 电池电压上限 8EH  
16 电池电压下限 8FH  
17 用户自定义 C0H～EFH
```

##### 4、输出时间参数

当上位机发送设置时间时，输出时间参数，含时间戳及日期时间格式字符串。

输出参数格式：

```
{"timestamp":1654675810000,"Datetime":"2022-6-8 16:10:10"}
```

### 节点参数设置

节点设置的相关参数可选择静态值（选择静态数据），或者设置为变量。

###### 1、设置为静态数据

设置为静态数据时，填入值为返回上位机的数据值。根据数据要求填入整数或浮点数。

###### 2、设置为变量

设置为变量时，填入值为变量名，此变量为全局变量，需要运行节点前已经定义此全局变量及赋值

### 关于历史数据

历史数据采用变量形式储存，在节点设置中设置全局变量名，节点收到获取历史数据帧时，通过设置的变量，获取变量内的值作为历史数据返回，变量值例：

```
 [
    [
        {
            name: "输出线/相电压AB/A",
            datavalue: 1
        },
        {
            name: "输出线/相电压BC/B",
            datavalue: 2
        },
        {
            name: "输出线/相电压CA/C",
            datavalue: 3
        },
        {
            name: "输出电流A",
            datavalue: 4
        },
        {
            name: "输出电流B",
            datavalue: 5
        },
        {
            name: "输出电流C",
            datavalue: 6
        },
        {
            name: "输出频率/转速",
            datavalue: 7
        },
        {
            name: "水温（水冷）",
            datavalue: 8
        },
        {
            name: "润滑油油温",
            datavalue: 9
        },
        {
            name: "润滑油油压",
            datavalue: 10
        },
        {
            name: "启动电池电压",
            datavalue: 11
        },
        {
            name: "输出功率",
            datavalue: 12
        },
        {
            name: "液（油）位",
            datavalue: 13
        }
    ],
    [
        {
            name: "输出线/相电压AB/A",
            datavalue: 11
        },
        {
            name: "输出线/相电压BC/B",
            datavalue: 21
        },
        {
            name: "输出线/相电压CA/C",
            datavalue: 31
        },
        {
            name: "输出电流A",
            datavalue: 41
        },
        {
            name: "输出电流B",
            datavalue: 51
        },
        {
            name: "输出电流C",
            datavalue: 61
        },
        {
            name: "输出频率/转速",
            datavalue: 71
        },
        {
            name: "水温（水冷）",
            datavalue: 81
        },
        {
            name: "润滑油油温",
            datavalue: 91
        },
        {
            name: "润滑油油压",
            datavalue: 101
        },
        {
            name: "启动电池电压",
            datavalue: 111
        },
        {
            name: "输出功率",
            datavalue: 121
        },
        {
            name: "液（油）位",
            datavalue: 131
        }
    ]
    ]
```


