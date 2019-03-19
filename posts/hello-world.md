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
        <p>script 标签之前...</p>
        <script>
            console.log('Hello, world!');
        </script>
        <p>...script 标签之后</p>
    </body>
</html>

```

<script> 标签中包裹了 JavaScript 代码，当浏览器遇到 <script> 标签，代码会自动运行

## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

脚本文件可以通过 src 属性添加到 HTML 文件中。


```
<script src="/path/to/script.js"></script>
```