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
        label:'X坐标轴',
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
    }
    
}

export default obj;