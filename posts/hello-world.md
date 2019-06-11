# Hello, world

由于本教程专注在前端，也就是说大部分的代码都会运行在浏览器中。你可能已经知道了 JavaScript 不但可以运行在浏览器端，也可以运行在服务端（需要安装 nodejs 运行时），但这不在本教程的讨论范围内。

首先，让我们看看如何将脚本添加到网页上。

“script” 标签
JavaScript 程序可以使用 <script> 标签插入到 HTML 的任何地方。

比如：

```
<!DOCTYPE HTML>
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <p>Hi, how are you?</p>
        <script>
            console.log('Hello, world!');
        </script>
    </body>
</html>

```

<script> 标签中包裹了 JavaScript 代码，当浏览器遇到 <script> 标签，代码会自动运行

## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

脚本文件可以通过 src 属性添加到 HTML 文件中。


```
<script src="/path/to/index.js"></script>
```

这里，/path/to/index.js 是脚本文件的绝对路径（从站点根目录开始）。

也可以提供相对于当前页面的相对路径。比如，src="index.js" 意思是来自当前文件夹（及index.html 文件所在的文件夹）的 "index.js" 文件。

我们还可以提供一个完整的 URL 地址，例如：

```
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

## script 标签不能既设置了 src 属性，又添加了标签内容，如果两者同时存在，则标签内容将会被忽略。
如下代码不会再控制台打印出 “hello，world”

```
<script src="index.js">
    console.log('Hello, world'); // 由于设置了 src 属性，该段代码不会被执行
</script>
```

