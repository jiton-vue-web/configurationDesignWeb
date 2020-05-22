//用于定义所有的属性组件信息
const obj = {
    "x": {
        attr:"x",
        label:'X坐标轴',
        component:'inputNumber',
        precision:0,
        value:0,
        step:1,
        min:0,
        // max:10,
        position:'right',
        disabled:false,
    },
    "y": {
        attr:"y",
        label:'Y坐标轴',
        component:'inputNumber',
        precision:0,
        value:0,
        step:1,
        min:0,
        // max:10,
        position:'right',
        disabled:false
    },
    "w": {
        attr:"w",
        label:'宽度(px)',
        component:'inputNumber',
        precision:0,
        value:0,
        step:1,
        min:0,
        // max:10,
        position:'right',
        disabled:false
    },
    "h": {
        attr:"h",
        label:'高度(px)',
        component:'inputNumber',
        precision:0,
        value:0,
        step:1,
        min:0,
        // max:10,
        position:'right',
        disabled:false
    },
    "lineHeight": {
        attr:"lineHeight",
        label:'行高',
        component:'inputNumber',
        precision:2,
        value:0,
        step:0.1,
        min:0,
        // max:10,
        position:'right',
        disabled:false
    },
    "backColor": {
        attr:"backColor",
        label:'背景颜色',
        component:'colorPicker',
        value:'rgba(0,0,0,0)',
    },
    "zIndex": {
        attr:"zIndex",
        label:'元素层级',
        component:'inputNumber',
        precision:0,
        value:1,
        step:1,
        min:0,
        // max:10,
        position:'right',
        disabled:false
    },
    "text": {
        attr:"text",
        label:'文字',
        value:"",
        component:'input',
        disabled:false
    },
    "color": {
        attr:"color",
        label:'字体颜色',
        component:'colorPicker',
        value:'rgba(0,0,0,0)',
    },
    "fontSize": {
        attr:"fontSize",
        label:'字体大小',
        component:'select',
        value:16,
        options:[{
            value: 14,
            label: '14px'
          }, {
            value: 16,
            label: '16px'
          }, {
            value: 18,
            label: '18px'
          }, {
            value: 20,
            label: '20px'
          }],
        disabled:false
    },
    "textAlign": {
        attr:"textAlign",
        label:'对齐方式',
        component:'select',
        value:2,
        options:[{
            value: "left",
            label: '左对齐'
          }, {
            value: "right",
            label: '右对齐'
          }, {
            value: "center",
            label: '居中对齐'
          }, {
            value: "justify",
            label: '两边对齐'
          }],
        disabled:false
    },
    "url": {
        attr:"url",
        label:'URL',
        value:"",
        component:'input',
        disabled:false
    },
    "rotate":{
        attr:"rotate",
        label:'旋转角度',
        component:'inputNumber',
        precision:0,
        value:0,
        step:10,
        min:-360,
        // max:10,
        position:'right',
        disabled:false
    },
    "warnPointRange":{
      attr:"warnPointRange",
      label:'报警范围',
      component:'inputNumber',
      precision:0,
      value:0,
      step:5,
      min:0,
      // max:10,
      position:'right',
      disabled:false
    },
    "positionType":{
      attr:"positionType",
      label:'摆放类型',
      component:'radio',
      text:["水平","垂直"],
      value:0,
      disabled:false
    },
    "startPoint":{
      attr:"startPoint",
      label:'起始点',
      component:'radio',
      text:["上/左","下/右"],
      value:0,
      disabled:false
    },
    "startEndPosition":{
      attr:"startEndPosition",
      label:'头尾位置',
      component:'radio',
      text:["上/左","下/右"],
      value:0,
      disabled:false
    },
    "tooltipPosition":{
      attr:"tooltipPosition",
      label:'消息框位置',
      component:'radio',
      text:["上/左","下/右"],
      value:0,
      disabled:false
    },
    "warnMaxVal":{
      attr:"warnMaxVal",
      label:'报警最大值',
      component:'inputNumber',
      precision:0,
      value:0,
      step:1,
      min:0,
      // max:10,
      position:'right',
      disabled:false
    },
    "warnMinVal":{
      attr:"warnMinVal",
      label:'报警最小值',
      component:'inputNumber',
      precision:0,
      value:0,
      step:1,
      min:0,
      // max:10,
      position:'right',
      disabled:false
    },
    "warnRange":{
      attr:"warnRange",
      label:'报警范围',
      component:'inputNumber',
      precision:0,
      value:0,
      step:1,
      min:0,
      // max:10,
      position:'right',
      disabled:false
    },
    "showStartEnd":{
      attr:"showStartEnd",
      label:'显示头尾',
      component:'radio',
      text:["是","否"],
      value:0,
      disabled:false
    },
    "leakWaterPosition":{
      attr:"leakWaterPosition",
      label:'定位漏水线',
      component:'radio',
      text:["是","否"],
      value:0,
      disabled:false
    },
    "showTooltip":{
      attr:"showTooltip",
      label:'显示提示框',
      component:'radio',
      text:["是","否"],
      value:0,
      disabled:false
    },
    "warnPoint":{
      attr:"warnPoint",
      label:'虚拟报警点',
      component:'inputNumber',
      precision:0,
      value:0,
      step:10,
      min:10,
      // max:10,
      position:'right',
      disabled:false
    }
    
}

export default obj;