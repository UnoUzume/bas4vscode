def text t {
    content = "https://bilibili.github.io/bas/"
    fontSize = 3%
    fontFamily = "黑体"{
        x = 5%
        y = 50%
        alpha = 0
        color = 0x84D3FE
        scale = 0.2
    }
    anchorX = 0
    anchorY = 0.5
    duration = 2s
}
set t {
    y = 80%
    alpha = 1
    scale = 0.5
}
0.3s,"ease-out "
then set t {
    y = 10%
    scale = 1
}
0.5s,"ease-in "
let t2=t {
    content = "https://www.bilibili.com/video/BV1M7411Z7eP/"
}
set t2{
}
0.3s
then set t2 {
    y = 80%
    alpha = 1
    scale = 0.5
}
0.3s,"ease-out "
then set t2 {
    y = 15%
    scale = 1
}
0.5s,"ease-in "
