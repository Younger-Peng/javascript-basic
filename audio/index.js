// window.URL = window.URL || window.webkitURL;
// //获取计算机的设备：摄像头或者录音设备
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// var HZRecorder = function (stream, config) {
//     config = config || {};
//     config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16
//     config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)

//     //创建一个音频环境对象
//     var audioContext = window.AudioContext || window.webkitAudioContext;
//     var context = new audioContext();
//     var audioInput = context.createMediaStreamSource(stream);
//     // 第二个和第三个参数指的是输入和输出都是单声道,2是双声道。
//     var recorder = context.createScriptProcessor(4096, 1, 1);

//     var audioData = {
//         size: 0          //录音文件长度
//         , buffer: []     //录音缓存
//         , inputSampleRate: context.sampleRate    //输入采样率
//         , inputSampleBits: 16       //输入采样数位 8, 16
//         , outputSampleRate: config.sampleRate    //输出采样率
//         , outputSampleBits: config.sampleBits       //输出采样数位 8, 16
//         , input: function (data) {
//             this.buffer.push(new Float32Array(data));
//             this.size += data.length;
//         }
//         , compress: function () { //合并压缩
//             //合并
//             var data = new Float32Array(this.size);
//             var offset = 0;
//             for (var i = 0; i < this.buffer.length; i++) {
//                 data.set(this.buffer[i], offset);
//                 offset += this.buffer[i].length;
//             }
//             //压缩
//             var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
//             var length = data.length / compression;
//             var result = new Float32Array(length);
//             var index = 0, j = 0;
//             while (index < length) {
//                 result[index] = data[j];
//                 j += compression;
//                 index++;
//             }
//             return result;
//         }
//         , encodeWAV: function () {
//             var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
//             var sampleBits = Math.min(this.inputSampleBits, this.outputSampleBits);
//             var bytes = this.compress();
//             var dataLength = bytes.length * (sampleBits / 8);
//             var buffer = new ArrayBuffer(44 + dataLength);
//             var data = new DataView(buffer);

//             var channelCount = 1;//单声道
//             var offset = 0;

//             var writeString = function (str) {
//                 for (var i = 0; i < str.length; i++) {
//                     data.setUint8(offset + i, str.charCodeAt(i));
//                 }
//             }

//             // 资源交换文件标识符
//             writeString('RIFF'); offset += 4;
//             // 下个地址开始到文件尾总字节数,即文件大小-8
//             data.setUint32(offset, 36 + dataLength, true); offset += 4;
//             // WAV文件标志
//             writeString('WAVE'); offset += 4;
//             // 波形格式标志
//             writeString('fmt '); offset += 4;
//             // 过滤字节,一般为 0x10 = 16
//             data.setUint32(offset, 16, true); offset += 4;
//             // 格式类别 (PCM形式采样数据)
//             data.setUint16(offset, 1, true); offset += 2;
//             // 通道数
//             data.setUint16(offset, channelCount, true); offset += 2;
//             // 采样率,每秒样本数,表示每个通道的播放速度
//             data.setUint32(offset, sampleRate, true); offset += 4;
//             // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
//             data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
//             // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
//             data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
//             // 每样本数据位数
//             data.setUint16(offset, sampleBits, true); offset += 2;
//             // 数据标识符
//             writeString('data'); offset += 4;
//             // 采样数据总数,即数据总大小-44
//             data.setUint32(offset, dataLength, true); offset += 4;
//             // 写入采样数据
//             if (sampleBits === 8) {
//                 for (var i = 0; i < bytes.length; i++, offset++) {
//                     var s = Math.max(-1, Math.min(1, bytes[i]));
//                     var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
//                     val = parseInt(255 / (65535 / (val + 32768)));
//                     data.setInt8(offset, val, true);
//                 }
//             } else {
//                 for (var i = 0; i < bytes.length; i++, offset += 2) {
//                     var s = Math.max(-1, Math.min(1, bytes[i]));
//                     data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
//                 }
//             }

//             return new Blob([data], { type: 'audio/mp3' });
//         }
//     };

//     //开始录音
//     this.start = function () {
//         audioInput.connect(recorder);
//         recorder.connect(context.destination);
//     }

//     //停止
//     this.stop = function () {
//         recorder.disconnect();
//     }

//     //获取音频文件
//     this.getBlob = function () {
//         this.stop();
//         return audioData.encodeWAV();
//     }

//     //回放
//     this.play = function (audio) {
//         audio.src = window.URL.createObjectURL(this.getBlob());
//     }
//     //清除
//     this.clear = function(){
//         audioData.buffer=[];
//         audioData.size=0;
//     }

//     //上传
//     this.upload = function (url, callback) {
//         var fd = new FormData();
//         fd.append("audioData", this.getBlob());
//         var xhr = new XMLHttpRequest();
//         if (callback) {
//             xhr.upload.addEventListener("progress", function (e) {
//                 callback('uploading', e);
//             }, false);
//             xhr.addEventListener("load", function (e) {
//                 callback('ok', e);
//             }, false);
//             xhr.addEventListener("error", function (e) {
//                 callback('error', e);
//             }, false);
//             xhr.addEventListener("abort", function (e) {
//                 callback('cancel', e);
//             }, false);
//         }
//         xhr.open("POST", url);
//         xhr.send(fd);
//     }

//     //音频采集
//     recorder.onaudioprocess = function (e) {
//         audioData.input(e.inputBuffer.getChannelData(0));
//         //record(e.inputBuffer.getChannelData(0));
//     }

// };
// //抛出异常
// HZRecorder.throwError = function (message) {
//     alert(message);
//     throw new function () { this.toString = function () { return message; } }
// }
// //是否支持录音





// 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
if (navigator.mediaDevices === undefined) {
    content.innerText = content.innerText + 'navigator.mediaDevices === undefined\n'
  navigator.mediaDevices = {};
}

// 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia 
// 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
if (navigator.mediaDevices.getUserMedia === undefined) {
    content.innerText = content.innerText + 'navigator.mediaDevices.getUserMedia === undefined\n'
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // 首先，如果有getUserMedia的话，就获得它
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    content.innerText = content.innerText + 'getUserMedia still is undefined\n'

    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
    if (!getUserMedia) {
      return Promise.reject(new Error('_getUserMedia_ is not implemented in this browser'));
    }

    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}






    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // content.innerText = content.innerText + '2'
            // var rec = new HZRecorder(stream, config);
            // callback(rec);


            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            const context = new AudioContext(); // 创建管理、播放声音的对象

            const liveSource = context.createMediaStreamSource(stream) // 将麦克风的声音输入该对象
            const levelChecker = context.createScriptProcessor(16384, 1, 1);
            liveSource.connect(levelChecker); //将该分析对象与麦克风音频进行连接

            levelChecker.connect(context.destination)

            levelChecker.onaudioprocess = function(e) { //开始处理音频
                content.innerText = Math.random().toFixed(8);
                var buffer = e.inputBuffer.getChannelData(0); //获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
                //创建变量并迭代来获取最大的音量值
               
                console.log(buffer.length)
                var maxVal = 0; 
                for (var i = 0; i < buffer.length; i++) {
                    if (maxVal < buffer[i]) {
                        maxVal = buffer[i];
                    }
                }

                //显示音量值
                db.innerHTML = "音量："+Math.round(maxVal*100);
                // if(maxVal>.5){
                //     //当音量值大于0.5时，显示“声音太响”字样，并断开音频连接
                //     db.innerHTML = "您的声音太响了!!";
                //     liveSource.disconnect(levelChecker);
                // }
            };
        })
        .catch(error => {
            console.log(error)
            console.log(error.name)
            console.log(error.message)
            // switch (error.code || error.name) {
            //     case 'PERMISSION_DENIED':
            //     case 'PermissionDeniedError':
            //         HZRecorder.throwError('用户拒绝提供信息。');
            //         break;
            //     case 'NOT_SUPPORTED_ERROR':
            //     case 'NotSupportedError':
            //         HZRecorder.throwError('浏览器不支持硬件设备。');
            //         break;
            //     case 'MANDATORY_UNSATISFIED_ERROR':
            //     case 'MandatoryUnsatisfiedError':
            //         HZRecorder.throwError('无法发现指定的硬件设备。');
            //         break;
            //     default:
            //         HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
            //         break;
            // }
        })