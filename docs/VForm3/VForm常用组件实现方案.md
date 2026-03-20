# VForm 文件/图片上传

### 1、配置上传参数

```

上传到后端服务器，上传地址

比如：http://117.72.70.166:9001/File/Upload

群主的demo上传单文件

返回参数
{
  "Total": 0,
  "Data": "/Resource/Import/2025/02/13/9c4be64b75844067962350eafe33535d.xlsx",
  "Tag": 1, // 1：上传成功，0：上传失败
  "Message": "test",
  "Description": "6"
}

```

### 2、数据回显处理

在组件的 onBeforeUpload 交互事件中编写代码，如下所示：

```javaScript
if (result.Tag == 1) {
    console.log("上传文件成功");
    return {
        name: result.Message,
        url: result.Data
    }
} else {
   console.log("上传文件失败");
}
```

### 3、上传携带 token 信息(有鉴权就带，否则不用这一步)

在组件的 onCreated 交互事件中编写代码，如下所示：

```javaScript
const array = document.cookie.split(';');
var token = '';
for (var i = 0; i < array.length; i++) {
    var temp = array[i].trim().split("=");
    if (temp[0] == 'Admin-Token') {
        token = temp[1];
        break;
    }
}
this.uploadHeaders = {
    Authorization: "Bearer " + token
}
```

# 日期范围选择器 获取两个字段差值

```javascript
console.log("777777==================", value);

console.log("8888==================", oldValue);

console.log("0==================", value[0]);

console.log("1==================", value[1]);

const startDate = value[0];
const endDate = value[1];
if (startDate && endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  //const hoursDiff = Math.ceil(timeDiff / (1000 * 3600));

  console.log("天数:", daysDiff);

  const daysWidget = this.getWidgetRef("input40240");

  if (daysWidget) {
    daysWidget.fieldModel = daysDiff;
    console.log("天数字段已通过组件引用更新:", daysDiff);
  } else {
    console.warn("未找到天数字段组件");
  }
}
```

# select 远程获取用户列表

```javascript
let userOpetions = this.getWidgetRef("selectUser");
axios
  .get("http://antflow.top:7001/user/getUser")
  .then(function (res) {
    console.log("res=====", JSON.stringify(res.data));
    let list = res.data.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    console.log("list=====", JSON.stringify(list));
    userOpetions.loadOptions(list);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Html标签用法

```
<h1>标题</h1> 
<p>哈哈哈哈哈哈哈哈哈</p> 
<p>哈哈哈哈哈哈哈哈哈</p> 
<p>哈哈哈哈哈哈哈哈哈</p>
<p>日期：<input style="border: none;outline: none;"/></p>
<p>姓名：<input style="border: none;outline: none;"/></p>

```