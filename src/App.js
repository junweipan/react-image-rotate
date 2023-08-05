/* eslint-disable */
import "./App.css";
import "./Customise.css";
import { useEffect } from "react";
import { useState } from "react";

const getBase64 = (imgUrl, imgW, imgH, deg) => {
  console.log("in function", imgUrl, imgW, imgH, deg);
  //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  var Img = new Image(),
    dataURL = "",
    deg = deg;
  Img.src = imgUrl;
  Img.onload = function () {
    //要先确保图片完整获取到，这是个异步事件
    var canvas = document.createElement("canvas"), //创建canvas元素
      ctx = canvas.getContext("2d"),
      //确保canvas的尺寸和图片一样
      width = imgW,
      height = imgH,
      w = deg % 180 == 0 ? width : height,
      h = deg % 180 == 0 ? height : width,
      obj = {
        x: w / 2,
        y: h / 2,
        w: width,
        h: height,
      };
    canvas.width = w;
    canvas.height = h;

    ctx.translate(obj.x, obj.y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.translate(-obj.x, -obj.y);

    ctx.drawImage(Img, obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h); //将图片绘制到canvas中
    dataURL = canvas.toDataURL(); //转换图片为dataURL（转换成base64）
    $(".canvas-box")
      .css({
        width: w,
        height: h,
      })
      .html("");
    // $(".canvas-box").append(canvas);
    // console.log(dataURL);
    $("#modelImg").attr("src", dataURL);
  };
  return dataURL;
};
const App = () => {
  const [Deg, setDeg] = useState(0);
  useEffect(() => {
    getBase64(
      $("#temp-img").attr("src"),
      parseInt($("#temp-img").width()),
      parseInt($("#temp-img").height()),
      Deg
    );
  }, [Deg]);
  const clickme = () => {
    $("#temp-img").attr("hidden", true);
    setDeg((Deg) => {
      return Deg - 90;
    });
    console.log(Deg)
  };
  return (
    <>
      <div className="container">
        <img className="canvas-img" src="666.jpg" alt="" id="temp-img" />
        <img id="modelImg" src="#" alt="" />
        <img id="arrowImg" height={30} src="rotate-arrow.png" onClick={clickme} />
      </div>
      <div className="canvas-box"></div>
      <br />
    </>
  );
};

// infinite scroll, logout, more customizations...

export default App;
